using System;
using System.Threading.Tasks;
using System.Web.Http;
using Domain.Interfaces.Repositories;
using Domain.Models.Log;

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
        public async Task<IHttpActionResult> GetLogMessagesAsync(LogMessageListRequest request)
        {
            return Ok(await _logViewRepository.GetLogMessagesAsync(request));
        }

        [HttpPost]
        [Route("logHttp")]
        public async Task<IHttpActionResult> GetLogHttpAsync(LogHttpListRequest request)
        {
            return Ok(await _logViewRepository.GetLogHttpAsync(request));
        }
    }
}
