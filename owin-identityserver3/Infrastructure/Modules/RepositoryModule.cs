using Domain.Interfaces.Repositories;
using Infrastructure.Repositories;
using Ninject.Modules;

namespace Infrastructure.Modules
{
    public class RepositoryModule : NinjectModule
    {
        public override void Load()
        {
            Bind<ILogWriterRepository>().To<LogWriterRepository>().InSingletonScope();

            Bind<IUserRepository>().To<UserRepository>();
            Bind<IConfigRepository>().To<ConfigRepository>();
            Bind<ILogViewRepository>().To<LogViewRepository>();
        }
    }
}
