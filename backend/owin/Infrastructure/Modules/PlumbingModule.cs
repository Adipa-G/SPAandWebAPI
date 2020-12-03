using System.Web.Http.ExceptionHandling;
using Domain.Interfaces.Config;
using Domain.Interfaces.Plumbing;
using Infrastructure.Config;
using Infrastructure.Plumbing;
using Microsoft.AspNet.Identity;
using NHibernate;
using NHibernate.AspNet.Identity;
using Ninject.Modules;
using ExceptionLogger = Infrastructure.Plumbing.ExceptionLogger;

namespace Infrastructure.Modules
{
    public class PlumbingModule : NinjectModule
    {
        public override void Load()
        {
            Bind<IUserStore<IdentityUser>>().To<UserStore<IdentityUser>>().InTransientScope();
            Bind<UserManager<IdentityUser>>().To<UserManager<IdentityUser>>().InTransientScope();

            Bind<IDatabaseConfig>().To<DatabaseConfig>().InSingletonScope();
            Bind<IConfig>().To<Config.Config>().InSingletonScope();

            Bind<INHibernateSessionFactory>().To<NHibernateSessionFactory>().InSingletonScope();
            Bind<ISessionFactory>().ToProvider<NhibernateSessionFactoryProvider>().InSingletonScope();
            Bind<ISQLStatementInterceptor>().To<SQLStatementInterceptor>().InTransientScope();
            Bind<IExceptionLogger>().To<ExceptionLogger>().InTransientScope();
        }
    }
}
