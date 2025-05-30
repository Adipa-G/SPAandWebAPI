using System;
using System.IO;
using System.Text.Json.Serialization;
using Domain.Entities;
using Domain.Interfaces.Config;
using Domain.Interfaces.DataContext;
using Infrastructure.Config;
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
using Web.DataContext;
using Web.Middleware;
using Web.Models;
using static Microsoft.EntityFrameworkCore.DbLoggerCategory.Database;

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
        var dbConfig = new DatabaseConfig(Configuration);
        services.AddSingleton<IDatabaseConfig>(dbConfig);

        PlumbingModule.Load(services, Configuration);
        RepositoryModule.Load(services);

        services.AddSingleton<IPathProvider>(PathProvider);

        services.AddControllers().AddJsonOptions(options =>
        {
            options.JsonSerializerOptions.Converters.Add(new JsonStringEnumConverter());
            options.JsonSerializerOptions.Converters.Add(new IntNullableEnumConverter<Domain.Enum.LogLevel?>());
        });

        var options = new DbContextOptionsBuilder<ApplicationDbContext>().UseSqlite($"Filename={dbConfig.DatabasePath}").Options;
        services.AddSingleton(options);

        services.AddDbContextFactory<ApplicationDbContext>((sp, options) =>
        {
            options.UseSqlite($"Filename={dbConfig.DatabasePath}");
            options.UseOpenIddict();
        });

        services.AddDbContext<ApplicationDbContext>((sp,options) =>
        {
            options.UseSqlite($"Filename={dbConfig.DatabasePath}");
            options.UseOpenIddict();
        });

        services.AddScoped<IApplicationDbContext>(sp => sp.GetRequiredService<ApplicationDbContext>());

        services.AddSingleton<IApplicationDbContextFactory>(sp =>
        {
            var contextFactory = sp.GetRequiredService<IDbContextFactory<ApplicationDbContext>>();
            return new ApplicationDbContextFactory(contextFactory);
        });

        services.AddIdentity<ApplicationUser, IdentityRole>()
            .AddEntityFrameworkStores<ApplicationDbContext>()
            .AddDefaultTokenProviders();

        services.AddQuartz(options =>
        {
            options.UseSimpleTypeLoader();
            options.UseInMemoryStore();
        });

        services.AddQuartzHostedService(options => options.WaitForJobsToComplete = true);

        services.AddOpenIddict()
            .AddCore(options =>
            {
                options.UseEntityFrameworkCore()
                       .UseDbContext<ApplicationDbContext>();
                options.UseQuartz();
            })

            .AddServer(options =>
            {
                options.SetTokenEndpointUris("connect/token");
                options.AllowPasswordFlow();
                options.AcceptAnonymousClients();
                options.AddDevelopmentEncryptionCertificate()
                       .AddDevelopmentSigningCertificate();
                options.UseAspNetCore()
                       .EnableTokenEndpointPassthrough();
            })

            .AddValidation(options =>
            {
                options.UseLocalServer();
                options.UseAspNetCore();
            });

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
        app.UseMiddleware<RequestResponseLog>();

        app.UseRouting();

        app.UseAuthentication();
        app.UseAuthorization();

        app.UseEndpoints(endpoints =>
        {
            endpoints.MapControllers();
            endpoints.MapDefaultControllerRoute();
        });
    }
}
