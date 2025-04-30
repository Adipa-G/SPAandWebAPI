using Infrastructure.Plumbing;
using NHibernate;

namespace Infrastructure.Test.Repositories
{
    public abstract class RepositoryTestBase
    {
        protected ISession Session;
        protected ITransaction Transaction;

        protected virtual void OneTimeSetUp()
        {
            Session = new NHibernateSessionFactory(null, new TestSQLStatementInterceptor()).GetTestSession();
        }

        protected virtual void OneTimeTearDown()
        {
            Session.Close();
            Session.Dispose();
        }

        protected virtual void SetUp()
        {
            Transaction = Session.BeginTransaction();
        }

        public virtual void TearDown()
        {
            Transaction.Rollback();
            FlushAndClear();
        }

        protected void FlushAndClear()
        {
            Session.Flush();
            Session.Clear();
        }
    }
}