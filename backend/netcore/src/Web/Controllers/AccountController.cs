
using System.Threading.Tasks;
using Domain.Interfaces.Repositories;
using Domain.Models;
using Domain.Models.Auth;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Web.Controllers
{
    [Route("api/Account")]
    public class AccountController : Controller
    {
        private readonly IUserRepository _userRepository;

        public AccountController(IUserRepository userRepository)
        {
            _userRepository = userRepository;
        }

        // POST api/Account/Register
        [AllowAnonymous]
        [HttpPost]
        [Route("Register")]
        public async Task<ActionResult> RegisterAsync([FromBody]UserModel userModel)
        {
             if (!ModelState.IsValid)
             {
                return BadRequest(ModelState);
             }

             var result = await _userRepository.RegisterUserAsync(userModel);
             if (result == null)
             {
                 return BadRequest();
             }

             return Ok();
        }

        [HttpPost]
        [Route("list")]
        public async Task<ActionResult> ListAsync([FromBody]ListRequest request)
        {
            return Ok(await _userRepository.ListAsync(request));
        }

        [HttpDelete]
        [Route("{userName}")]
        public async Task<ActionResult> DeleteAsync(string userName)
        {
            await _userRepository.DeleteAsync(userName);
            return Ok();
        }
    }
}
