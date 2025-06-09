using System;
using Domain.Enum;
using Domain.Interfaces.Repositories;
using Microsoft.Extensions.Logging;
using LogLevel = Microsoft.Extensions.Logging.LogLevel;

namespace Infrastructure.Logging;

public sealed class DbLogger(ILogWriterRepository logWriterRepository) : ILogger
{
    public IDisposable? BeginScope<TState>(TState state) where TState : notnull => default!;

    public bool IsEnabled(LogLevel logLevel) => true;

    public void Log<TState>(LogLevel logLevel, EventId eventId, TState state, Exception? exception, Func<TState, Exception?, string> formatter)
    {
        var internalLevel = logLevel switch
        {
            LogLevel.Trace => Domain.Enum.LogLevel.Debug,
            LogLevel.Debug => Domain.Enum.LogLevel.Debug,
            LogLevel.Information => Domain.Enum.LogLevel.Info,
            LogLevel.Warning => Domain.Enum.LogLevel.Warn,
            LogLevel.Error => Domain.Enum.LogLevel.Error,
            LogLevel.Critical => Domain.Enum.LogLevel.Error,
            _ => Domain.Enum.LogLevel.Info
        };

        logWriterRepository.Log(internalLevel, LoggerName.General, formatter(state, exception), exception);
    }
}
