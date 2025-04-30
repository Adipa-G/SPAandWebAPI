using Domain.Interfaces.Repositories;
using Microsoft.Owin.Security;
using Microsoft.Owin.Security.OAuth;
using NHibernate;
using NHibernate.AspNet.Identity;
using Ninject;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace Web.OAuth
{
    public class AuthorizationServerProvider : OAuthAuthorizationServerProvider, IAuthorizationServerProvider
    {
        private readonly IKernel _kernel;

        public AuthorizationServerProvider(IKernel kernel)
        {
            _kernel = kernel;
        }

        public override Task ValidateClientAuthentication(OAuthValidateClientAuthenticationContext context)
        {
            context.OwinContext.Set("as:clientAllowedOrigin", "*");

            context.Validated();
            return Task.FromResult<object>(null);
        }

        public override Task GrantResourceOwnerCredentials(OAuthGrantResourceOwnerCredentialsContext context)
        {
            GrantResourceOwnerCredentialsWrapped(context);
            return Task.FromResult<object>(null);
        }

        private void GrantResourceOwnerCredentialsWrapped(OAuthGrantResourceOwnerCredentialsContext context)
        {
            var allowedOrigin = context.OwinContext.Get<string>("as:clientAllowedOrigin");

            if (allowedOrigin == null) allowedOrigin = "*";

            context.OwinContext.Response.Headers.Add("Access-Control-Allow-Origin", new[] { allowedOrigin });

            IdentityUser user;
            var sessionFactory = _kernel.Get<ISessionFactory>();
            using (var session = sessionFactory.OpenSession())
            {
                _kernel.Rebind<ISession>().ToConstant(session).InThreadScope();
                var authRepository = _kernel.Get<IAuthRepository>();

                user = authRepository.FindUser(context.UserName, context.Password);

                if (user == null)
                {
                    context.SetError("invalid_grant", "The user name or password is incorrect.");
                    return;
                }
            }

            var identity = new ClaimsIdentity(context.Options.AuthenticationType);
            identity.AddClaim(new Claim(ClaimTypes.Name, context.UserName));
            identity.AddClaim(new Claim(ClaimTypes.Role, "user"));
            identity.AddClaim(new Claim("sub", context.UserName));

            var props = new AuthenticationProperties(new Dictionary<string, string>
                                                         {
                                                             {
                                                                 "as:client_id",
                                                                 (context.ClientId == null) ? string.Empty : context.ClientId
                                                             },
                                                             {
                                                                 "userName", context.UserName
                                                             }
                                                         });

            var ticket = new AuthenticationTicket(identity, props);
            context.Validated(ticket);
        }

        public override Task GrantRefreshToken(OAuthGrantRefreshTokenContext context)
        {
            var value = GrantRefreshTokenWrapped(context);
            return value;
        }

        private static Task GrantRefreshTokenWrapped(OAuthGrantRefreshTokenContext context)
        {
            // Change auth ticket for refresh token requests
            var newIdentity = new ClaimsIdentity(context.Ticket.Identity);

            var newClaim = newIdentity.Claims.Where(c => c.Type == "newClaim").FirstOrDefault();
            if (newClaim != null)
            {
                newIdentity.RemoveClaim(newClaim);
            }
            newIdentity.AddClaim(new Claim("newClaim", "newValue"));

            var newTicket = new AuthenticationTicket(newIdentity, context.Ticket.Properties);
            context.Validated(newTicket);

            return Task.FromResult<object>(null);
        }

        public override Task TokenEndpoint(OAuthTokenEndpointContext context)
        {
            foreach (KeyValuePair<string, string> property in context.Properties.Dictionary)
            {
                context.AdditionalResponseParameters.Add(property.Key, property.Value);
            }
            return Task.FromResult<object>(null);
        }
    }
}