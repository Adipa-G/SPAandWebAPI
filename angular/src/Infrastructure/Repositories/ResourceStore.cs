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
        private Resources resources;

        public ResourceStore()
        {
            resources = new Resources()
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

        public Task<IEnumerable<IdentityResource>> FindIdentityResourcesByScopeAsync(IEnumerable<string> scopeNames)
        {
            return Task.FromResult(resources.IdentityResources.AsEnumerable());
        }

        public Task<IEnumerable<ApiResource>> FindApiResourcesByScopeAsync(IEnumerable<string> scopeNames)
        {
            return Task.FromResult(resources.ApiResources.AsEnumerable());
        }

        public Task<ApiResource> FindApiResourceAsync(string name)
        {
            return Task.FromResult(resources.ApiResources.First());
        }

        public Task<Resources> GetAllResourcesAsync()
        {
            return Task.FromResult(resources);
        }
    }
}
