using IdentityServer4.Services;
using IdentityServer4.Stores;
using IdentityServer4.Validation;
using Microsoft.Extensions.DependencyInjection;
using Web.Auth;

namespace Web.Modules
{
    public class AuthModule
    {
        public static void Load(IServiceCollection serviceCollection)
        {
            serviceCollection.AddTransient<IClientStore, ClientStore>();
            serviceCollection.AddTransient<IResourceStore, ResourceStore>();
            serviceCollection.AddTransient<IProfileService, ProfileService>();
            serviceCollection.AddTransient<IResourceOwnerPasswordValidator, ResourceOwnerPasswordValidator>();
        }
    }
}
