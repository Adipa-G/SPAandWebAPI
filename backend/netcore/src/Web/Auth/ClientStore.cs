using System.Collections.Generic;
using System.Threading.Tasks;
using IdentityModel;
using IdentityServer4.Models;
using IdentityServer4.Stores;

namespace Web.Auth
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
                AllowedGrantTypes = new List<string>() { OidcConstants.GrantTypes.Password },
                ClientSecrets = new List<Secret> { new Secret("no-secret".ToSha256()) },
                AllowedScopes = new List<string> { "all" },
                AccessTokenType = AccessTokenType.Jwt,
                AccessTokenLifetime = 3600,
                AbsoluteRefreshTokenLifetime = 86400,
                SlidingRefreshTokenLifetime = 43200,
                RefreshTokenUsage = TokenUsage.OneTimeOnly,
                RefreshTokenExpiration = TokenExpiration.Sliding,

            };

            return Task.FromResult(client);
        }
    }
}
