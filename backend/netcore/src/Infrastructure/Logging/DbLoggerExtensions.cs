using Microsoft.Extensions.Logging;
using Microsoft.Extensions.DependencyInjection;

namespace Infrastructure.Logging;

public static class DbLoggerExtensions
{
    public static ILoggingBuilder AddDbLogger(this ILoggingBuilder builder)
    {
        builder.Services.AddSingleton<ILoggerProvider, DbLoggerProvider>();
        return builder;
    }
}
