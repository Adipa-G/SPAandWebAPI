using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens;
using System.IO;
using System.Net;
using System.Security.Cryptography;
using System.Security.Cryptography.X509Certificates;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNet.Builder;
using Microsoft.AspNet.Http;
using Microsoft.Extensions.PlatformAbstractions;
using Newtonsoft.Json.Linq;

namespace Web.Middleware
{
    public class TokenDecoder
    {
        private string _authority;
        private readonly RequestDelegate _next;
        private readonly IApplicationEnvironment _environment;

        public TokenDecoder(RequestDelegate next, IApplicationEnvironment environment,string authority)
        {
            _authority = authority;
            _next = next;
            _environment = environment;
        }

        public async Task Invoke(HttpContext context)
        {
            if (context.Request.Headers.ContainsKey("Authorization"))
            {
                try
                {
                    var token = context.Request.Headers["Authorization"][0];
                    token = token.Replace("Bearer ", "");

                    var cert =
                        new X509Certificate2(
                            Path.Combine(_environment.ApplicationBasePath, "Configuration", "idsrv4test.pfx"),
                            "idsrv3test");

                    var handler = new JwtSecurityTokenHandler();
                    var validationParameters = new TokenValidationParameters()
                    {
                        ValidAudience = $"{_authority}/resources",
                        ValidIssuer = _authority,
                        IssuerSigningTokens = new List<X509SecurityToken>() { new X509SecurityToken(cert) }
                    };

                    SecurityToken validatedToken;
                    var principal = handler.ValidateToken(token, validationParameters, out validatedToken);
                    context.User = principal;
                }
                catch (Exception ex)
                {
                    context.Response.StatusCode = (int)HttpStatusCode.Unauthorized;
                    await context.Response.WriteAsync($"Authentication error {ex.Message} {ex.StackTrace}");
                }
            }

            await _next.Invoke(context);
        }
    }
}