using System.Linq;
using System.Threading.Tasks;
using Domain.Models;
using Domain.Models.Auth;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using OpenIddict.Validation.AspNetCore;
using Web.Models;

namespace Web.Controllers;

[Route("~/api/account")]
public class AccountController(UserManager<ApplicationUser> userManager) : Controller
{
    [AllowAnonymous]
    [HttpPost]
    [Route("register")]
    public async Task<IActionResult> RegisterAsync([FromBody] UserModel model)
    {
        if (ModelState.IsValid)
        {
            var user = await userManager.FindByNameAsync(model.UserName);
            if (user != null)
            {
                return StatusCode(StatusCodes.Status409Conflict);
            }

            user = new ApplicationUser { UserName = model.UserName };
            var result = await userManager.CreateAsync(user, model.Password);
            if (result.Succeeded)
            {
                return Ok();
            }
            AddErrors(result);
        }

        // If we got this far, something failed.
        return BadRequest(ModelState);
    }

    [HttpPost]
    [Route("list")]
    [Authorize(AuthenticationSchemes = OpenIddictValidationAspNetCoreDefaults.AuthenticationScheme)]
    public async Task<IActionResult> ListAsync([FromBody] ListRequest request)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }

        var query = userManager.Users;
        
        if (request.OrderDirection == SortDirection.Asc)
        {
            query = query.OrderBy(au => EF.Property<ApplicationUser>(au, request.OrderField));
        }
        else if (request.OrderDirection == SortDirection.Desc)
        {
            query = query.OrderByDescending(au => EF.Property<ApplicationUser>(au, request.OrderField));
        }

        var totalCount = await query.CountAsync();

        var queryResults = await query.Skip((request.PageNumber - 1) * request.PageSize)
            .Take(request.PageSize)
            .ToListAsync();

        var results = queryResults
            .Select(r => new UserListItemModel() { UserName = r.UserName })
            .ToList();

        var result = new ListResult<UserListItemModel>()
        {
            PageNumber = request.PageNumber,
            PageSize = request.PageSize,
            Results = results,
            TotalCount = totalCount
        };
        return Ok(result);
    }

    [HttpDelete]
    [Route("{userName}")]
    [Authorize(AuthenticationSchemes = OpenIddictValidationAspNetCoreDefaults.AuthenticationScheme)]
    public async Task<ActionResult> DeleteAsync(string userName)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }

        var user = await userManager.FindByNameAsync(userName);

        if (user != null)
        {
            await userManager.DeleteAsync(user);
            return Ok();
        }
        return NotFound();
    }

    private void AddErrors(IdentityResult result)
    {
        foreach (var error in result.Errors)
        {
            ModelState.AddModelError(string.Empty, error.Description);
        }
    }
}
