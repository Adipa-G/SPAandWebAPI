using Microsoft.AspNet.Builder;
using Microsoft.AspNet.Hosting;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.PlatformAbstractions;
using System.Security.Cryptography.X509Certificates;
using System.IO;
using Infrastructure.Modules;
using Microsoft.AspNet.Authorization;
using Microsoft.AspNet.Mvc.Filters;
using Microsoft.AspNet.Mvc.Formatters;
using Newtonsoft.Json.Serialization;
using Web.Middleware;
using Web.Modules;

namespace Web
{
    public class Startup
    {
        private readonly IApplicationEnvironment _environment;

        public Startup(IApplicationEnvironment environment)
        {
            _environment = environment;
        }

        public void ConfigureServices(IServiceCollection services)
        {
            PlumbingModule.Load(services);
            RepositoryModule.Load(services);
            WebModule.Load(services);

            var cert =
                new X509Certificate2(Path.Combine(_environment.ApplicationBasePath, "Configuration", "idsrv4test.pfx"),
                    "idsrv3test");

            services.AddIdentityServer(options =>
                                       {
                                           options.SigningCertificate = cert;
                                       });

            var defaultPolicy = new AuthorizationPolicyBuilder()
                .RequireAuthenticatedUser()
                .Build();

            var jsonOutputFormatter = new JsonOutputFormatter();
            jsonOutputFormatter.SerializerSettings.ContractResolver = new CamelCasePropertyNamesContractResolver();

            services.AddMvc(options =>
                            {
                                options.OutputFormatters.Insert(0, jsonOutputFormatter);
                                options.Filters.Add(new AuthorizeFilter(defaultPolicy));
                            });
        }

        public void Configure(IApplicationBuilder app, ILoggerFactory loggerFactory)
        {
            loggerFactory.AddConsole(LogLevel.Verbose);
            loggerFactory.AddDebug(LogLevel.Verbose);

            app.UseDeveloperExceptionPage();
            app.UseIISPlatformHandler();
            app.UseStaticFiles();

            app.UseMiddleware<ValidateAntiForgeryToken>();
            app.UseMiddleware<CreateTransaction>();

            app.UseIdentityServer();
            app.UseIdentityServerAuthentication(options =>
            {
                options.Authority = _environment.ApplicationBasePath;
                options.ScopeName = "all";
                options.ScopeSecret = "no-secret";

                options.AutomaticAuthenticate = true;
                options.AutomaticChallenge = true;
            });

            app.UseMiddleware<RequestResponseLog>();
            app.UseMvcWithDefaultRoute();
        }

        public static void Main(string[] args) => WebApplication.Run<Startup>(args);
    }
}
