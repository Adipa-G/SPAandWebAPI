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
            Bind<IUserStore<IdentityUser>>().To<UserStore<IdentityUser>>();
            Bind<UserManager<IdentityUser>>().To<UserManager<IdentityUser>>();

            Bind<IDatabaseConfig>().To<DatabaseConfig>();
            Bind<IConfig>().To<Config.Config>();

            Bind<INHibernateSessionFactory>().To<NHibernateSessionFactory>();
            Bind<ISessionFactory>().ToProvider<NhibernateSessionFactoryProvider>().InSingletonScope();
            Bind<ISQLStatementInterceptor>().To<SQLStatementInterceptor>();
            Bind<IExceptionLogger>().To<ExceptionLogger>();
        }
    }
}
