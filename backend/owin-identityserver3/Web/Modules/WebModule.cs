using Ninject.Modules;
using Web.OAuth;

namespace Web.Modules
{
    public class WebModule : NinjectModule
    {
        public override void Load()
        {
            Bind<IIdentiyServiceFactoryProvider>().To<IdentiyServiceFactoryProvider>();
        }
    }
}