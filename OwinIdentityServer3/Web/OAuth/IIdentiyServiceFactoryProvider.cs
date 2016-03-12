using IdentityServer3.Core.Configuration;

namespace Web.OAuth
{
    public interface IIdentiyServiceFactoryProvider
    {
        IdentityServerServiceFactory CreateFactory();
    }
}