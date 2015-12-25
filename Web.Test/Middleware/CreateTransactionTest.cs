using System;
using Microsoft.Owin;
using NHibernate;
using Ninject;
using NSubstitute;
using NUnit.Framework;
using Web.Middleware;

namespace Web.Test.Middleware
{
    [TestFixture]
    public class CreateTransactionTest
    {
        private ISession _session; 
        private ITransaction _transaction; 
        private IKernel _kernel;
        private IOwinContext _context;
        private IOwinRequest _request;

        private MockMiddleware _next;

        private CreateTransaction _createTransaction;

        [SetUp]
        public void SetUp()
        {
            _session = Substitute.For<ISession>();
            _transaction = Substitute.For<ITransaction>();
            _session.BeginTransaction().Returns(_transaction);

            _context = Substitute.For<IOwinContext>();
            _request = Substitute.For<IOwinRequest>();
            _context.Request.Returns(_request);

            _kernel = Substitute.For<IKernel>();
            _kernel.GetService(typeof(ISession)).Returns(_session);
            _next = new MockMiddleware();

            _createTransaction = new CreateTransaction(_next, _kernel);
        }

        [Test]
        public void GivenMiddleware_WhenInvokeGet_NoTransaction()
        {
            _request.Method.Returns("GET");

            var result = _createTransaction.Invoke(_context);
            result.Wait();

            _session.Received(0).BeginTransaction();
            _transaction.Received(0).Commit();
            _transaction.Received(0).Rollback();
        }

        [Test]
        public void GivenMiddleware_WhenInvokePost_Transaction()
        {
            _request.Method.Returns("POST");

            var result = _createTransaction.Invoke(_context);
            result.Wait();

            _session.Received(1).BeginTransaction();
            _transaction.Received(1).Commit();
            _transaction.Received(0).Rollback();
        }

        [Test]
        [ExpectedException]
        public void GivenMiddleware_WhenInvokePostWithException_TransactionRollback()
        {
            _next.ThrowException = true;

            _request.Method.Returns("POST");

            var result = _createTransaction.Invoke(_context);
            result.Wait();

            _session.Received(1).BeginTransaction();
            _transaction.Received(0).Commit();
            _transaction.Received(1).Rollback();
        }
    }
}
