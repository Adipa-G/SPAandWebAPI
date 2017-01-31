using NHibernate;
using Ninject;
using Ninject.Modules;
using Ninject.Web.Common;
using Web.OAuth;

namespace Web.Modules
{
    public class WebModule : NinjectModule
    {
        public override void Load()
        {
            Bind<ISession>().ToMethod(context => context.Kernel.Get<ISessionFactory>().OpenSession()).InRequestScope();
            Bind<IIdentiyServiceFactoryProvider>().To<IdentiyServiceFactoryProvider>();
        }
    }
}