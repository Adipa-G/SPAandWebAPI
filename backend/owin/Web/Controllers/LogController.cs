using Domain.Interfaces.Repositories;
using Domain.Models.Log;
using System;
using System.Web.Http;

namespace Web.Controllers
{
    [RoutePrefix("api/Log")]
    public class LogController : ApiController
    {
        private readonly ILogViewRepository _logViewRepository;

        public LogController(ILogViewRepository logViewRepository)
        {
            _logViewRepository = logViewRepository;
        }

        [HttpGet]
        [Route("levels")]
        public IHttpActionResult Levels()
        {
            return Ok(_logViewRepository.GetAllLevels());
        }

        [HttpGet]
        [Route("loggers")]
        public IHttpActionResult Loggers()
        {
            return Ok(_logViewRepository.GetAllLoggers());
        }

        [HttpPost]
        [Route("logMessages")]
        public IHttpActionResult LogMessages(LogMessageListRequest request)
        {
            //throw new Exception("sfuffed");
            return Ok(_logViewRepository.GetLogMessages(request));
        }

        [HttpPost]
        [Route("logHttp")]
        public IHttpActionResult LogHttp(LogHttpListRequest request)
        {
            return Ok(_logViewRepository.GetLogHttp(request));
        }
    }
}