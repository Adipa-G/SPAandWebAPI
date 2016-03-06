using System.Web.Http;
using System.Web.Http.ExceptionHandling;
using Domain.Interfaces.Plumbing;
using Infrastructure.Modules;
using Microsoft.AspNet.Identity;
using Microsoft.Owin;
using Microsoft.Owin.Cors;
using Microsoft.Owin.Security.OAuth;
using Ninject;
using Ninject.Web.Common.OwinHost;
using Ninject.Web.WebApi.OwinHost;
using Owin;
using Web;
using Web.Middleware;
using Web.Modules;
using Web.OAuth;

[assembly: OwinStartup(typeof(Startup))]
namespace Web
{
    public class Startup
    {
        public static OAuthBearerAuthenticationOptions OAuthBearerOptions { get; private set; }

        public void Configuration(IAppBuilder app)
        {
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
            //use a cookie to temporarily store information about a user logging in with a third party login provider
            app.UseExternalSignInCookie(DefaultAuthenticationTypes.ExternalCookie);
            OAuthBearerOptions = new OAuthBearerAuthenticationOptions();

            var oAuthServerOptions = kernel.Get<IAuthorizationServerOptionsProvider>().GetOptions();

            // Token Generation
            app.UseOAuthAuthorizationServer(oAuthServerOptions);
            app.UseOAuthBearerAuthentication(OAuthBearerOptions);
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
    }

}