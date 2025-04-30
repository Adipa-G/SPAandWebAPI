using System;
using System.Threading.Tasks;
using Domain;
using Domain.Enum;
using Domain.Models;
using Domain.Models.Log;
using Infrastructure.Repositories;
using Infrastructure.Test.TestContext;
using NUnit.Framework;

namespace Infrastructure.Test.Repositories
{
    [TestFixture]
    public class LogViewRepositoryTest : RepositoryTestBase
    {
        [OneTimeSetUp]
        protected override void OneTimeSetUp()
        {
            base.OneTimeSetUp();
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
        }

        [TearDown]
        public override async Task TearDownAsync()
        {
            await base.TearDownAsync();
        }

        [Test]
        public void GetAllLevels_ThenReturnAllLevels()
        {
            var sut = new LogViewRepository(Session);
            var result = sut.GetAllLevels();

            Assert.That(result.Count, Is.EqualTo(Enum.GetNames(typeof(LogLevel)).Length));
        }

        [Test]
        public void GetAllLoggers_ThenReturnAllLevels()
        {
            var sut = new LogViewRepository(Session);
            var result = sut.GetAllLoggers();

            Assert.That(result.Count, Is.EqualTo(Enum.GetNames(typeof(LoggerName)).Length));
        }

        [Test]
        public async Task GivenLevelMatching_WhenGetLogMessagesAsync_ThenReturn()
        {
            var context = new InfrastructureTestContext(Session);
            context.LogMessage(LogLevel.Error, "Test", "Test message");
            await FlushAndClearAsync();

            var sut = new LogViewRepository(Session);
            var result = await sut.GetLogMessagesAsync(new LogMessageListRequest() { LogLevel = LogLevel.Error, PageSize = 10 });

            Assert.That(result.TotalCount, Is.EqualTo(1));
            Assert.That(result.Results[0].Message, Is.EqualTo("Test message"));
        }

        [Test]
        public async Task GivenLoggerMatching_WhenGetLogMessagesAsync_ThenReturn()
        {
            var context = new InfrastructureTestContext(Session);
            context.LogMessage(LogLevel.Error, "Test", "Test message");
            await FlushAndClearAsync();

            var sut = new LogViewRepository(Session);
            var result = await sut.GetLogMessagesAsync(new LogMessageListRequest() { Logger = "Test", PageSize = 10 });

            Assert.That(result.TotalCount, Is.EqualTo(1));
            Assert.That(result.Results[0].Message, Is.EqualTo("Test message"));
        }

        [Test]
        public async Task GivenAfterFromDate_WhenGetLogMessagesAsync_ThenReturn()
        {
            var context = new InfrastructureTestContext(Session);
            context.LogMessage(LogLevel.Error, "Test", "Test message");
            await FlushAndClearAsync();

            var sut = new LogViewRepository(Session);
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

        [Test]
        public async Task GivenBeforeToDate_WhenGetLogMessagesAsync_ThenReturn()
        {
            var context = new InfrastructureTestContext(Session);
            context.LogMessage(LogLevel.Error, "Test", "Test message");
            await FlushAndClearAsync();

            var sut = new LogViewRepository(Session);
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

        [Test]
        public async Task GivenLogMessages_WhenGetLogMessagesAsyncWithOrderAsc_ThenReturn()
        {
            var context = new InfrastructureTestContext(Session);
            context.LogMessage(LogLevel.Error, "Test", "A message");
            context.LogMessage(LogLevel.Error, "Test", "B message");
            await FlushAndClearAsync();

            var sut = new LogViewRepository(Session);
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

        [Test]
        public async Task GivenLogMessages_WhenGetLogMessagesAsyncWithOrderDesc_ThenReturn()
        {
            var context = new InfrastructureTestContext(Session);
            context.LogMessage(LogLevel.Error, "Test", "A message");
            context.LogMessage(LogLevel.Error, "Test", "B message");
            await FlushAndClearAsync();

            var sut = new LogViewRepository(Session);
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

        [Test]
        public async Task GivenLogMessages_WhenGetLogMessagesAsyncWithPage_ThenReturn()
        {
            var context = new InfrastructureTestContext(Session);
            context.LogMessage(LogLevel.Error, "Test", "A message");
            context.LogMessage(LogLevel.Error, "Test", "B message");
            await FlushAndClearAsync();

            var sut = new LogViewRepository(Session);
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


        [Test]
        public async Task GivenLevelMatching_WhenGetLogHttpAsync_ThenReturn()
        {
            var context = new InfrastructureTestContext(Session);
            context.LogHttp(LogLevel.Error, "Track Id");
            await FlushAndClearAsync();

            var sut = new LogViewRepository(Session);
            var result = await sut.GetLogHttpAsync(new LogHttpListRequest() { LogLevel = LogLevel.Error, PageSize = 10 });

            Assert.That(result.TotalCount, Is.EqualTo(1));
            Assert.That(result.Results[0].TrackingId, Is.EqualTo("Track Id"));
        }

        [Test]
        public async Task GivenTrackIdMatching_WhenGetLogHttpAsync_ThenReturn()
        {
            var context = new InfrastructureTestContext(Session);
            context.LogHttp(LogLevel.Error, "Track Id");
            await FlushAndClearAsync();

            var sut = new LogViewRepository(Session);
            var result = await sut.GetLogHttpAsync(new LogHttpListRequest() { TrackingId = "Track Id", PageSize = 10 });

            Assert.That(result.TotalCount, Is.EqualTo(1));
            Assert.That(result.Results[0].TrackingId, Is.EqualTo("Track Id"));
        }

        [Test]
        public async Task GivenAfterFromDate_WhenGetLogHttpAsync_ThenReturn()
        {
            var context = new InfrastructureTestContext(Session);
            context.LogHttp(LogLevel.Error, "Track Id");
            await FlushAndClearAsync();

            var sut = new LogViewRepository(Session);
            var result =
                await sut.GetLogHttpAsync(new LogHttpListRequest()
                {
                    FromDate = DateTime.UtcNow.AddDays(-1).Ticks.Timestamp(),
                    PageSize = 10
                });

            Assert.That(result.TotalCount, Is.EqualTo(1));
            Assert.That(result.Results[0].TrackingId, Is.EqualTo("Track Id"));
        }

        [Test]
        public async Task GivenBeforeToDate_WhenGetLogHttpAsync_ThenReturn()
        {
            var context = new InfrastructureTestContext(Session);
            context.LogHttp(LogLevel.Error, "Track Id");
            await FlushAndClearAsync();

            var sut = new LogViewRepository(Session);
            var result =
                await sut.GetLogHttpAsync(new LogHttpListRequest()
                {
                    ToDate = DateTime.UtcNow.AddDays(1).Ticks.Timestamp(),
                    PageSize = 10
                });

            Assert.That(result.TotalCount, Is.EqualTo(1));
            Assert.That(result.Results[0].TrackingId, Is.EqualTo("Track Id"));
        }

        [Test]
        public async Task GivenLogMessages_WhenGetLogHttpAsyncWithOrderAsc_ThenReturn()
        {
            var context = new InfrastructureTestContext(Session);
            context.LogHttp(LogLevel.Error, "A Track Id");
            context.LogHttp(LogLevel.Error, "B Track Id");
            await FlushAndClearAsync();

            var sut = new LogViewRepository(Session);
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

        [Test]
        public async Task GivenLogMessages_WhenGetLogHttpAsyncWithOrderDesc_ThenReturn()
        {
            var context = new InfrastructureTestContext(Session);
            context.LogHttp(LogLevel.Error, "A Track Id");
            context.LogHttp(LogLevel.Error, "B Track Id");
            await FlushAndClearAsync();

            var sut = new LogViewRepository(Session);
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

        [Test]
        public async Task GivenLogMessages_WhenGetLogHttpAsyncWithPage_ThenReturn()
        {
            var context = new InfrastructureTestContext(Session);
            context.LogHttp(LogLevel.Error, "A Track Id");
            context.LogHttp(LogLevel.Error, "B Track Id");
            await FlushAndClearAsync();

            var sut = new LogViewRepository(Session);
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
