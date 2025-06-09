using Domain.Interfaces.Repositories;
using Microsoft.Extensions.Logging;

namespace Infrastructure.Logging;

[ProviderAlias("DbLoggers")]
public sealed class DbLoggerProvider(ILogWriterRepository logWriterRepository) : ILoggerProvider
{
    private readonly DbLogger _dbLogger = new(logWriterRepository);

    public ILogger CreateLogger(string categoryName) => _dbLogger;
    
    public void Dispose()
    {
    }
}
