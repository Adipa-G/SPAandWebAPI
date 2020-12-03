using Domain.Enum;

namespace Domain.Interfaces.Config
{
    public interface IConfig
    {
        LogLevel LogLevelGeneral { get;  }
        bool LogRequests { get;  }
        bool LogSqlStatements { get; }
    }
}
