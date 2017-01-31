using Domain.Enum;

namespace Domain.Interfaces.Config
{
    public interface IConfig
    {
        LogLevel LogLevelGeneral { get; set; }
        bool LogRequests { get; set; }
        bool LogSqlStatements { get; set; }
    }
}
