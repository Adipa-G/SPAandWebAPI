using System;
using System.Buffers;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using System.Security.Cryptography.X509Certificates;
using System.IO;
using System.Linq;
using System.Text.Json;
using Domain.Interfaces.Config;
using Domain.Interfaces.Plumbing;
using IdentityServer4.Configuration;
using Infrastructure.Config;
using Infrastructure.Modules;
using Infrastructure.Plumbing;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc.Authorization;
using Microsoft.AspNetCore.Mvc.Formatters;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.FileProviders;
using Microsoft.Extensions.Logging.Console;
using Microsoft.IdentityModel.Logging;
using Microsoft.IdentityModel.Tokens;
using Web.Middleware;
using Web.Modules;

namespace Web
{
    public class Startup
    {
        private readonly PathProvider _pathProvider;
        public readonly IConfigurationRoot _configuration;

        public Startup(IWebHostEnvironment env)
        {
            _pathProvider = new PathProvider(Directory.GetCurrentDirectory());

            var builder = new ConfigurationBuilder()
                .SetBasePath(env.ContentRootPath)
                .AddJsonFile("appsettings.json", optional: true, reloadOnChange: true)
                .AddEnvironmentVariables();

            _configuration = builder.Build();
        }
        
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddSingleton<IPathProvider>(_pathProvider);

            services.AddSingleton<IDatabaseConfig>(
                new DatabaseConfig(_configuration));

            PlumbingModule.Load(services);
            RepositoryModule.Load(services);
            AuthModule.Load(services);

            var cert = GetCertificate();
            services.AddIdentityServer(o => new IdentityServerOptions()
            {
                Endpoints = new EndpointsOptions()
                {
                    EnableDiscoveryEndpoint = true,
                    EnableTokenEndpoint = true
                }
            }).AddSigningCredential(cert);

            var defaultPolicy = new AuthorizationPolicyBuilder()
                .RequireAuthenticatedUser()
                .Build();

            services.AddMvc(options =>
            {
                options.EnableEndpointRouting = false;
                options.Filters.Add(new AuthorizeFilter(defaultPolicy));
            }).AddNewtonsoftJson(); 

            services.AddAuthentication(CookieAuthenticationDefaults.AuthenticationScheme)
                .AddCookie();

            services.AddLogging(loggingBuilder =>
            {
                loggingBuilder.AddConsole(c => c.LogToStandardErrorThreshold = LogLevel.Information);
            });
        }

        public void Configure(IApplicationBuilder app)
        {
            var issuer = $"http://{_configuration["Hosting:HostName"]}:{_configuration["Hosting:Port"]}";

            var fileProvider = new PhysicalFileProvider(Path.Combine(_pathProvider.HostingDirectory,"app"));
            var defoptions = new DefaultFilesOptions();
            defoptions.DefaultFileNames.Clear();
            defoptions.FileProvider = fileProvider;
            defoptions.DefaultFileNames.Add("index.html");
            app.UseDefaultFiles(defoptions);

            app.UseDeveloperExceptionPage()
                .UseDefaultFiles()
                .UseCors(c => c.AllowAnyOrigin())
                .UseStaticFiles(new StaticFileOptions()
                {
                    FileProvider = fileProvider,
                    RequestPath = new PathString("")
                })
                .UseMiddleware<ValidateAntiForgeryToken>()
                .UseMiddleware<RequestResponseLog>()
                .UseIdentityServer()
                .UseMiddleware<TokenDecoder>(issuer)
                .UseMiddleware<CreateTransaction>()
                .UseMvcWithDefaultRoute();

            InitDatabaseDefaults(app.ApplicationServices);
        }

        private X509Certificate2 GetCertificate()
        {
            var cert = X509CertificateLoader.LoadPkcs12FromFile(Path.Combine("Configuration", "idsrv4test.pfx"),
                "idsrv3test", 
                X509KeyStorageFlags.DefaultKeySet, 
                new Pkcs12LoaderLimits()
                {
                    PreserveStorageProvider = true
                });
            return cert;
        }

        private void InitDatabaseDefaults(IServiceProvider services)
        {
            var nHibernateSessionFactory = services.GetService<INHibernateSessionFactory>();
            nHibernateSessionFactory.Update(true, true);
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