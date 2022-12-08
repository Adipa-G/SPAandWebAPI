using System.Collections.Generic;
using System.Security.Claims;
using System.Threading.Tasks;
using Domain.Interfaces.Repositories;
using IdentityServer3.Core;
using IdentityServer3.Core.Extensions;
using IdentityServer3.Core.Models;
using IdentityServer3.Core.Services.Default;
using NHibernate;
using Ninject;

namespace Infrastructure.Plumbing
{
    public class UserService : UserServiceBase
    {
        private readonly IKernel _kernel;

        public UserService(IKernel kernel)
        {
            _kernel = kernel;
        }

        public override async Task AuthenticateLocalAsync(LocalAuthenticationContext context)
        {
            var sessionFactory = _kernel.Get<ISessionFactory>();
            using (var session = sessionFactory.OpenSession())
            {
                _kernel.Rebind<ISession>().ToConstant(session).InThreadScope();
                var userRepository = _kernel.Get<IUserRepository>();
                var user = await userRepository.FindUserAsync(context.UserName, context.Password);
                if (user != null)
                {
                    context.AuthenticateResult = new AuthenticateResult(user.UserName, user.UserName);
                }
            }
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
