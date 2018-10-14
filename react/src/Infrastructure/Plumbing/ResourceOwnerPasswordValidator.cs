using System.Threading.Tasks;
using Domain.Interfaces.Repositories;
using IdentityServer4.Models;
using IdentityServer4.Validation;

namespace Infrastructure.Plumbing
{
    public class ResourceOwnerPasswordValidator : IResourceOwnerPasswordValidator
    {
        private IUserRepository _userRepository;

        public ResourceOwnerPasswordValidator(IUserRepository userRepository)
        {
            _userRepository = userRepository;
        }

        public Task ValidateAsync(ResourceOwnerPasswordValidationContext context)
        {
            var user = _userRepository.FindUser(context.UserName, context.Password);

            if (user != null)
            {
                context.Result = new GrantValidationResult(user.UserName, "password");
                return Task.Delay(0);
            }

            context.Result = new GrantValidationResult(TokenRequestErrors.InvalidGrant)
                             {
                                 Error = "Invalid username or password",
                                 IsError = true
                             };
            return Task.Delay(0);
        }
    }
}
