using IdentityServer3.Core.Configuration;
using IdentityServer3.Core.Services;
using Ninject;

namespace Web.OAuth
{
    public class IdentiyServiceFactoryProvider : IIdentiyServiceFactoryProvider
    {
        private readonly IKernel _kernel;

        public IdentiyServiceFactoryProvider(IKernel kernel)
        {
            _kernel = kernel;
        }

        public IdentityServerServiceFactory CreateFactory()
        {
            var factory = new IdentityServerServiceFactory();

            factory.ClientStore = new Registration<IClientStore>(_kernel.Get<IClientStore>());
            factory.ScopeStore = new Registration<IScopeStore>(_kernel.Get<IScopeStore>());
            factory.UserService = new Registration<IUserService>(_kernel.Get<IUserService>());

            return factory;
        }
    }
}