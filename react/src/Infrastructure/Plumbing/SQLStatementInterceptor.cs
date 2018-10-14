using System;
using Domain.Interfaces.Plumbing;
using Domain.Interfaces.Repositories;
using Microsoft.Extensions.DependencyInjection;
using NHibernate;
using NHibernate.SqlCommand;

namespace Infrastructure.Plumbing
{
    public class SQLStatementInterceptor : EmptyInterceptor , ISQLStatementInterceptor
    {
        private readonly IServiceProvider _serviceProvider;

        public SQLStatementInterceptor(IServiceProvider serviceProvider)
        {
            _serviceProvider = serviceProvider;
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
}
