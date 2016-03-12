using System;
using Microsoft.Owin;
using Microsoft.Owin.Security.OAuth;

namespace Web.OAuth
{
    public class AuthorizationServerOptionsProvider : IAuthorizationServerOptionsProvider
    {
        private readonly IAuthorizationServerProvider _provider;

        public AuthorizationServerOptionsProvider(IAuthorizationServerProvider provider)
        {
            _provider = provider;
        }

        public OAuthAuthorizationServerOptions GetOptions()
        {
            return new OAuthAuthorizationServerOptions()
            {
                AllowInsecureHttp = true,
                TokenEndpointPath = new PathString("/token"),
                AccessTokenExpireTimeSpan = TimeSpan.FromMinutes(30),
                Provider = _provider
            };
        }
    }
}