using NHibernate;
using Ninject;
using Ninject.Modules;
using Ninject.Web.Common;
using Serilog;
using Web.OAuth;

namespace Web.Modules
{
    public class WebModule : NinjectModule
    {
        public override void Load()
        {
            Bind<IAuthorizationServerOptionsProvider>().To<AuthorizationServerOptionsProvider>().InTransientScope();
            Bind<IAuthorizationServerProvider>().To<AuthorizationServerProvider>().InTransientScope(); 
            Bind<ILogger>().ToConstant(Log.Logger).InSingletonScope();
        }
    }
}