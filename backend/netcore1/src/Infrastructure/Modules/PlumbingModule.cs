using Domain.Interfaces.Config;
using Domain.Interfaces.Plumbing;
using Infrastructure.Config;
using Infrastructure.Plumbing;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace Infrastructure.Modules
{
    public class PlumbingModule
    {
        public static void Load(IServiceCollection serviceCollection, IConfiguration configuration)
        {
            serviceCollection.AddSingleton<IDatabaseConfig>(new DatabaseConfig(configuration));

            serviceCollection.AddSingleton<INHibernateSessionFactory, NHibernateSessionFactory>();
            serviceCollection.AddScoped(p => p.GetService<INHibernateSessionFactory>().GetSessionFactory().OpenSession());

            serviceCollection.AddTransient<ISQLStatementInterceptor, SQLStatementInterceptor>();
            serviceCollection.AddTransient<IConfig, Config.Config>();
        }
    }
}
