using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Web.Controllers;

public class AliveController : Controller
{
    [AllowAnonymous]
    [HttpGet]
    [Route("alive")]
    public IActionResult Ping()
    {
        return new OkObjectResult("yes");
    }
}
