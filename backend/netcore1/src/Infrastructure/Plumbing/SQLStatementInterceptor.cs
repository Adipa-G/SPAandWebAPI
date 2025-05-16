using System;
using Domain.Interfaces.Plumbing;
using Domain.Interfaces.Repositories;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;

namespace Infrastructure.Plumbing
{
    public class SQLStatementInterceptor : ILoggerFactory
    {
        private readonly IServiceProvider _serviceProvider;

        public SQLStatementInterceptor(IServiceProvider serviceProvider)
        {
            _serviceProvider = serviceProvider;
        }

        public ILogger CreateLogger(string categoryName)
        {
            return new SQLLogger();
        }

        public override SqlString OnPrepareStatement(SqlString sql)
        {
            var sqlString = sql.ToString();
            var lower = sqlString.ToLower();
            if (lower.Contains("logmessagerecord")
                || lower.Contains("loghttprecord")
                || lower.Contains("configsetting"))
            {
                return sql;
            }

            var repo = _serviceProvider.GetService<ILogWriterRepository>();
            repo.LogSQL(sqlString);

            return sql;
        }
    }

    class SQLLogger : ILogger
    {
        public bool IsEnabled(LogLevel logLevel)
        {
            return true;
        }

        public IDisposable BeginScope<TState>(TState state) where TState : notnull
        {
            return null;
        }

        public void Log<TState>(LogLevel logLevel, EventId eventId, TState state, Exception exception, Func<TState, Exception, string> formatter)
        {
            
        }
    }
}
