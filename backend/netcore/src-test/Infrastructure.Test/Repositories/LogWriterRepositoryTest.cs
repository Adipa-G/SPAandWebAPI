using System;
using System.Linq;
using System.Threading.Tasks;
using Domain.Entities;
using Domain.Enum;
using Domain.Interfaces.Config;
using Domain.Interfaces.Plumbing;
using Domain.Models.Log;
using Infrastructure.Repositories;
using NSubstitute;
using NUnit.Framework;

namespace Infrastructure.Test.Repositories
{
    [TestFixture]
    public class LogWriterRepositoryTest : RepositoryTestBase
    {
        private IConfig _config;
        private INHibernateSessionFactory _sessionFactory;

        [OneTimeSetUp]
        protected override void OneTimeSetUp()
        {
            base.OneTimeSetUp();
            _config = Substitute.For<IConfig>();
            _sessionFactory = Substitute.For<INHibernateSessionFactory>();
        }

        [OneTimeTearDown]
        protected override void OneTimeTearDown()
        {
            base.OneTimeTearDown();
        }

        [SetUp]
        protected override void SetUp()
        {
            base.SetUp();
            _sessionFactory.GetSessionFactory().Returns(Session.SessionFactory);
            LogWriterRepository.TEST_MODE = true;
        }

        [TearDown]
        public override async Task TearDownAsync()
        {
            await base.TearDownAsync();
        }

        [Test]
        public async Task GivenConfigLevelPermits_WhenLog_ThenLog()
        {
            _config.LogLevelGeneral.Returns(LogLevel.Debug);

            var sut = new LogWriterRepository(_sessionFactory);
            sut.Log(LogLevel.Error, LoggerName.General, "Test Message", new Exception());
            sut.LogThreadExec(_config, Session);
            await FlushAndClearAsync();

            var result = Session.QueryOver<LogMessageRecord>().List<LogMessageRecord>();

            Assert.That(result.Count, Is.EqualTo(1));
            Assert.That(result.Any(r => r.Message == "Test Message"));
        }

        [Test]
        public async Task GivenConfigLevelNotPermits_WhenLog_ThenDoesNot()
        {
            _config.LogLevelGeneral.Returns(LogLevel.Error);

            var sut = new LogWriterRepository(_sessionFactory);
            sut.Log(LogLevel.Debug, LoggerName.General, "Test Message", new Exception());
            sut.LogThreadExec(_config, Session);
            await FlushAndClearAsync();

            var result = Session.QueryOver<LogMessageRecord>().List<LogMessageRecord>();

            Assert.That(result.Count, Is.EqualTo(0));
        }

        [Test]
        public async Task Given_WhenLogRequest_ThenLog()
        {
            _config.LogLevelGeneral.Returns(LogLevel.Error);

            var sut = new LogWriterRepository(_sessionFactory);

            sut.LogRequest(LogLevel.Debug,
                new HttpLogModel()
                {
                    Response = "response",
                    Request = "request",
                    CalledOn = DateTime.Now,
                    RequestHeaders = "headers",
                    StatusCode = 200,
                    TrackingId = "123",
                    Verb = "GET",
                    CallDuration = new TimeSpan(1, 0, 0),
                    ReasonPhrase = "OK",
                    CallerAddress = "127.0.0.1",
                    RequestUri = new Uri("http://www.google.com"),
                    ResponseHeaders = "headers",
                    RequestIdentity = "user"
                }, new Exception());

            sut.LogThreadExec(_config, Session);
            await FlushAndClearAsync();

            var result = Session.QueryOver<LogHttpRecord>().List<LogHttpRecord>();

            Assert.That(result.Count, Is.EqualTo(1));
            Assert.That(result.Any(r => r.RequestIdentity == "user"));
        }

        [Test]
        public async Task GivenConfigPermits_WhenLogSQL_TheLog()
        {
            _config.LogSqlStatements.Returns(true);

            var sut = new LogWriterRepository(_sessionFactory);
            sut.LogSQL("test sql");
            sut.LogThreadExec(_config, Session);
            await FlushAndClearAsync();

            var result = Session.QueryOver<LogMessageRecord>().List<LogMessageRecord>();

            Assert.That(result.Count, Is.EqualTo(1));
            Assert.That(result.Any(r => r.Message == "test sql"));
        }
    }
}
