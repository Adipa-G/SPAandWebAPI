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
        public IHttpActionResult Register(UserModel userModel)
        {
             if (!ModelState.IsValid)
             {
                return BadRequest(ModelState);
             }

             var result = _userRepository.RegisterUser(userModel);
             if (result == null)
             {
                 return InternalServerError();
             }

             return Ok();
        }

        [HttpPost]
        [Route("list")]
        public IHttpActionResult List(ListRequest request)
        {
            return Ok(_userRepository.List(request));
        }

        [HttpDelete]
        [Route("{userName}")]
        public IHttpActionResult Delete(string userName)
        {
            _userRepository.Delete(userName);
            return Ok();
        }
    }
}
