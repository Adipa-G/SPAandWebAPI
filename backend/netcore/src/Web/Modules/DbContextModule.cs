using Infrastructure.Config;
using Infrastructure.DataContext;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Quartz;
using System;
using Web.DataContext;

namespace Web.Modules;

public class DbContextModule
{
    public static void Load(IServiceCollection services, IConfiguration configuration)
    {
        var dbConfig = new DatabaseConfig(configuration);

        services.AddQuartz(options =>
        {
            options.UseSimpleTypeLoader();
            options.UseInMemoryStore();
        });

        var options = new DbContextOptionsBuilder<ApplicationDbContext>().UseSqlite($"Filename={dbConfig.DatabasePath}").Options;
        services.AddSingleton(options);

        services.AddDbContextFactory<ApplicationDbContext>();

        services.AddDbContext<ApplicationDbContext>();

        services.AddScoped<IApplicationDbContext>(sp =>
        {
            var serviceProvider = sp.GetRequiredService<IServiceProvider>();
            var context = sp.GetRequiredService<ApplicationDbContext>();
            context.ServiceProvider = serviceProvider;
            return context;
        });

        services.AddSingleton<IApplicationDbContextFactory>(sp =>
        {
            var serviceProvider = sp.GetRequiredService<IServiceProvider>();
            var contextFactory = sp.GetRequiredService<IDbContextFactory<ApplicationDbContext>>();
            return new ApplicationDbContextFactory(contextFactory, serviceProvider);
        });

        services.AddHostedService<Worker>();
    }
}