using System.Collections.Generic;
using System.Net;
using System.Threading.Tasks;
using Domain.Interfaces.Repositories;
using Domain.Models;
using Domain.Models.Log;
using Microsoft.AspNetCore.Mvc;
using NSubstitute;
using NUnit.Framework;
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
        }

        [Test]
        public void GivenLevels_WhenLevels_ThenReturn()
        {
            _logViewRepository.GetAllLevels().Returns(new List<string>() { "Info", "Error" });

            var result = _controller.Levels() as OkObjectResult;

            Assert.That(result.StatusCode, Is.EqualTo((int)HttpStatusCode.OK));
            _logViewRepository.Received(1).GetAllLevels();
        }

        [Test]
        public void GivenLoggers_WhenLoggers_ThenReturn()
        {
            _logViewRepository.GetAllLoggers().Returns(new List<string>() { "General", "SQL" });

            var result = _controller.Loggers() as OkObjectResult;

            Assert.That(result.StatusCode, Is.EqualTo((int)HttpStatusCode.OK));
            _logViewRepository.Received(1).GetAllLoggers();
        }

        [Test]
        public async Task GivenLogMessages_WhenLogMessagesAsync_ThenReturn()
        {
            _logViewRepository.GetLogMessagesAsync(Arg.Any<LogMessageListRequest>()).Returns(new ListResult<LogMessageListItemModel>());

            var result = await _controller.LogMessagesAsync(new LogMessageListRequest()) as OkObjectResult;

            Assert.That(result.StatusCode, Is.EqualTo((int)HttpStatusCode.OK));
            await _logViewRepository.Received(1).GetLogMessagesAsync(Arg.Any<LogMessageListRequest>());
        }

        [Test]
        public async Task GivenLogHttp_WhenLogHttpAsync_ThenReturn()
        {
            _logViewRepository.GetLogHttpAsync(Arg.Any<LogHttpListRequest>()).Returns(new ListResult<LogHttpListItemModel>());

            var result = await _controller.LogHttpAsync(new LogHttpListRequest()) as OkObjectResult;

            Assert.That(result.StatusCode, Is.EqualTo((int)HttpStatusCode.OK));
            await _logViewRepository.Received(1).GetLogHttpAsync(Arg.Any<LogHttpListRequest>());
        }
    }
}
