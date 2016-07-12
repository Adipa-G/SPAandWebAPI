using System.Collections.Generic;
using System.Security.Claims;
using System.Threading.Tasks;
using Domain.Interfaces.Repositories;
using IdentityModel;
using IdentityServer4.Models;
using IdentityServer4.Services;

namespace Infrastructure.Plumbing
{
    public class ProfileService : IProfileService
    {
        private IUserRepository _userRepository;

        public ProfileService(IUserRepository userRepository)
        {
            _userRepository = userRepository;
        }

        public Task IsActiveAsync(IsActiveContext context)
        {
            var user = _userRepository.FindUser(context.Subject.Identity.Name);
            context.IsActive = user != null;

            return Task.FromResult(0);
        }

        public Task GetProfileDataAsync(ProfileDataRequestContext context)
        {
            var user = _userRepository.FindUser(context.Subject.Identity.Name);

            var claims = new List<Claim>{
                new Claim(JwtClaimTypes.Subject, user.UserName),
            };

            context.IssuedClaims = claims;
            return Task.FromResult(0);
        }
    }
}
