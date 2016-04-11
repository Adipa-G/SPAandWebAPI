using System;
using Domain.Interfaces.Config;
using Domain.Interfaces.Plumbing;
using Domain.Interfaces.Repositories;
using IdentityServer4.Core.Services;
using IdentityServer4.Core.Validation;
using Infrastructure.Config;
using Infrastructure.Plumbing;
using Infrastructure.Repositories;
using Microsoft.Extensions.DependencyInjection;
using NHibernate;

namespace Infrastructure.Modules
{
    public class PlumbingModule
    {
        public static void Load(IServiceCollection serviceCollection)
        {
            serviceCollection.AddTransient<IClientStore, ClientStore>();
            serviceCollection.AddTransient<IScopeStore, ScopeStore>();
            serviceCollection.AddTransient<IProfileService, ProfileService>();
            serviceCollection.AddTransient<IResourceOwnerPasswordValidator, ResourceOwnerPasswordValidator>();

            serviceCollection.AddTransient<IDatabaseConfig, DatabaseConfig>();
            serviceCollection.AddTransient<IConfig, Config.Config>();

            serviceCollection.AddSingleton<INHibernateSessionFactory, NHibernateSessionFactory>();
            serviceCollection.AddTransient(p => p.GetService<INHibernateSessionFactory>().GetSessionFactory());
            serviceCollection.AddTransient<ISQLStatementInterceptor, SQLStatementInterceptor>();
            //TODO Bind<IExceptionLogger>().To<ExceptionLogger>();
        }
    }
}
