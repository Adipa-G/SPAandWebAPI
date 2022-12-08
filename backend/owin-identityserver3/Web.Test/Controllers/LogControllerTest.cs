using System.Collections.Generic;
using System.Web.Http.Controllers;
using System.Net;
using System.Net.Http;
using System.Threading;
using System.Web.Http;
using System.Web.Http.Routing;
using Domain.Interfaces.Repositories;
using Domain.Models;
using Domain.Models.Log;
using NSubstitute;
using NUnit.Framework;
using Web.Controllers;
using System.Threading.Tasks;

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
            _logViewRepository.GetAllLevels().Returns(new List<string>() {"Info", "Error"});

            var actionResult = _controller.Levels();
            var result = actionResult.ExecuteAsync(new CancellationToken()).Result;

            Assert.AreEqual(HttpStatusCode.OK, result.StatusCode);
            _logViewRepository.Received(1).GetAllLevels();
        }

        [Test]
        public void GivenLoggers_WhenLoggers_ThenReturn()
        {
            _logViewRepository.GetAllLoggers().Returns(new List<string>() { "General", "SQL" });

            var actionResult = _controller.Loggers();
            var result = actionResult.ExecuteAsync(new CancellationToken()).Result;

            Assert.AreEqual(HttpStatusCode.OK, result.StatusCode);
            _logViewRepository.Received(1).GetAllLoggers();
        }

        [Test]
        public async Task GivenLogMessages_WhenLogMessages_ThenReturn()
        {
            _logViewRepository.GetLogMessagesAsync(Arg.Any<LogMessageListRequest>()).Returns(new ListResult<LogMessageListItemModel>());

            var actionResult = await _controller.GetLogMessagesAsync(new LogMessageListRequest());
            var result = actionResult.ExecuteAsync(new CancellationToken()).Result;

            Assert.AreEqual(HttpStatusCode.OK, result.StatusCode);
            await _logViewRepository.Received(1).GetLogMessagesAsync(Arg.Any<LogMessageListRequest>());
        }

        [Test]
        public async Task GivenLogHttp_WhenLogHttp_ThenReturn()
        {
            _logViewRepository.GetLogHttpAsync(Arg.Any<LogHttpListRequest>()).Returns(new ListResult<LogHttpListItemModel>());

            var actionResult = await _controller.GetLogHttpAsync(new LogHttpListRequest());
            var result = actionResult.ExecuteAsync(new CancellationToken()).Result;

            Assert.AreEqual(HttpStatusCode.OK, result.StatusCode);
            await _logViewRepository.Received(1).GetLogHttpAsync(Arg.Any<LogHttpListRequest>());
        }
    }
}
