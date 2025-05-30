using System;
using Domain.Enum;
using Domain.Interfaces.Config;
using Microsoft.Extensions.Configuration;

namespace Infrastructure.Config;

public class LogConfig : ILogConfig
{
    private readonly IConfiguration _configuration;

    public LogConfig(IConfiguration configuration)
    {
        _configuration = configuration;
    }

    public LogLevel LogLevelGeneral
    {
        get
        {
            return Enum.Parse<LogLevel>(_configuration["Logging:Default"] ?? "Debug");
        }
    }

    public bool LogRequests
    {
        get
        {
            return  bool.Parse(_configuration["Logging:LogRequests"] ?? "false");
        }
    }

    public bool LogSqlStatements
    {
        get
        {
            return bool.Parse(_configuration["Logging:LogSqlStatements"] ?? "false");
        }
    }
}