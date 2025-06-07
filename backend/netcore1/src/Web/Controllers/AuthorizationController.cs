/*
 * Licensed under the Apache License, Version 2.0 (http://www.apache.org/licenses/LICENSE-2.0)
 * See https://github.com/openiddict/openiddict-core for more information concerning
 * the license and the contributors participating to this project.
 */

using System;
using System.Collections.Generic;
using System.Collections.Immutable;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using OpenIddict.Abstractions;
using OpenIddict.Server;
using OpenIddict.Server.AspNetCore;
using Web.Models;

namespace Web.Controllers;

public class AuthorizationController(
    SignInManager<ApplicationUser> signInManager,
    UserManager<ApplicationUser> userManager,
    IOptionsMonitor<OpenIddictServerOptions> oidcOptions)
    : Controller
{
    [HttpPost("~/connect/token"), IgnoreAntiforgeryToken, Produces("application/json")]
    public async Task<IActionResult> ExchangeAsync()
    {
        var request = HttpContext.GetOpenIddictServerRequest();
        if (request.IsPasswordGrantType())
        {
            var baseUrl = $"{this.Request.Scheme}://{this.Request.Host}/";
            var user = await userManager.FindByNameAsync(request.Username);
            if (user == null)
            {
                var properties = new AuthenticationProperties(new Dictionary<string, string>
                {
                    [OpenIddictServerAspNetCoreConstants.Properties.Error] = OpenIddictConstants.Errors.InvalidGrant,
                    [OpenIddictServerAspNetCoreConstants.Properties.ErrorDescription] =
                        "The username/password couple is invalid."
                });

                return Forbid(properties, OpenIddictServerAspNetCoreDefaults.AuthenticationScheme);
            }

            // Validate the username/password parameters and ensure the account is not locked out.
            var result = await signInManager.CheckPasswordSignInAsync(user, request.Password, lockoutOnFailure: true);
            if (!result.Succeeded)
            {
                var properties = new AuthenticationProperties(new Dictionary<string, string>
                {
                    [OpenIddictServerAspNetCoreConstants.Properties.Error] = OpenIddictConstants.Errors.InvalidGrant,
                    [OpenIddictServerAspNetCoreConstants.Properties.ErrorDescription] =
                        "The username/password couple is invalid."
                });

                return Forbid(properties, OpenIddictServerAspNetCoreDefaults.AuthenticationScheme);
            }

            var roles = await userManager.GetRolesAsync(user);

            var options = oidcOptions.CurrentValue;

            var claims = new Dictionary<string, object>
            {
                { OpenIddictConstants.Claims.Subject, await userManager.GetUserIdAsync(user) },
                { OpenIddictConstants.Claims.Email, await userManager.GetEmailAsync(user) },
                { OpenIddictConstants.Claims.Name, await userManager.GetUserNameAsync(user) },
                { OpenIddictConstants.Claims.PreferredUsername, await userManager.GetUserNameAsync(user) },
                { OpenIddictConstants.Claims.Role, ImmutableArray.Create<string>(roles.ToArray()) },
                { "scope", ImmutableArray.Create<string>(new[]
                {
                    OpenIddictConstants.Scopes.OpenId,
                    OpenIddictConstants.Scopes.Email,
                    OpenIddictConstants.Scopes.Profile,
                    OpenIddictConstants.Scopes.Roles
                }.Intersect(request.GetScopes()).ToArray()) },
            };
            var expiryTime = DateTime.UtcNow.AddHours(1);

            var descriptor = new SecurityTokenDescriptor
            {
                Claims = claims,
                EncryptingCredentials = options.DisableAccessTokenEncryption
                    ? null
                    : options.EncryptionCredentials.First(),
                Expires = expiryTime,
                IssuedAt = DateTime.UtcNow,
                Issuer = baseUrl,
                SigningCredentials = options.SigningCredentials.First(),
                TokenType = OpenIddictConstants.JsonWebTokenTypes.AccessToken,
            };

            var accessToken = options.JsonWebTokenHandler.CreateToken(descriptor);
            var jsonWebToken = options.JsonWebTokenHandler.ReadJsonWebToken(accessToken);

            var bearerToken = new
            {
                access_token = jsonWebToken.EncodedToken,
                expires_in = ((int)TimeSpan.FromHours(1).TotalSeconds).ToString(),
                token_type = "Bearer"
            };
            return Ok(bearerToken);
        }

        throw new NotImplementedException("The specified grant type is not implemented.");
    }
}
