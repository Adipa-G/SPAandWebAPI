using System;
using System.Web.Http;
using Domain.Interfaces.Repositories;
using Domain.Models;
using Domain.Models.Auth;
using Microsoft.AspNet.Identity;

namespace Web.Controllers
{
    [RoutePrefix("api/Account")]
    public class AccountController : ApiController
    {
        private readonly IAuthRepository _authRepository;

        public AccountController(IAuthRepository authRepository)
        {
            _authRepository = authRepository;
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

             IdentityResult result = _authRepository.RegisterUser(userModel);
             IHttpActionResult errorResult = GetErrorResult(result);

             if (errorResult != null)
             {
                 return errorResult;
             }

             return Ok();
        }

        private IHttpActionResult GetErrorResult(IdentityResult result)
        {
            if (result == null)
            {
                return InternalServerError();
            }

            if (!result.Succeeded)
            {
                if (result.Errors != null)
                {
                    foreach (string error in result.Errors)
                    {
                        ModelState.AddModelError("", error);
                    }
                }

                if (ModelState.IsValid)
                {
                    // No ModelState errors are available to send, so just return an empty BadRequest.
                    return BadRequest();
                }

                return BadRequest(ModelState);
            }

            return null;
        }

        [HttpPost]
        [Route("list")]
        public IHttpActionResult List(ListRequest request)
        {
            return Ok(_authRepository.List(request));
        }

        [HttpDelete]
        [Route("{userName}")]
        public IHttpActionResult Delete(string userName)
        {
            _authRepository.Delete(userName);
            return Ok();
        }
    }
}
