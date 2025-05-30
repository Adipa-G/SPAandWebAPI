using Domain.Interfaces.Config;
using Infrastructure.Config;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace Infrastructure.Modules;

public class PlumbingModule
{
    public static void Load(IServiceCollection serviceCollection, IConfiguration configuration)
    {
        serviceCollection.AddTransient<ILogConfig, LogConfig>();
    }
}