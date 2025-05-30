using System.Threading.Tasks;
using Domain.Interfaces.Repositories;
using Domain.Models.Log;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using OpenIddict.Validation.AspNetCore;

namespace Web.Controllers;

[Route("~/api/log")]
public class LogController : Controller
{
    private readonly ILogViewRepository _logViewRepository;

    public LogController(ILogViewRepository logViewRepository)
    {
        _logViewRepository = logViewRepository;
    }

    [HttpGet]
    [Route("levels")]
    [Authorize(AuthenticationSchemes = OpenIddictValidationAspNetCoreDefaults.AuthenticationScheme)]
    public IActionResult Levels()
    {
        return Ok(_logViewRepository.GetAllLevels());
    }

    [HttpGet]
    [Route("loggers")]
    [Authorize(AuthenticationSchemes = OpenIddictValidationAspNetCoreDefaults.AuthenticationScheme)]
    public IActionResult Loggers()
    {
        return Ok(_logViewRepository.GetAllLoggers());
    }

    [HttpPost]
    [Route("logMessages")]
    [Authorize(AuthenticationSchemes = OpenIddictValidationAspNetCoreDefaults.AuthenticationScheme)]
    public async Task<IActionResult> LogMessagesAsync([FromBody] LogMessageListRequest request)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }
        return Ok(await _logViewRepository.GetLogMessagesAsync(request));
    }

    [HttpPost]
    [Route("logHttp")]
    [Authorize(AuthenticationSchemes = OpenIddictValidationAspNetCoreDefaults.AuthenticationScheme)]
    public async Task<IActionResult> LogHttpAsync([FromBody] LogHttpListRequest request)
    {

        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }
        return Ok(await _logViewRepository.GetLogHttpAsync(request));
    }
}