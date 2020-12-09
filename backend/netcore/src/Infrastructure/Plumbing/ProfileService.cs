using System.Collections.Generic;
using System.Security.Claims;
using System.Threading.Tasks;
using Domain.Interfaces.Repositories;
using Domain.Models.Auth;
using IdentityModel;
using IdentityServer4.Models;
using IdentityServer4.Services;

namespace Infrastructure.Plumbing
{
    public class ProfileService : IProfileService
    {
        private readonly IUserRepository _userRepository;

        public ProfileService(IUserRepository userRepository)
        {
            _userRepository = userRepository;
        }

        public async Task IsActiveAsync(IsActiveContext context)
        {
            var user = await FindByClaims(context.Subject);
            context.IsActive = user != null;
        }

        public async Task GetProfileDataAsync(ProfileDataRequestContext context)
        {
            var user = await FindByClaims(context.Subject);

            var claims = new List<Claim>{
                new Claim(JwtClaimTypes.Subject, user.UserName),
            };

            context.IssuedClaims = claims;
        }

        private async Task<UserModel> FindByClaims(ClaimsPrincipal principal)
        {
            var claim = principal.FindFirst(JwtClaimTypes.Subject);
            if (claim != null)
            {
                var user = await _userRepository.FindUserAsync(claim.Value);
                return user;
            }
            return null;
        }
    }
}
