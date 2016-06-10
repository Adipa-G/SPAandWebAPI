using System.Web.Http.ExceptionHandling;
using Domain.Interfaces.Config;
using Domain.Interfaces.Plumbing;
using Domain.Interfaces.Repositories;
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
            Bind<IClientStore>().To<ClientStore>();
            Bind<IScopeStore>().To<ScopeStore>();       
            Bind<IUserService>().To<UserService>();

            Bind<IDatabaseConfig>().To<DatabaseConfig>();
            Bind<IConfig>().To<Config.Config>();

            Bind<INHibernateSessionFactory>().To<NHibernateSessionFactory>();
            Bind<ISessionFactory>().ToProvider<NhibernateSessionFactoryProvider>().InSingletonScope();
            Bind<ISQLStatementInterceptor>().To<SQLStatementInterceptor>();
            Bind<IExceptionLogger>().To<ExceptionLogger>();
        }
    }
}
