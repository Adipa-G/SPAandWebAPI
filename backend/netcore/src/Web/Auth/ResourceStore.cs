using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using IdentityModel;
using IdentityServer4.Models;
using IdentityServer4.Stores;

namespace Web.Auth
{
    public class ResourceStore : IResourceStore
    {
        private readonly Resources _resources;

        public ResourceStore()
        {
            _resources = new Resources()
            {
                IdentityResources = new List<IdentityResource>()
                {
                    new IdentityResource("subject", "Subject",
                        new List<string>() {JwtClaimTypes.Subject})
                },
                ApiResources = new List<ApiResource>()
                {
                    new ApiResource("Api", "Api") { }
                },
                ApiScopes = new List<ApiScope>()
                {
                    new ApiScope("all", "All", new List<string>() {JwtClaimTypes.Subject})
                }
            };
        }

        public async Task<IEnumerable<IdentityResource>> FindIdentityResourcesByScopeNameAsync(IEnumerable<string> scopeNames)
        {
            return await Task.FromResult(_resources.IdentityResources.AsEnumerable());
        }

        public async Task<IEnumerable<ApiScope>> FindApiScopesByNameAsync(IEnumerable<string> scopeNames)
        {
            return await Task.FromResult(_resources.ApiScopes.AsEnumerable());
        }

        public async Task<IEnumerable<ApiResource>> FindApiResourcesByScopeNameAsync(IEnumerable<string> scopeNames)
        {
            return await Task.FromResult(_resources.ApiResources.AsEnumerable());
        }

        public async Task<IEnumerable<ApiResource>> FindApiResourcesByNameAsync(IEnumerable<string> apiResourceNames)
        {
            return await Task.FromResult(_resources.ApiResources.AsEnumerable());
        }

        public async Task<Resources> GetAllResourcesAsync()
        {
            return await Task.FromResult(_resources);
        }
    }
}
