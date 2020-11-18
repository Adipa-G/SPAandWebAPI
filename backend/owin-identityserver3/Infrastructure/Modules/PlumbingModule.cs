using System.Web.Http.ExceptionHandling;
using Domain.Interfaces.Config;
using Domain.Interfaces.Plumbing;
using IdentityServer3.Core.Services;
using Infrastructure.Config;
using Infrastructure.Plumbing;
using Infrastructure.Repositories;
using NHibernate;
using Ninject.Modules;
using ExceptionLogger = Infrastructure.Plumbing.ExceptionLogger;

namespace Infrastructure.Modules
{
    public class PlumbingModule : NinjectModule
    {
        public override void Load()
        {
            Bind<IClientStore>().To<ClientStore>().InTransientScope();
            Bind<IScopeStore>().To<ScopeStore>().InTransientScope();       
            Bind<IUserService>().To<UserService>().InTransientScope();

            Bind<IDatabaseConfig>().To<DatabaseConfig>().InSingletonScope();
            Bind<IConfig>().To<Config.Config>().InTransientScope();

            Bind<INHibernateSessionFactory>().To<NHibernateSessionFactory>().InTransientScope();
            Bind<ISessionFactory>().ToProvider<NhibernateSessionFactoryProvider>().InSingletonScope();
            Bind<ISQLStatementInterceptor>().To<SQLStatementInterceptor>().InTransientScope();
            Bind<IExceptionLogger>().To<ExceptionLogger>().InTransientScope();
        }
    }
}
