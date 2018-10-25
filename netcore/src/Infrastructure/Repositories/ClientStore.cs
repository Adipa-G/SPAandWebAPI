using System.Collections.Generic;
using System.Threading.Tasks;
using IdentityServer4.Models;
using IdentityServer4.Stores;

namespace Infrastructure.Repositories
{
    public class ClientStore : IClientStore
    {
        public Task<Client> FindClientByIdAsync(string clientId)
        {
            var client = new Client()
                         {
                             ClientName = "default-client",
                             Enabled = true,
                             ClientId = "default",
                             AllowedGrantTypes = new List<string>(GrantTypes.ResourceOwnerPassword),
                             ClientSecrets = new List<Secret> {new Secret("no-secret".Sha256())},
                             AllowedScopes = new List<string> {"all"},
                             AccessTokenType = AccessTokenType.Jwt,
                             AccessTokenLifetime = 3600,
                             AbsoluteRefreshTokenLifetime = 86400,
                             SlidingRefreshTokenLifetime = 43200,
                             RefreshTokenUsage = TokenUsage.OneTimeOnly,
                             RefreshTokenExpiration = TokenExpiration.Sliding
                         };

            return Task.FromResult(client);
        }
    }
}
