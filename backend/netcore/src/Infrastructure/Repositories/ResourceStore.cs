using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using IdentityModel;
using IdentityServer4.Models;
using IdentityServer4.Stores;

namespace Infrastructure.Repositories
{
    public class ResourceStore : IResourceStore
    {
        private readonly Resources _resources;

        public ResourceStore()
        {
            _resources = new Resources()
                        {
                            IdentityResources =
                                new List<IdentityResource>()
                                {
                                    new IdentityResource("subject", "Subject",
                                        new List<string>() {JwtClaimTypes.Subject})
                                },
                            ApiResources =
                                new List<ApiResource>()
                                {
                                    new ApiResource("api", "Api", new List<string>() {JwtClaimTypes.Subject})
                                    {
                                        Scopes = new List<Scope>() {new Scope("all")}
                                    }
                                }
                        };
        }

        public async Task<IEnumerable<IdentityResource>> FindIdentityResourcesByScopeAsync(IEnumerable<string> scopeNames)
        {
            return await Task.FromResult(_resources.IdentityResources.AsEnumerable());
        }

        public async Task<IEnumerable<ApiResource>> FindApiResourcesByScopeAsync(IEnumerable<string> scopeNames)
        {
            return await Task.FromResult(_resources.ApiResources.AsEnumerable());
        }

        public async Task<ApiResource> FindApiResourceAsync(string name)
        {
            return await Task.FromResult(_resources.ApiResources.First());
        }

        public async Task<Resources> GetAllResourcesAsync()
        {
            return await Task.FromResult(_resources);
        }
    }
}
