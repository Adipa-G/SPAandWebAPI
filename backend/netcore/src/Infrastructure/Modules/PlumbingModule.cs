using Domain.Interfaces.Config;
using Domain.Interfaces.Plumbing;
using Infrastructure.Plumbing;
using Microsoft.Extensions.DependencyInjection;

namespace Infrastructure.Modules
{
    public class PlumbingModule
    {
        public static void Load(IServiceCollection serviceCollection)
        {
            serviceCollection.AddTransient<IConfig, Config.Config>();

            serviceCollection.AddSingleton<INHibernateSessionFactory, NHibernateSessionFactory>();
            serviceCollection.AddScoped(p => p.GetService<INHibernateSessionFactory>().GetSessionFactory().OpenSession());

            serviceCollection.AddTransient<ISQLStatementInterceptor, SQLStatementInterceptor>();
        }
    }
}
