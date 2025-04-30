using Domain.Interfaces.Plumbing;
using Domain.Interfaces.Repositories;
using NHibernate;
using NHibernate.SqlCommand;
using Ninject;

namespace Infrastructure.Plumbing
{
    public class SQLStatementInterceptor : EmptyInterceptor, ISQLStatementInterceptor
    {
        private readonly IKernel _kernel;

        public SQLStatementInterceptor(IKernel kernel)
        {
            _kernel = kernel;
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

            var repo = _kernel.Get<ILogWriterRepository>();
            repo.LogSQL(sqlString);

            return sql;
        }
    }
}