using System;
using System.IO;
using System.Text.Json.Serialization;
using Domain.Interfaces.Config;
using Domain.Interfaces.Plumbing;
using Infrastructure.Converters;
using Infrastructure.Modules;
using Infrastructure.Plumbing;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.FileProviders;
using Microsoft.Extensions.Logging;
using Quartz;
using Web.Middleware;
using Web.Models;

namespace Web;

public class Startup
{
    public IConfiguration Configuration { get; }
    public PathProvider PathProvider { get; }

    public Startup(IConfiguration configuration)
    {
        Configuration = configuration;
        PathProvider = new PathProvider(Directory.GetCurrentDirectory());
    }
    
    public void ConfigureServices(IServiceCollection services)
    {
        PlumbingModule.Load(services, Configuration);
        RepositoryModule.Load(services);

        services.AddControllers().AddJsonOptions(options =>
        {
            options.JsonSerializerOptions.Converters.Add(new JsonStringEnumConverter());
            options.JsonSerializerOptions.Converters.Add(new IntNullableEnumConverter<Domain.Enum.LogLevel?>());
        });

        services.AddDbContext<ApplicationDbContext>((sp,options) =>
        {
            var dbConfig = sp.GetService<IDatabaseConfig>();
            
            // Configure the context to use sqlite.
            options.UseSqlite($"Filename={dbConfig.DatabasePath}");

            // Register the entity sets needed by OpenIddict.
            // Note: use the generic overload if you need
            // to replace the default OpenIddict entities.
            options.UseOpenIddict();
        });

        // Register the Identity services.
        services.AddIdentity<ApplicationUser, IdentityRole>()
            .AddEntityFrameworkStores<ApplicationDbContext>()
            .AddDefaultTokenProviders();

        // OpenIddict offers native integration with Quartz.NET to perform scheduled tasks
        // (like pruning orphaned authorizations/tokens from the database) at regular intervals.
        services.AddQuartz(options =>
        {
            options.UseSimpleTypeLoader();
            options.UseInMemoryStore();
        });

        // Register the Quartz.NET service and configure it to block shutdown until jobs are complete.
        services.AddQuartzHostedService(options => options.WaitForJobsToComplete = true);

        services.AddOpenIddict()

            // Register the OpenIddict core components.
            .AddCore(options =>
            {
                // Configure OpenIddict to use the Entity Framework Core stores and models.
                // Note: call ReplaceDefaultEntities() to replace the default OpenIddict entities.
                options.UseEntityFrameworkCore()
                       .UseDbContext<ApplicationDbContext>();

                // Enable Quartz.NET integration.
                options.UseQuartz();
            })

            // Register the OpenIddict server components.
            .AddServer(options =>
            {
                // Enable the token endpoint.
                options.SetTokenEndpointUris("connect/token");

                // Enable the password flow.
                options.AllowPasswordFlow();

                // Accept anonymous clients (i.e clients that don't send a client_id).
                options.AcceptAnonymousClients();

                // Register the signing and encryption credentials.
                options.AddDevelopmentEncryptionCertificate()
                       .AddDevelopmentSigningCertificate();

                // Register the ASP.NET Core host and configure the ASP.NET Core-specific options.
                options.UseAspNetCore()
                       .EnableTokenEndpointPassthrough();
            })

            // Register the OpenIddict validation components.
            .AddValidation(options =>
            {
                // Import the configuration from the local OpenIddict server instance.
                options.UseLocalServer();

                // Register the ASP.NET Core host.
                options.UseAspNetCore();
            });

        // Register the worker responsible for creating and seeding the SQL database.
        // Note: in a real world application, this step should be part of a setup script.
        services.AddHostedService<Worker>();

        services.AddLogging(loggingBuilder =>
        {
            loggingBuilder.AddConsole(c => c.LogToStandardErrorThreshold = LogLevel.Information);
        });
    }

    public void Configure(IApplicationBuilder app)
    {
        var fileProvider = new PhysicalFileProvider(Path.Combine(PathProvider.HostingDirectory, "app"));
        var defoptions = new DefaultFilesOptions();
        defoptions.DefaultFileNames.Clear();
        defoptions.FileProvider = fileProvider;
        defoptions.DefaultFileNames.Add("index.html");

        app.UseDefaultFiles(defoptions)
            .UseStaticFiles(new StaticFileOptions()
            {
                FileProvider = fileProvider,
                RequestPath = new PathString("")
            })
            .UseDeveloperExceptionPage();

        app.UseMiddleware<ValidateAntiForgeryToken>();
        app.UseMiddleware<CreateTransaction>();
        app.UseMiddleware<RequestResponseLog>();

        app.UseRouting();

        app.UseAuthentication();
        app.UseAuthorization();

        app.UseEndpoints(endpoints =>
        {
            endpoints.MapControllers();
            endpoints.MapDefaultControllerRoute();
        });

        InitDatabaseDefaults(app.ApplicationServices);
    }

    private void InitDatabaseDefaults(IServiceProvider services)
    {
        var nHibernateSessionFactory = services.GetService<INHibernateSessionFactory>();
        nHibernateSessionFactory.Update(true, true);
    }
}
