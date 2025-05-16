using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.DependencyInjection;
using NHibernate;
using NSubstitute;
using NUnit.Framework;
using Web.Middleware;
using ISession = NHibernate.ISession;

namespace Web.Test.Middleware
{
    [TestFixture]
    public class CreateTransactionTest
    {
        private ISession _session;
        private ITransaction _transaction;
        private IServiceProvider _serviceProvider;

        private MockMiddleware _next;

        private HttpContext _context;

        private CreateTransaction _createTransaction;

        [SetUp]
        public void SetUp()
        {
            _next = new MockMiddleware();

            _serviceProvider = Substitute.For<IServiceProvider>();
            _context = new DefaultHttpContext();

            _context.RequestServices = _serviceProvider;

            _session = Substitute.For<ISession>();
            _transaction = Substitute.For<ITransaction>();
            _session.BeginTransaction().Returns(_transaction);

            _serviceProvider.GetService<ISession>().Returns(_session);
            _createTransaction = new CreateTransaction(_next.Invoke);
        }

        [Test]
        public async Task GivenMiddleware_WhenInvokeGet_NoTransaction()
        {
            _context.Request.Method = "GET";

            await _createTransaction.Invoke(_context, _session);

            _session.Received(0).BeginTransaction();
            _transaction.Received(0).Commit();
            _transaction.Received(0).Rollback();
        }

        [Test]
        public async Task GivenMiddleware_WhenInvokePost_Transaction()
        {
            _context.Request.Method = "POST";

            await _createTransaction.Invoke(_context, _session);

            _session.Received(1).BeginTransaction();
            await _transaction.Received(1).CommitAsync();
            await _transaction.Received(0).RollbackAsync();
        }

        [Test]
        public async Task GivenMiddleware_WhenInvokePostWithException_TransactionRollback()
        {
            _next.ThrowException = true;

            _context.Request.Method = "POST";

            Assert.ThrowsAsync<Exception>(() => _createTransaction.Invoke(_context, _session));

            _session.Received(1).BeginTransaction();
            await _transaction.Received(0).CommitAsync();
            await _transaction.Received(1).RollbackAsync();
        }
    }
}
