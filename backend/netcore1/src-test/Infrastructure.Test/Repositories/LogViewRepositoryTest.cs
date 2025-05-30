using System;
using System.Threading.Tasks;
using Domain;
using Domain.Enum;
using Domain.Interfaces.Config;
using Domain.Interfaces.DataContext;
using Domain.Models;
using Domain.Models.Log;
using Infrastructure.Repositories;
using Infrastructure.Test.TestContext;
using NSubstitute;
using NUnit.Framework;

namespace Infrastructure.Test.Repositories;

[TestFixture]
public class LogViewRepositoryTest : RepositoryTestBase
{
    private ILogConfig _logConfig;
    private IApplicationDbContextFactory _contextFactory;

    [SetUp]
    public async Task SetUpAsync()
    {
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
    public void GetAllLevels_ThenReturnAllLevels()
    {
        var sut = new LogViewRepository(_contextFactory);
        var result = sut.GetAllLevels();

        Assert.That(result.Count, Is.EqualTo(Enum.GetNames(typeof(LogLevel)).Length));
    }

    [Test]
    public void GetAllLoggers_ThenReturnAllLevels()
    {
        var sut = new LogViewRepository(_contextFactory);
        var result = sut.GetAllLoggers();

        Assert.That(result.Count, Is.EqualTo(Enum.GetNames(typeof(LoggerName)).Length));
    }

    [Test]
    public async Task GivenLevelMatching_WhenGetLogMessagesAsync_ThenReturn()
    {
        await using (var context = CreateContext())
        {
            var testContext = new InfrastructureTestContext(context);
            testContext.LogMessage(LogLevel.Error, "Test", "Test message");
            await context.SaveChangesAsync();
        }

        await using (var context = CreateContext())
        {
            _contextFactory.CreateDbContext().Returns(context);
            var sut = new LogViewRepository(_contextFactory);
            var result = await sut.GetLogMessagesAsync(new LogMessageListRequest() { LogLevel = LogLevel.Error, PageSize = 10 });

            Assert.That(result.TotalCount, Is.EqualTo(1));
            Assert.That(result.Results[0].Message, Is.EqualTo("Test message"));
        }
    }

    [Test]
    public async Task GivenLoggerMatching_WhenGetLogMessagesAsync_ThenReturn()
    {
        await using (var context = CreateContext())
        {
            var testContext = new InfrastructureTestContext(context);
            testContext.LogMessage(LogLevel.Error, "Test", "Test message");
            await context.SaveChangesAsync();
        }

        await using (var context = CreateContext())
        {
            _contextFactory.CreateDbContext().Returns(context);
            var sut = new LogViewRepository(_contextFactory);
            var result = await sut.GetLogMessagesAsync(new LogMessageListRequest() { Logger = "Test", PageSize = 10 });

            Assert.That(result.TotalCount, Is.EqualTo(1));
            Assert.That(result.Results[0].Message, Is.EqualTo("Test message"));
        }
    }

    [Test]
    public async Task GivenAfterFromDate_WhenGetLogMessagesAsync_ThenReturn()
    {
        await using (var context = CreateContext())
        {
            var testContext = new InfrastructureTestContext(context);
            testContext.LogMessage(LogLevel.Error, "Test", "Test message");
            await context.SaveChangesAsync();
        }

        await using (var context = CreateContext())
        {
            _contextFactory.CreateDbContext().Returns(context);
            var sut = new LogViewRepository(_contextFactory);
            var result =
                await sut.GetLogMessagesAsync(new LogMessageListRequest()
                {
                    FromDate = DateTime.UtcNow.AddDays(-1).Ticks.Timestamp(),
                    PageNumber = 1,
                    PageSize = 10
                });

            Assert.That(result.TotalCount, Is.EqualTo(1));
            Assert.That(result.Results[0].Message, Is.EqualTo("Test message"));
        }
    }

    [Test]
    public async Task GivenBeforeToDate_WhenGetLogMessagesAsync_ThenReturn()
    {
        await using (var context = CreateContext())
        {
            var testContext = new InfrastructureTestContext(context);
            testContext.LogMessage(LogLevel.Error, "Test", "Test message");
            await context.SaveChangesAsync();
        }

        await using (var context = CreateContext())
        {
            _contextFactory.CreateDbContext().Returns(context);
            var sut = new LogViewRepository(_contextFactory);
            var result =
                await sut.GetLogMessagesAsync(new LogMessageListRequest()
                {
                    ToDate = DateTime.UtcNow.AddDays(1).Ticks.Timestamp(),
                    PageNumber = 1,
                    PageSize = 10
                }); 

            Assert.That(result.TotalCount, Is.EqualTo(1));
            Assert.That(result.Results[0].Message, Is.EqualTo("Test message"));
        }
    }

    [Test]
    public async Task GivenLogMessages_WhenGetLogMessagesAsyncWithOrderAsc_ThenReturn()
    {
        await using (var context = CreateContext())
        {
            var testContext = new InfrastructureTestContext(context);
            testContext.LogMessage(LogLevel.Error, "Test", "A message");
            testContext.LogMessage(LogLevel.Error, "Test", "B message");
            await context.SaveChangesAsync();
        }

        await using (var context = CreateContext())
        {
            _contextFactory.CreateDbContext().Returns(context);
            var sut = new LogViewRepository(_contextFactory);
            var result =
                await sut.GetLogMessagesAsync(new LogMessageListRequest()
                {
                    ToDate = DateTime.UtcNow.AddDays(1).Ticks.Timestamp(),
                    PageNumber = 1,
                    PageSize = 10,
                    OrderField = "Message",
                    OrderDirection = SortDirection.Asc
                });

            Assert.That(result.TotalCount, Is.EqualTo(2));
            Assert.That(result.Results[0].Message, Is.EqualTo("A message"));
            Assert.That(result.Results[1].Message, Is.EqualTo("B message"));
        }
    }

    [Test]
    public async Task GivenLogMessages_WhenGetLogMessagesAsyncWithOrderDesc_ThenReturn()
    {
        await using (var context = CreateContext())
        {
            var testContext = new InfrastructureTestContext(context);
            testContext.LogMessage(LogLevel.Error, "Test", "A message");
            testContext.LogMessage(LogLevel.Error, "Test", "B message");
            await context.SaveChangesAsync();
        }

        await using (var context = CreateContext())
        {
            _contextFactory.CreateDbContext().Returns(context);
            var sut = new LogViewRepository(_contextFactory);
            var result =
                await sut.GetLogMessagesAsync(new LogMessageListRequest()
                {
                    ToDate = DateTime.UtcNow.AddDays(1).Ticks.Timestamp(),
                    PageNumber = 1,
                    PageSize = 10,
                    OrderField = "Message",
                    OrderDirection = SortDirection.Desc
                });

            Assert.That(result.TotalCount, Is.EqualTo(2));
            Assert.That(result.Results[0].Message, Is.EqualTo("B message"));
            Assert.That(result.Results[1].Message, Is.EqualTo("A message"));
        }
    }

    [Test]
    public async Task GivenLogMessages_WhenGetLogMessagesAsyncWithPage_ThenReturn()
    {
        await using (var context = CreateContext())
        {
            var testContext = new InfrastructureTestContext(context);
            testContext.LogMessage(LogLevel.Error, "Test", "A message");
            testContext.LogMessage(LogLevel.Error, "Test", "B message");
            await context.SaveChangesAsync();
        }

        await using (var context = CreateContext())
        {
            _contextFactory.CreateDbContext().Returns(context);
            var sut = new LogViewRepository(_contextFactory);
            var result =
                await sut.GetLogMessagesAsync(new LogMessageListRequest()
                {
                    ToDate = DateTime.UtcNow.AddDays(1).Ticks.Timestamp(),
                    PageNumber = 2,
                    PageSize = 1,
                    OrderField = "Message",
                    OrderDirection = SortDirection.Asc
                });

            Assert.That(result.TotalCount, Is.EqualTo(2));
            Assert.That(result.Results.Count, Is.EqualTo(1));
            Assert.That(result.Results[0].Message, Is.EqualTo("B message"));
        }
    }


    [Test]
    public async Task GivenLevelMatching_WhenGetLogHttpAsync_ThenReturn()
    {
        await using (var context = CreateContext())
        {
            var testContext = new InfrastructureTestContext(context);
            testContext.LogHttp(LogLevel.Error, "Track Id");
            await context.SaveChangesAsync();
        }

        await using (var context = CreateContext())
        {
            _contextFactory.CreateDbContext().Returns(context);
            var sut = new LogViewRepository(_contextFactory);
            var result = await sut.GetLogHttpAsync(new LogHttpListRequest() { LogLevel = LogLevel.Error, PageSize = 10 });

            Assert.That(result.TotalCount, Is.EqualTo(1));
            Assert.That(result.Results[0].TrackingId, Is.EqualTo("Track Id"));
        }
    }

    [Test]
    public async Task GivenTrackIdMatching_WhenGetLogHttpAsync_ThenReturn()
    {
        await using (var context = CreateContext())
        {
            var testContext = new InfrastructureTestContext(context);
            testContext.LogHttp(LogLevel.Error, "Track Id");
            await context.SaveChangesAsync();
        }

        await using (var context = CreateContext())
        {
            _contextFactory.CreateDbContext().Returns(context);
            var sut = new LogViewRepository(_contextFactory);
            var result = await sut.GetLogHttpAsync(new LogHttpListRequest() { TrackingId = "Track Id", PageSize = 10 });

            Assert.That(result.TotalCount, Is.EqualTo(1));
            Assert.That(result.Results[0].TrackingId, Is.EqualTo("Track Id"));
        }
    }

    [Test]
    public async Task GivenAfterFromDate_WhenGetLogHttpAsync_ThenReturn()
    {
        await using (var context = CreateContext())
        {
            var testContext = new InfrastructureTestContext(context);
            testContext.LogHttp(LogLevel.Error, "Track Id");
            await context.SaveChangesAsync();
        }

        await using (var context = CreateContext())
        {
            _contextFactory.CreateDbContext().Returns(context);
            var sut = new LogViewRepository(_contextFactory);
            var result =
                await sut.GetLogHttpAsync(new LogHttpListRequest()
                {
                    FromDate = DateTime.UtcNow.AddDays(-1).Ticks.Timestamp(),
                    PageSize = 10
                });

            Assert.That(result.TotalCount, Is.EqualTo(1));
            Assert.That(result.Results[0].TrackingId, Is.EqualTo("Track Id"));
        }
    }

    [Test]
    public async Task GivenBeforeToDate_WhenGetLogHttpAsync_ThenReturn()
    {
        await using (var context = CreateContext())
        {
            var testContext = new InfrastructureTestContext(context);
            testContext.LogHttp(LogLevel.Error, "Track Id");
            await context.SaveChangesAsync();
        }

        await using (var context = CreateContext())
        {
            _contextFactory.CreateDbContext().Returns(context);
            var sut = new LogViewRepository(_contextFactory);
            var result =
                await sut.GetLogHttpAsync(new LogHttpListRequest()
                {
                    ToDate = DateTime.UtcNow.AddDays(1).Ticks.Timestamp(),
                    PageSize = 10
                });

            Assert.That(result.TotalCount, Is.EqualTo(1));
            Assert.That(result.Results[0].TrackingId, Is.EqualTo("Track Id"));
        }
    }

    [Test]
    public async Task GivenLogMessages_WhenGetLogHttpAsyncWithOrderAsc_ThenReturn()
    {
        await using (var context = CreateContext())
        {
            var testContext = new InfrastructureTestContext(context);
            testContext.LogHttp(LogLevel.Error, "A Track Id");
            testContext.LogHttp(LogLevel.Error, "B Track Id");
            await context.SaveChangesAsync();
        }

        await using (var context = CreateContext())
        {
            _contextFactory.CreateDbContext().Returns(context);
            var sut = new LogViewRepository(_contextFactory);
            var result =
                await sut.GetLogHttpAsync(new LogHttpListRequest()
                {
                    ToDate = DateTime.UtcNow.AddDays(1).Ticks.Timestamp(),
                    PageNumber = 1,
                    PageSize = 10,
                    OrderField = "TrackingId",
                    OrderDirection = SortDirection.Asc
                });

            Assert.That(result.TotalCount, Is.EqualTo(2));
            Assert.That(result.Results[0].TrackingId, Is.EqualTo("A Track Id"));
            Assert.That(result.Results[1].TrackingId, Is.EqualTo("B Track Id"));
        }
    }

    [Test]
    public async Task GivenLogMessages_WhenGetLogHttpAsyncWithOrderDesc_ThenReturn()
    {
        await using (var context = CreateContext())
        {
            var testContext = new InfrastructureTestContext(context);
            testContext.LogHttp(LogLevel.Error, "A Track Id");
            testContext.LogHttp(LogLevel.Error, "B Track Id");
            await context.SaveChangesAsync();
        }

        await using (var context = CreateContext())
        {
            _contextFactory.CreateDbContext().Returns(context);
            var sut = new LogViewRepository(_contextFactory);
            var result =
                await sut.GetLogHttpAsync(new LogHttpListRequest()
                {
                    ToDate = DateTime.UtcNow.AddDays(1).Ticks.Timestamp(),
                    PageNumber = 1,
                    PageSize = 10,
                    OrderField = "TrackingId",
                    OrderDirection = SortDirection.Desc
                });

            Assert.That(result.TotalCount, Is.EqualTo(2));
            Assert.That(result.Results[0].TrackingId, Is.EqualTo("B Track Id"));
            Assert.That(result.Results[1].TrackingId, Is.EqualTo("A Track Id"));
        }
    }

    [Test]
    public async Task GivenLogMessages_WhenGetLogHttpAsyncWithPage_ThenReturn()
    {
        await using (var context = CreateContext())
        {
            var testContext = new InfrastructureTestContext(context);
            testContext.LogHttp(LogLevel.Error, "A Track Id");
            testContext.LogHttp(LogLevel.Error, "B Track Id");
            await context.SaveChangesAsync();
        }

        await using (var context = CreateContext())
        {
            _contextFactory.CreateDbContext().Returns(context);
            var sut = new LogViewRepository(_contextFactory);
            var result =
                await sut.GetLogHttpAsync(new LogHttpListRequest()
                {
                    ToDate = DateTime.UtcNow.AddDays(1).Ticks.Timestamp(),
                    PageNumber = 2,
                    PageSize = 1,
                    OrderField = "TrackingId",
                    OrderDirection = SortDirection.Asc
                });

            Assert.That(result.TotalCount, Is.EqualTo(2));
            Assert.That(result.Results.Count, Is.EqualTo(1));
            Assert.That(result.Results[0].TrackingId, Is.EqualTo("B Track Id"));
        }
    }
}