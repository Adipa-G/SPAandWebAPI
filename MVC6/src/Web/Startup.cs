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

            var cert = GetCertificate();

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
            app.UseCookieAuthentication(options =>
            {
                options.AuthenticationScheme = "cookies";
                options.AutomaticAuthenticate = true;
            });

            var authority = "http://localhost:5000";

            /*
            TODO: can't use identity server right now as "IdentityServer4" and "IdentityServer4.AccessTokenValidation" 
            packages are using two different identityModels and results in conflicts. Once this is fixed, remove openID
            and use following lines
            app.UseIdentityServerAuthentication(options =>
                                                {
                                                    options.Authority = authority";
                                                    options.ScopeName = "all";
                                                    options.ScopeSecret = "no-secret";

                                                    options.AutomaticAuthenticate = true;
                                                    options.AutomaticChallenge = true;
                                                });
            */

            /*
            var cert = GetCertificate();
            TODO:  can't use this either.. damn...
            app.UseJwtBearerAuthentication(options =>
            {
                options.AutomaticAuthenticate = true;
                options.AutomaticChallenge = true;
                options.RequireHttpsMetadata = false;
                options.Audience = authority;
                options.Authority = authority;
                options.TokenValidationParameters = new TokenValidationParameters()
                                                    {
                                                        IssuerSigningKey = new X509SecurityKey(cert)
                                                    };
            });*/

            //TODO the tokenDecoder should be removed, and one of above should be used once identity server/mvc6 is fixed
            app.UseMiddleware<TokenDecoder>(authority);
            app.UseMiddleware<RequestResponseLog>();
            app.UseMvcWithDefaultRoute();
        }

        private X509Certificate2 GetCertificate()
        {
            var cert =
                new X509Certificate2(Path.Combine(_environment.ApplicationBasePath, "Configuration", "idsrv4test.pfx"),
                    "idsrv3test");
            return cert;
        }

        public static void Main(string[] args) => WebApplication.Run<Startup>(args);
    }
}
