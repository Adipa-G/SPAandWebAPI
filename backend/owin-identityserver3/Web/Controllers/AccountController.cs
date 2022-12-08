using System.Threading.Tasks;
using System.Web.Http;
using Domain.Interfaces.Repositories;
using Domain.Models;
using Domain.Models.Auth;

namespace Web.Controllers
{
    [RoutePrefix("api/Account")]
    public class AccountController : ApiController
    {
        private readonly IUserRepository _userRepository;

        public AccountController(IUserRepository userRepository)
        {
            _userRepository = userRepository;
        }

        // POST api/Account/Register
        [AllowAnonymous]
        [Route("Register")]
        public async Task<IHttpActionResult> RegisterAsync(UserModel userModel)
        {
             if (!ModelState.IsValid)
             {
                return BadRequest(ModelState);
             }

             var result = await _userRepository.RegisterUserAsync(userModel);
             if (result == null)
             {
                 return InternalServerError();
             }

             return Ok();
        }

        [HttpPost]
        [Route("list")]
        public async Task<IHttpActionResult> ListAsync(ListRequest request)
        {
            return Ok(await _userRepository.ListAsync(request));
        }

        [HttpDelete]
        [Route("{userName}")]
        public async Task<IHttpActionResult> DeleteAsync(string userName)
        {
            await _userRepository.DeleteAsync(userName);
            return Ok();
        }
    }
}
