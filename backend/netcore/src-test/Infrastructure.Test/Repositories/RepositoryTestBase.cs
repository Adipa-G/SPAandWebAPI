using System.Threading.Tasks;
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

        public virtual async Task TearDownAsync()
        {
            await Transaction.RollbackAsync();
            await FlushAndClearAsync();
        }

        protected async Task FlushAndClearAsync()
        {
            await Session.FlushAsync();
            Session.Clear();
        }
    }
}
