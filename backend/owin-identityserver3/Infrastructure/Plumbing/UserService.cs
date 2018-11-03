using System.Collections.Generic;
using System.Security.Claims;
using System.Threading.Tasks;
using Domain.Interfaces.Repositories;
using IdentityServer3.Core;
using IdentityServer3.Core.Extensions;
using IdentityServer3.Core.Models;
using IdentityServer3.Core.Services.Default;

namespace Infrastructure.Plumbing
{
    public class UserService : UserServiceBase
    {
        private IUserRepository _userRepository;

        public UserService(IUserRepository userRepository)
        {
            _userRepository = userRepository;
        }

        public override Task AuthenticateLocalAsync(LocalAuthenticationContext context)
        {
            var user = _userRepository.FindUser(context.UserName,context.Password);
            if (user != null)
            {
                context.AuthenticateResult = new AuthenticateResult(user.UserName, user.UserName);
            }
            return Task.FromResult(0);
        }

        public override Task GetProfileDataAsync(ProfileDataRequestContext context)
        {
            context.IssuedClaims = new List<Claim>
                                   {
                                       new Claim(Constants.ClaimTypes.Name, context.Subject.GetSubjectId())
                                   };
            return Task.FromResult(0);
        }
    }
}
