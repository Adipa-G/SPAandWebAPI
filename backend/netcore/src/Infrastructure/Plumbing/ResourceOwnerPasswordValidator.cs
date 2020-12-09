using System.Threading.Tasks;
using Domain.Interfaces.Repositories;
using IdentityServer4.Models;
using IdentityServer4.Validation;

namespace Infrastructure.Plumbing
{
    public class ResourceOwnerPasswordValidator : IResourceOwnerPasswordValidator
    {
        private readonly IUserRepository _userRepository;

        public ResourceOwnerPasswordValidator(IUserRepository userRepository)
        {
            _userRepository = userRepository;
        }

        public async Task ValidateAsync(ResourceOwnerPasswordValidationContext context)
        {
            var user = await _userRepository.FindUserAsync(context.UserName, context.Password);

            if (user != null)
            {
                context.Result = new GrantValidationResult(user.UserName, "password");
            }
            else
            {
                context.Result = new GrantValidationResult(TokenRequestErrors.InvalidGrant)
                {
                    Error = "Invalid username or password",
                    IsError = true
                };
            }
        }
    }
}
