using Domain;
using Domain.Enum;
using Domain.Models;
using Domain.Models.Log;
using Infrastructure.Repositories;
using Infrastructure.Test.TestContext;
using NUnit.Framework;
using System;

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
        public override void TearDown()
        {
            base.TearDown();
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
        public void GivenLevelMatching_WhenGetLogMessages_ThenReturn()
        {
            var context = new InfrastructureTestContext(Session);
            context.LogMessage(LogLevel.Error, "Test", "Test message");
            FlushAndClear();

            var sut = new LogViewRepository(Session);
            var result = sut.GetLogMessages(new LogMessageListRequest() { LogLevel = LogLevel.Error, PageSize = 10 });

            Assert.That(result.TotalCount, Is.EqualTo(1));
            Assert.That(result.Results[0].Message, Is.EqualTo("Test message"));
        }

        [Test]
        public void GivenLoggerMatching_WhenGetLogMessages_ThenReturn()
        {
            var context = new InfrastructureTestContext(Session);
            context.LogMessage(LogLevel.Error, "Test", "Test message");
            FlushAndClear();

            var sut = new LogViewRepository(Session);
            var result = sut.GetLogMessages(new LogMessageListRequest() { Logger = "Test", PageSize = 10 });

            Assert.That(result.TotalCount, Is.EqualTo(1));
            Assert.That(result.Results[0].Message, Is.EqualTo("Test message"));
        }

        [Test]
        public void GivenAfterFromDate_WhenGetLogMessages_ThenReturn()
        {
            var context = new InfrastructureTestContext(Session);
            context.LogMessage(LogLevel.Error, "Test", "Test message");
            FlushAndClear();

            var sut = new LogViewRepository(Session);
            var result =
                sut.GetLogMessages(new LogMessageListRequest()
                {
                    FromDate = DateTime.UtcNow.AddDays(-1).Timestamp(),
                    PageNumber = 1,
                    PageSize = 10
                });

            Assert.That(result.TotalCount, Is.EqualTo(1));
            Assert.That(result.Results[0].Message, Is.EqualTo("Test message"));
        }

        [Test]
        public void GivenBeforeToDate_WhenGetLogMessages_ThenReturn()
        {
            var context = new InfrastructureTestContext(Session);
            context.LogMessage(LogLevel.Error, "Test", "Test message");
            FlushAndClear();

            var sut = new LogViewRepository(Session);
            var result =
                sut.GetLogMessages(new LogMessageListRequest()
                {
                    ToDate = DateTime.UtcNow.AddDays(1).Timestamp(),
                    PageNumber = 1,
                    PageSize = 10
                });

            Assert.That(result.TotalCount, Is.EqualTo(1));
            Assert.That(result.Results[0].Message, Is.EqualTo("Test message"));
        }

        [Test]
        public void GivenLogMessages_WhenGetLogMessagesWithOrderAsc_ThenReturn()
        {
            var context = new InfrastructureTestContext(Session);
            context.LogMessage(LogLevel.Error, "Test", "A message");
            context.LogMessage(LogLevel.Error, "Test", "B message");
            FlushAndClear();

            var sut = new LogViewRepository(Session);
            var result =
                sut.GetLogMessages(new LogMessageListRequest()
                {
                    ToDate = DateTime.UtcNow.AddDays(1).Timestamp(),
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
        public void GivenLogMessages_WhenGetLogMessagesWithOrderDesc_ThenReturn()
        {
            var context = new InfrastructureTestContext(Session);
            context.LogMessage(LogLevel.Error, "Test", "A message");
            context.LogMessage(LogLevel.Error, "Test", "B message");
            FlushAndClear();

            var sut = new LogViewRepository(Session);
            var result =
                sut.GetLogMessages(new LogMessageListRequest()
                {
                    ToDate = DateTime.UtcNow.AddDays(1).Timestamp(),
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
        public void GivenLogMessages_WhenGetLogMessagesWithPage_ThenReturn()
        {
            var context = new InfrastructureTestContext(Session);
            context.LogMessage(LogLevel.Error, "Test", "A message");
            context.LogMessage(LogLevel.Error, "Test", "B message");
            FlushAndClear();

            var sut = new LogViewRepository(Session);
            var result =
                sut.GetLogMessages(new LogMessageListRequest()
                {
                    ToDate = DateTime.UtcNow.AddDays(1).Timestamp(),
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
        public void GivenLevelMatching_WhenGetLogHttp_ThenReturn()
        {
            var context = new InfrastructureTestContext(Session);
            context.LogHttp(LogLevel.Error, "Track Id");
            FlushAndClear();

            var sut = new LogViewRepository(Session);
            var result = sut.GetLogHttp(new LogHttpListRequest() { LogLevel = LogLevel.Error, PageSize = 10 });

            Assert.That(result.TotalCount, Is.EqualTo(1));
            Assert.That(result.Results[0].TrackingId, Is.EqualTo("Track Id"));
        }

        [Test]
        public void GivenTrackIdMatching_WhenGetLogHttp_ThenReturn()
        {
            var context = new InfrastructureTestContext(Session);
            context.LogHttp(LogLevel.Error, "Track Id");
            FlushAndClear();

            var sut = new LogViewRepository(Session);
            var result = sut.GetLogHttp(new LogHttpListRequest() { TrackingId = "Track Id", PageSize = 10 });

            Assert.That(result.TotalCount, Is.EqualTo(1));
            Assert.That(result.Results[0].TrackingId, Is.EqualTo("Track Id"));
        }

        [Test]
        public void GivenAfterFromDate_WhenGetLogHttp_ThenReturn()
        {
            var context = new InfrastructureTestContext(Session);
            context.LogHttp(LogLevel.Error, "Track Id");
            FlushAndClear();

            var sut = new LogViewRepository(Session);
            var result =
                sut.GetLogHttp(new LogHttpListRequest()
                {
                    FromDate = DateTime.UtcNow.AddDays(-1).Timestamp(),
                    PageSize = 10
                });

            Assert.That(result.TotalCount, Is.EqualTo(1));
            Assert.That(result.Results[0].TrackingId, Is.EqualTo("Track Id"));
        }

        [Test]
        public void GivenBeforeToDate_WhenGetLogHttp_ThenReturn()
        {
            var context = new InfrastructureTestContext(Session);
            context.LogHttp(LogLevel.Error, "Track Id");
            FlushAndClear();

            var sut = new LogViewRepository(Session);
            var result =
                sut.GetLogHttp(new LogHttpListRequest()
                {
                    ToDate = DateTime.UtcNow.AddDays(1).Timestamp(),
                    PageSize = 10
                });

            Assert.That(result.TotalCount, Is.EqualTo(1));
            Assert.That(result.Results[0].TrackingId, Is.EqualTo("Track Id"));
        }

        [Test]
        public void GivenLogMessages_WhenGetLogHttpWithOrderAsc_ThenReturn()
        {
            var context = new InfrastructureTestContext(Session);
            context.LogHttp(LogLevel.Error, "A Track Id");
            context.LogHttp(LogLevel.Error, "B Track Id");
            FlushAndClear();

            var sut = new LogViewRepository(Session);
            var result =
                sut.GetLogHttp(new LogHttpListRequest()
                {
                    ToDate = DateTime.UtcNow.AddDays(1).Timestamp(),
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
        public void GivenLogMessages_WhenGetLogHttpWithOrderDesc_ThenReturn()
        {
            var context = new InfrastructureTestContext(Session);
            context.LogHttp(LogLevel.Error, "A Track Id");
            context.LogHttp(LogLevel.Error, "B Track Id");
            FlushAndClear();

            var sut = new LogViewRepository(Session);
            var result =
                sut.GetLogHttp(new LogHttpListRequest()
                {
                    ToDate = DateTime.UtcNow.AddDays(1).Timestamp(),
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
        public void GivenLogMessages_WhenGetLogHttpWithPage_ThenReturn()
        {
            var context = new InfrastructureTestContext(Session);
            context.LogHttp(LogLevel.Error, "A Track Id");
            context.LogHttp(LogLevel.Error, "B Track Id");
            FlushAndClear();

            var sut = new LogViewRepository(Session);
            var result =
                sut.GetLogHttp(new LogHttpListRequest()
                {
                    ToDate = DateTime.UtcNow.AddDays(1).Timestamp(),
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