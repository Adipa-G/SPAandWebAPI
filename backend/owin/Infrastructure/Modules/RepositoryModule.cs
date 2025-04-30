﻿using Domain.Interfaces.Repositories;
using Infrastructure.Repositories;
using Ninject.Modules;

namespace Infrastructure.Modules
{
    public class RepositoryModule : NinjectModule
    {
        public override void Load()
        {
            Bind<ILogWriterRepository>().To<LogWriterRepository>().InSingletonScope();

            Bind<IAuthRepository>().To<AuthRepository>().InTransientScope();
            Bind<ILogViewRepository>().To<LogViewRepository>().InTransientScope();
        }
    }
}