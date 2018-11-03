using System;
using System.Web.Http;
using System.Web.Http.ExceptionHandling;
using Domain.Interfaces.Plumbing;
using IdentityServer3.AccessTokenValidation;
using IdentityServer3.Core.Configuration;
using Infrastructure.Modules;
using Microsoft.Owin;
using Microsoft.Owin.Cors;
using Ninject;
using Ninject.Web.Common.OwinHost;
using Ninject.Web.WebApi.OwinHost;
using Owin;
using Serilog;
using Web;
using Web.Middleware;
using Web.Modules;
using Web.OAuth;

[assembly: OwinStartup(typeof(Startup))]
namespace Web
{
    public class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureLogging();

            var kernel = CreateKernelAndInitDefaults();
            
            ConfigureOAuth(app,kernel);
            app.UseNinjectMiddleware(() => kernel);
            app.Use(typeof(RequestResponseLog), kernel);
            app.Use(typeof(CreateTransaction),kernel);
            app.Use(typeof(ValidateAntiForgeryToken));

            var config = new HttpConfiguration();
            config.Services.Add(typeof(IExceptionLogger), kernel.Get<IExceptionLogger>());
            config.Filters.Add(new AuthorizeAttribute());

            WebApiConfig.Register(config);
            app.UseWebApi(config);
            app.UseNinjectWebApi(config);

            app.UseCors(CorsOptions.AllowAll);
        }

        private void ConfigureOAuth(IAppBuilder app,IKernel kernel)
        {
            var provider = kernel.Get<IIdentiyServiceFactoryProvider>();

            app.UseIdentityServer(new IdentityServerOptions
            {
                SiteName = "API Authorization Server",
                Factory = provider.CreateFactory(),
                SigningCertificate = Certificate.Get(),
                RequireSsl = false,
                AuthenticationOptions = new AuthenticationOptions { },
                EnableWelcomePage = false,
                EventsOptions = new EventsOptions
                {
                    RaiseSuccessEvents = true,
                    RaiseErrorEvents = true,
                    RaiseFailureEvents = true,
                    RaiseInformationEvents = true
                }
            });

            app.UseIdentityServerBearerTokenAuthentication(new IdentityServerBearerTokenAuthenticationOptions
            {
                RequiredScopes = new[] { "all" },
                IssuerName = "http://localhost:5000",
                Authority = "http://localhost:5000",
                SigningCertificate = Certificate.Get()
            });
        }

        private IKernel CreateKernelAndInitDefaults()
        {
            var kernel = new StandardKernel();

            kernel.Load(new RepositoryModule());
            kernel.Load(new PlumbingModule());
            kernel.Load(new WebModule());

            InitDatabaseDefaults(kernel);

            return kernel;
        }

        private void InitDatabaseDefaults(IKernel kernel)
        {
            var nHibernateSessionFactory = kernel.Get<INHibernateSessionFactory>();
            nHibernateSessionFactory.Update(true,true);
        }

        private void ConfigureLogging()
        {
            Environment.SetEnvironmentVariable("LOGDIR", AppDomain.CurrentDomain.BaseDirectory + "\\App_Data\\Logs");

            Log.Logger = new LoggerConfiguration()
                .ReadFrom.AppSettings()
                .CreateLogger();

#if DEBUG
            AppDomain.CurrentDomain.FirstChanceException += (sender, eventArgs) =>
            {
                Log.Error(eventArgs.Exception, eventArgs.Exception.Message);
            };
#endif
        }
    }
}