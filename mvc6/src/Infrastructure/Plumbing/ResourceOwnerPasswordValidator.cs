using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain.Interfaces.Repositories;
using IdentityServer4.Core.Validation;
using Infrastructure.Repositories;

namespace Infrastructure.Plumbing
{
    public class ResourceOwnerPasswordValidator : IResourceOwnerPasswordValidator
    {
        private IUserRepository _userRepository;

        public ResourceOwnerPasswordValidator(IUserRepository userRepository)
        {
            _userRepository = userRepository;
        }

        public Task<CustomGrantValidationResult> ValidateAsync(string userName, string password, ValidatedTokenRequest request)
        {
            var user = _userRepository.FindUser(userName, password);
            if (user != null)
            {
                return Task.FromResult(new CustomGrantValidationResult(user.UserName, "password"));
            }
            return Task.FromResult(new CustomGrantValidationResult("Invalid username or password"));
        }
    }
}
