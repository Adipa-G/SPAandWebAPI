using Domain.Enum;

namespace Domain.Interfaces.Config;

public interface ILogConfig
{
    LogLevel LogLevelGeneral { get; }
    bool LogRequests { get;  }
    bool LogSqlStatements { get; }
}