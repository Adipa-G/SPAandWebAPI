using Microsoft.Owin.Security.OAuth;

namespace Web.OAuth
{
    public interface IAuthorizationServerOptionsProvider
    {
        OAuthAuthorizationServerOptions GetOptions();
    }
}