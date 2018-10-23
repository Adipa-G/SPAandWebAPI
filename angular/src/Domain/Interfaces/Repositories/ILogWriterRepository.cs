using System;
using Domain.Enum;
using Domain.Models.Log;

namespace Domain.Interfaces.Repositories
{
    public interface ILogWriterRepository
    {
        void LogSQL(string sql);
        void Log(LogLevel level, LoggerName logger, string message, Exception ex);
        void LogRequest(LogLevel level, HttpLogModel log, Exception ex);
    }
}
