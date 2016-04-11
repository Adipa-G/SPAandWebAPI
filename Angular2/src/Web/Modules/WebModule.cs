using Microsoft.Extensions.DependencyInjection;
using NHibernate;

namespace Web.Modules
{
    public class WebModule
    {
        public static void Load(IServiceCollection serviceCollection)
        {
            serviceCollection.AddScoped(sc => sc.GetService<ISessionFactory>().OpenSession());
        }
    }
}