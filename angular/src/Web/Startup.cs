using System.Buffers;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using System.Security.Cryptography.X509Certificates;
using System.IO;
using Domain.Interfaces.Config;
using IdentityServer4.Configuration;
using Infrastructure.Config;
using Infrastructure.Modules;
using Infrastructure.Plumbing;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc.Authorization;
using Microsoft.AspNetCore.Mvc.Formatters;
using Microsoft.DotNet.PlatformAbstractions;
using Microsoft.Extensions.FileProviders;
using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;
using Web.Middleware;

namespace Web
{
    public class Startup
    {
        private readonly PathProvider _pathProvider;

        public Startup()
        {
            _pathProvider = new PathProvider(Directory.GetCurrentDirectory());
        }

        public void ConfigureServices(IServiceCollection services)
        {
            services.AddSingleton<IPathProvider>(_pathProvider);

            services.AddSingleton<IDatabaseConfig>(
                new DatabaseConfig(Path.Combine(Directory.GetCurrentDirectory(), "config.json")));

            PlumbingModule.Load(services);
            RepositoryModule.Load(services);

            var cert = GetCertificate();

            services.AddIdentityServer(o => new IdentityServerOptions()
            {
                Endpoints = new EndpointsOptions()
                {
                    EnableDiscoveryEndpoint = true,
                    EnableTokenEndpoint = true
                }
            })
                .AddSigningCredential(cert);

            var defaultPolicy = new AuthorizationPolicyBuilder()
                .RequireAuthenticatedUser()
                .Build();

            var jsonOutputFormatter =
                new JsonOutputFormatter(
                    new JsonSerializerSettings() { ContractResolver = new CamelCasePropertyNamesContractResolver() },
                    ArrayPool<char>.Shared);

            services.AddMvc(options =>
            {
                options.OutputFormatters.Insert(0, jsonOutputFormatter);
                options.Filters.Add(new AuthorizeFilter(defaultPolicy));
            });

            services.AddAuthentication(CookieAuthenticationDefaults.AuthenticationScheme)
                .AddCookie();
        }

        public void Configure(IApplicationBuilder app, ILoggerFactory loggerFactory)
        {
            loggerFactory.AddConsole(LogLevel.Information);
            loggerFactory.AddDebug(LogLevel.Information);

            var authority = "http://localhost:5000";

            var fileProvider = new PhysicalFileProvider(_pathProvider.HostingDirectory + "\\app\\dist\\angular-auth-app");
            var defoptions = new DefaultFilesOptions();
            defoptions.DefaultFileNames.Clear();
            defoptions.FileProvider = fileProvider;
            defoptions.DefaultFileNames.Add("index.html");
            app.UseDefaultFiles(defoptions);

            app.UseDeveloperExceptionPage()
                .UseDefaultFiles()
                .UseStaticFiles(new StaticFileOptions()
                {
                    FileProvider = fileProvider,
                    RequestPath = new PathString("")
                })
                .UseMiddleware<ValidateAntiForgeryToken>()
                .UseMiddleware<RequestResponseLog>()
                .UseIdentityServer()
                //TODO the tokenDecoder should be removed, and one of above should be used once identity server/mvc6 is fixed
                .UseMiddleware<TokenDecoder>(authority)
                .UseMiddleware<CreateTransaction>()
                .UseMvcWithDefaultRoute();

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
        }

        private X509Certificate2 GetCertificate()
        {
            var cert = new X509Certificate2(Path.Combine("Configuration", "idsrv4test.pfx"), "idsrv3test");
            return cert;
        }

        public static void Main(string[] args)
        {
            var host = new WebHostBuilder()
                .UseKestrel()
                .UseIISIntegration()
                .UseStartup<Startup>()
                .Build();

            host.Run();
        }
    }
}