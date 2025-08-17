using Domain.Models.Auth;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
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
