using Domain.Interfaces.Repositories;
using Domain.Models;
using Domain.Models.Log;
using NSubstitute;
using NUnit.Framework;
using System.Collections.Generic;
using System.Net;
using System.Net.Http;
using System.Threading;
using System.Web.Http;
using System.Web.Http.Controllers;
using System.Web.Http.Routing;
using Web.Controllers;

namespace Web.Test.Controllers
{
    [TestFixture]
    public class LogControllerTest
    {
        private ILogViewRepository _logViewRepository;

        private LogController _controller;

        [SetUp]
        public void SetUp()
        {
            _logViewRepository = Substitute.For<ILogViewRepository>();

            _controller = new LogController(_logViewRepository);
            _controller.ControllerContext = new HttpControllerContext(new HttpConfiguration(),
                new HttpRouteData(new HttpRoute()), new HttpRequestMessage());
        }

        [Test]
        public void GivenLevels_WhenLevels_ThenReturn()
        {
            _logViewRepository.GetAllLevels().Returns(new List<string>() { "Info", "Error" });

            var actionResult = _controller.Levels();
            var result = actionResult.ExecuteAsync(new CancellationToken()).Result;

            Assert.That(result.StatusCode, Is.EqualTo(HttpStatusCode.OK));
            _logViewRepository.Received(1).GetAllLevels();
        }

        [Test]
        public void GivenLoggers_WhenLoggers_ThenReturn()
        {
            _logViewRepository.GetAllLoggers().Returns(new List<string>() { "General", "SQL" });

            var actionResult = _controller.Loggers();
            var result = actionResult.ExecuteAsync(new CancellationToken()).Result;

            Assert.That(result.StatusCode, Is.EqualTo(HttpStatusCode.OK));
            _logViewRepository.Received(1).GetAllLoggers();
        }

        [Test]
        public void GivenLogMessages_WhenLogMessages_ThenReturn()
        {
            _logViewRepository.GetLogMessages(Arg.Any<LogMessageListRequest>()).Returns(new ListResult<LogMessageListItemModel>());

            var actionResult = _controller.LogMessages(new LogMessageListRequest());
            var result = actionResult.ExecuteAsync(new CancellationToken()).Result;

            Assert.That(result.StatusCode, Is.EqualTo(HttpStatusCode.OK));
            _logViewRepository.Received(1).GetLogMessages(Arg.Any<LogMessageListRequest>());
        }

        [Test]
        public void GivenLogHttp_WhenLogHttp_ThenReturn()
        {
            _logViewRepository.GetLogHttp(Arg.Any<LogHttpListRequest>()).Returns(new ListResult<LogHttpListItemModel>());

            var actionResult = _controller.LogHttp(new LogHttpListRequest());
            var result = actionResult.ExecuteAsync(new CancellationToken()).Result;

            Assert.That(result.StatusCode, Is.EqualTo(HttpStatusCode.OK));
            _logViewRepository.Received(1).GetLogHttp(Arg.Any<LogHttpListRequest>());
        }
    }
}