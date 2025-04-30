using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.IO;
using System.Linq;
using System.Net;
using System.Security.Cryptography.X509Certificates;
using System.Threading.Tasks;
using Infrastructure.Plumbing;
using Microsoft.AspNetCore.Http;
using Microsoft.IdentityModel.Tokens;

namespace Web.Middleware
{
    public class TokenDecoder
    {
        private string _issuer;
        private readonly IPathProvider _pathProvider;
        private readonly RequestDelegate _next;

        public TokenDecoder(RequestDelegate next,IPathProvider pathProvider,string issuer)
        {
            _issuer = issuer;
            _next = next;
            _pathProvider = pathProvider;
        }

        public async Task Invoke(HttpContext context)
        {
            if (context.Request.Headers.ContainsKey("Authorization"))
            {
                var token = context.Request.Headers["Authorization"][0];
                token = token.Replace("Bearer ", "");

                var cert = X509CertificateLoader.LoadPkcs12FromFile(Path.Combine("Configuration", "idsrv4test.pfx"),
                    "idsrv3test",
                    X509KeyStorageFlags.DefaultKeySet,
                    new Pkcs12LoaderLimits()
                    {
                        PreserveStorageProvider = true
                    });

                var handler = new JwtSecurityTokenHandler();
                var validationParameters = new TokenValidationParameters()
                {
                    ValidateAudience = false,
                    ValidIssuer = _issuer,
                    IssuerSigningKeys = new List<SecurityKey>() { new X509SecurityKey(cert)}
                };

                try
                {
                    SecurityToken validatedToken;
                    var principal = handler.ValidateToken(token, validationParameters, out validatedToken);
                    context.User = principal;
                }
                catch (Exception)
                {
                    context.Response.StatusCode = (int)HttpStatusCode.Unauthorized;
                    throw;
                }
            }

            await _next.Invoke(context);
        }
    }
}