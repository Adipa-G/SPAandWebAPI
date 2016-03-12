using System;
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
        [TestFixtureSetUp]
        protected override void OneTimeSetUp()
        {
            base.OneTimeSetUp();
        }

        [TestFixtureTearDown]
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

            Assert.AreEqual(Enum.GetNames(typeof (LogLevel)).Length, result.Count);
        }

        [Test]
        public void GetAllLoggers_ThenReturnAllLevels()
        {
            var sut = new LogViewRepository(Session);
            var result = sut.GetAllLoggers();

            Assert.AreEqual(Enum.GetNames(typeof(LoggerName)).Length, result.Count);
        }

        [Test]
        public void GivenLevelMatching_WhenGetLogMessages_ThenReturn()
        {
            var context = new InfrastructureTestContext(Session);
            context.LogMessage(LogLevel.Error, "Test", "Test message");
            FlushAndClear();

            var sut = new LogViewRepository(Session);
            var result = sut.GetLogMessages(new LogMessageListRequest() {LogLevel = LogLevel.Error, PageSize = 10});

            Assert.AreEqual(1, result.TotalCount);
            Assert.AreEqual("Test message", result.Results[0].Message);
        }

        [Test]
        public void GivenLoggerMatching_WhenGetLogMessages_ThenReturn()
        {
            var context = new InfrastructureTestContext(Session);
            context.LogMessage(LogLevel.Error, "Test", "Test message");
            FlushAndClear();

            var sut = new LogViewRepository(Session);
            var result = sut.GetLogMessages(new LogMessageListRequest() {Logger = "Test", PageSize = 10});

            Assert.AreEqual(1, result.TotalCount);
            Assert.AreEqual("Test message", result.Results[0].Message);
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

            Assert.AreEqual(1, result.TotalCount);
            Assert.AreEqual("Test message", result.Results[0].Message);
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

            Assert.AreEqual(1, result.TotalCount);
            Assert.AreEqual("Test message", result.Results[0].Message);
        }

        [Test]
        public void GivenLogMessages_WhenGetLogMessagesWithOrderAsc_ThenReturn()
        {
            var context = new InfrastructureTestContext(Session);
            context.LogMessage(LogLevel.Error, "Test","A message");
            context.LogMessage(LogLevel.Error, "Test","B message");
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

            Assert.AreEqual(2, result.TotalCount);
            Assert.AreEqual("A message", result.Results[0].Message);
            Assert.AreEqual("B message", result.Results[1].Message);
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

            Assert.AreEqual(2, result.TotalCount);
            Assert.AreEqual("B message", result.Results[0].Message);
            Assert.AreEqual("A message", result.Results[1].Message);
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

            Assert.AreEqual(2, result.TotalCount);
            Assert.AreEqual(1, result.Results.Count);
            Assert.AreEqual("B message", result.Results[0].Message);
        }


        [Test]
        public void GivenLevelMatching_WhenGetLogHttp_ThenReturn()
        {
            var context = new InfrastructureTestContext(Session);
            context.LogHttp(LogLevel.Error,"Track Id");
            FlushAndClear();

            var sut = new LogViewRepository(Session);
            var result = sut.GetLogHttp(new LogHttpListRequest() { LogLevel = LogLevel.Error, PageSize = 10 });

            Assert.AreEqual(1, result.TotalCount);
            Assert.AreEqual("Track Id", result.Results[0].TrackingId);
        }

        [Test]
        public void GivenTrackIdMatching_WhenGetLogHttp_ThenReturn()
        {
            var context = new InfrastructureTestContext(Session);
            context.LogHttp(LogLevel.Error, "Track Id");
            FlushAndClear();

            var sut = new LogViewRepository(Session);
            var result = sut.GetLogHttp(new LogHttpListRequest() { TrackingId = "Track Id", PageSize = 10 });

            Assert.AreEqual(1, result.TotalCount);
            Assert.AreEqual("Track Id", result.Results[0].TrackingId);
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

            Assert.AreEqual(1, result.TotalCount);
            Assert.AreEqual("Track Id", result.Results[0].TrackingId);
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

            Assert.AreEqual(1, result.TotalCount);
            Assert.AreEqual("Track Id", result.Results[0].TrackingId);
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

            Assert.AreEqual(2, result.TotalCount);
            Assert.AreEqual("A Track Id", result.Results[0].TrackingId);
            Assert.AreEqual("B Track Id", result.Results[1].TrackingId);
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

            Assert.AreEqual(2, result.TotalCount);
            Assert.AreEqual("B Track Id", result.Results[0].TrackingId);
            Assert.AreEqual("A Track Id", result.Results[1].TrackingId);
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

            Assert.AreEqual(2, result.TotalCount);
            Assert.AreEqual(1, result.Results.Count);
            Assert.AreEqual("B Track Id", result.Results[0].TrackingId);
        }
    }
}
