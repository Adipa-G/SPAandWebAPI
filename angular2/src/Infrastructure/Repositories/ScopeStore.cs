using System.Collections.Generic;
using System.Threading.Tasks;
using IdentityServer4.Models;
using IdentityServer4.Services;

namespace Infrastructure.Repositories
{
    public class ScopeStore : IScopeStore
    {
        private IEnumerable<Scope> scopes;

        public ScopeStore()
        {
            scopes = new List<Scope>()
                     {
                         new Scope() {Name = "all"}
                     };
        }

        public Task<IEnumerable<Scope>> FindScopesAsync(IEnumerable<string> scopeNames)
        {
            return Task.FromResult(scopes);
        }

        public Task<IEnumerable<Scope>> GetScopesAsync(bool publicOnly = true)
        {
            return Task.FromResult(scopes);
        }
    }
}
