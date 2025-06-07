using System;
using Domain.Enum;
using Domain.Interfaces.Config;
using Microsoft.Extensions.Configuration;

namespace Infrastructure.Config;

public class LogConfig(IConfiguration configuration) : ILogConfig
{
    public LogLevel LogLevelGeneral
    {
        get
        {
            return Enum.Parse<LogLevel>(configuration["Logging:Default"] ?? "Debug");
        }
    }

    public bool LogRequests
    {
        get
        {
            return  bool.Parse(configuration["Logging:LogRequests"] ?? "false");
        }
    }

    public bool LogSqlStatements
    {
        get
        {
            return bool.Parse(configuration["Logging:LogSqlStatements"] ?? "false");
        }
    }
}