using System.Collections.Generic;
using System.Net;
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
            _logViewRepository.GetAllLevels().Returns(new List<string>() {"Info", "Error"});

            var result = _controller.Levels() as OkObjectResult;

            Assert.AreEqual(HttpStatusCode.OK, (HttpStatusCode)result.StatusCode);
            _logViewRepository.Received(1).GetAllLevels();
        }
        
        [Test]
        public void GivenLoggers_WhenLoggers_ThenReturn()
        {
            _logViewRepository.GetAllLoggers().Returns(new List<string>() { "General", "SQL" });

            var result = _controller.Loggers() as OkObjectResult; 

            Assert.AreEqual(HttpStatusCode.OK, (HttpStatusCode)result.StatusCode);
            _logViewRepository.Received(1).GetAllLoggers();
        }

        [Test]
        public void GivenLogMessages_WhenLogMessages_ThenReturn()
        {
            _logViewRepository.GetLogMessages(Arg.Any<LogMessageListRequest>()).Returns(new ListResult<LogMessageListItemModel>());

            var result = _controller.LogMessages(new LogMessageListRequest()) as OkObjectResult; 

            Assert.AreEqual(HttpStatusCode.OK, (HttpStatusCode)result.StatusCode);
            _logViewRepository.Received(1).GetLogMessages(Arg.Any<LogMessageListRequest>());
        }

        [Test]
        public void GivenLogHttp_WhenLogHttp_ThenReturn()
        {
            _logViewRepository.GetLogHttp(Arg.Any<LogHttpListRequest>()).Returns(new ListResult<LogHttpListItemModel>());

            var result = _controller.LogHttp(new LogHttpListRequest()) as OkObjectResult; 

            Assert.AreEqual(HttpStatusCode.OK, (HttpStatusCode)result.StatusCode);
            _logViewRepository.Received(1).GetLogHttp(Arg.Any<LogHttpListRequest>());
        }
    }
}
