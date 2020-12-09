using System.Threading.Tasks;
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
        public async Task<ActionResult> LogMessagesAsync([FromBody]LogMessageListRequest request)
        {
            return Ok(await _logViewRepository.GetLogMessagesAsync(request));
        }

        [HttpPost]
        [Route("logHttp")]
        public async Task<ActionResult> LogHttpAsync([FromBody]LogHttpListRequest request)
        {
            return Ok(await _logViewRepository.GetLogHttpAsync(request));
        }
    }
}
