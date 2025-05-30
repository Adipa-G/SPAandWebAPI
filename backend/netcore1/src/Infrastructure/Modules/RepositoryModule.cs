using Domain.Interfaces.Repositories;
using Infrastructure.Repositories;
using Microsoft.Extensions.DependencyInjection;

namespace Infrastructure.Modules
{
    public class RepositoryModule
    {
        public static void Load(IServiceCollection serviceCollection)
        {
            serviceCollection.AddSingleton<ILogWriterRepository, LogWriterRepository>();
            serviceCollection.AddTransient<ILogViewRepository, LogViewRepository>();
        }
    }
}
