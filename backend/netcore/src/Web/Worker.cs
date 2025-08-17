using System;
using System.Text.Json;
using System.Text.Json.Nodes;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using OpenIddict.EntityFrameworkCore.Models;
using Web.DataContext;
using static OpenIddict.Abstractions.OpenIddictConstants;

namespace Web;

public class Worker(IServiceProvider serviceProvider) : IHostedService
{
    public async Task StartAsync(CancellationToken cancellationToken)
    {
        await using var scope = serviceProvider.CreateAsyncScope();

        var contextFactory = scope.ServiceProvider.GetRequiredService<IDbContextFactory<ApplicationDbContext>>();
        await using var context = await contextFactory.CreateDbContextAsync(cancellationToken);
        await context.Database.EnsureCreatedAsync(cancellationToken);

        var application = await context.Set<OpenIddictEntityFrameworkCoreApplication>().FirstOrDefaultAsync(cancellationToken);
        if (application == null)
        {
            var permissions = new[]
            {
                Permissions.Endpoints.Token, 
                Permissions.GrantTypes.Password, 
                Permissions.ResponseTypes.Token,
                Permissions.Scopes.Address,
                Permissions.Scopes.Email,
                Permissions.Scopes.Phone,
                Permissions.Scopes.Profile,
                Permissions.Scopes.Roles
            };
            var permissionsJson = $"[\"{string.Join("\",\"", permissions)}\"]";

            application = new OpenIddictEntityFrameworkCoreApplication
            {
                Id = Guid.NewGuid().ToString(),
                ApplicationType = ApplicationTypes.Web,
                ClientId = "default",
                ClientSecret = "",
                ClientType = ClientTypes.Public,
                ConsentType = ConsentTypes.External,
                DisplayName = "Default Application",
                Permissions = permissionsJson,
            };
            await context.Set<OpenIddictEntityFrameworkCoreApplication>().AddAsync(application, cancellationToken);
            await context.SaveChangesAsync(cancellationToken);
        }
    }

    public Task StopAsync(CancellationToken cancellationToken) => Task.CompletedTask;
}
