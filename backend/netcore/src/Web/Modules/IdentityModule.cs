using Microsoft.Extensions.DependencyInjection;
using Quartz;
using Microsoft.AspNetCore.Identity;
using Web.DataContext;
using Web.Models;

namespace Web.Modules;

public class IdentityModule
{
    public static void Load(IServiceCollection services)
    {
        services.AddIdentity<ApplicationUser, IdentityRole>()
            .AddEntityFrameworkStores<ApplicationDbContext>()
            .AddDefaultTokenProviders();

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
                options.IgnoreEndpointPermissions();
                options.IgnoreGrantTypePermissions();
                options.IgnoreScopePermissions();
                options.IgnoreResponseTypePermissions();
            })

            .AddValidation(options =>
            {
                options.UseLocalServer();
                options.UseAspNetCore();
            });
    }
}