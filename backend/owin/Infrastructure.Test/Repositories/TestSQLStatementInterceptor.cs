using Domain.Interfaces.Plumbing;
using NHibernate;
using NHibernate.SqlCommand;
using System;

namespace Infrastructure.Test.Repositories
{
    public class TestSQLStatementInterceptor : EmptyInterceptor, ISQLStatementInterceptor
    {
        public override SqlString OnPrepareStatement(SqlString sql)
        {
            Console.WriteLine(sql);
            return sql;
        }
    }
}