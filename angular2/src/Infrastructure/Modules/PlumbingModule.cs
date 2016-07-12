using Domain.Interfaces.Config;
using Domain.Interfaces.Plumbing;
using IdentityServer4.Services;
using IdentityServer4.Validation;
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

            serviceCollection.AddTransient<IConfig, Config.Config>();

            serviceCollection.AddSingleton<INHibernateSessionFactory, NHibernateSessionFactory>();
            serviceCollection.AddTransient<ISQLStatementInterceptor, SQLStatementInterceptor>();
            serviceCollection.AddScoped(p => p.GetService<INHibernateSessionFactory>().GetSessionFactory().OpenSession());
            
            //TODO Bind<IExceptionLogger>().To<ExceptionLogger>();
        }
    }
}
