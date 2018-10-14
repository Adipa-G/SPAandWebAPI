using Domain.Interfaces.Repositories;
using Domain.Models.Log;
using Microsoft.AspNetCore.Mvc;

namespace Web.Controllers
{
    [Route("api/Log")]
    public class LogController : Controller
    {
        private readonly ILogViewRepository _logViewRepository;

        public LogController(ILogViewRepository logViewRepository)
        {
            _logViewRepository = logViewRepository;
        }

        [HttpGet]
        [Route("levels")]
        public ActionResult Levels()
        {
            return Ok(_logViewRepository.GetAllLevels());
        }

        [HttpGet]
        [Route("loggers")]
        public ActionResult Loggers()
        {
            return Ok(_logViewRepository.GetAllLoggers());
        }

        [HttpPost]
        [Route("logMessages")]
        public ActionResult LogMessages([FromBody]LogMessageListRequest request)
        {
            //throw new Exception("sfuffed");
            return Ok(_logViewRepository.GetLogMessages(request));
        }

        [HttpPost]
        [Route("logHttp")]
        public ActionResult LogHttp([FromBody]LogHttpListRequest request)
        {
            return Ok(_logViewRepository.GetLogHttp(request));
        }
    }
}
