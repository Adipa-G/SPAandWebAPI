using System;
using System.Linq;
using System.Threading.Tasks;
using Domain.Enum;
using Domain.Interfaces.Config;
using Domain.Models.Log;
using Infrastructure.DataContext;
using Infrastructure.Repositories;
using Microsoft.EntityFrameworkCore;
using NSubstitute;
using NUnit.Framework;

namespace Infrastructure.Test.Repositories;

[TestFixture]
public class LogWriterRepositoryTest : RepositoryTestBase
{
    private ILogConfig _logConfig;
    private IApplicationDbContextFactory _contextFactory;

    [SetUp]
    public async Task SetUpAsync()
    {
        LogWriterRepository.TEST_MODE = true;
        await BaseSetUpAsync();

        _logConfig = Substitute.For<ILogConfig>();
        _contextFactory = Substitute.For<IApplicationDbContextFactory>();
    }

    [TearDown]
    public async Task TearDownAsync()
    {
        await BaseTearDownAsync();

        _logConfig = null;
        _contextFactory = null;
    }

    [Test]
    public async Task GivenConfigLevelPermits_WhenLog_ThenLog()
    {
        _logConfig.LogLevelGeneral.Returns(LogLevel.Debug);

        await using (var context = CreateContext())
        {
            var sut = new LogWriterRepository(_contextFactory, _logConfig);
            sut.Log(LogLevel.Error, LoggerName.General, "Test Message", new Exception());
            sut.LogThreadExec(_logConfig, context);
            await context.SaveChangesAsync();
        }

        await using (var context = CreateContext())
        {
            var result = await context.LogMessageRecords.ToListAsync();

            Assert.That(result.Count, Is.EqualTo(1));
            Assert.That(result.Any(r => r.Message == "Test Message"));
        }
    }

    [Test]
    public async Task GivenConfigLevelNotPermits_WhenLog_ThenDoesNot()
    {
        _logConfig.LogLevelGeneral.Returns(LogLevel.Error);

        await using (var context = CreateContext())
        {
            var sut = new LogWriterRepository(_contextFactory, _logConfig);
            sut.Log(LogLevel.Debug, LoggerName.General, "Test Message", new Exception());
            sut.LogThreadExec(_logConfig, context);
            await context.SaveChangesAsync();
        }

        await using (var context = CreateContext())
        {
            var result = await context.LogMessageRecords.ToListAsync();

            Assert.That(result.Count, Is.EqualTo(0));
        }
    }

    [Test]
    public async Task Given_WhenLogRequest_ThenLog()
    {
        _logConfig.LogLevelGeneral.Returns(LogLevel.Error);

        await using (var context = CreateContext())
        {
            var sut = new LogWriterRepository(_contextFactory, _logConfig);
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

            sut.LogThreadExec(_logConfig, context);
            await context.SaveChangesAsync();
        }

        await using (var context = CreateContext())
        {
            var result = await context.LogHttpRecords.ToListAsync();

            Assert.That(result.Count, Is.EqualTo(1));
            Assert.That(result.Any(r => r.RequestIdentity == "user"));
        }
    }

    [Test]
    public async Task GivenConfigPermits_WhenLogSQL_TheLog()
    {
        _logConfig.LogSqlStatements.Returns(true);

        await using (var context = CreateContext())
        {
            var sut = new LogWriterRepository(_contextFactory, _logConfig);
            sut.LogSQL("test sql");
            sut.LogThreadExec(_logConfig, context);
            await context.SaveChangesAsync();
        }

        await using (var context = CreateContext())
        {
            var result = await context.LogMessageRecords.ToListAsync();

            Assert.That(result.Count, Is.EqualTo(1));
            Assert.That(result.Any(r => r.Message == "test sql"));
        }
    }
}