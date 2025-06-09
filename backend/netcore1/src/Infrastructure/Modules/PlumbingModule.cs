using Domain.Interfaces.Config;
using Infrastructure.Config;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace Infrastructure.Modules;

public class PlumbingModule
{
    public static void Load(IServiceCollection services, IConfiguration configuration)
    {
        services.AddTransient<ILogConfig, LogConfig>();
    }
}