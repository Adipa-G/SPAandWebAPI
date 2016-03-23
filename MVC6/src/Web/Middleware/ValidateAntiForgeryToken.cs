using System;
using System.Linq;
using System.Net;
using System.Threading.Tasks;
using Microsoft.AspNet.Builder;
using Microsoft.AspNet.Http;
using Microsoft.Extensions.Primitives;

namespace Web.Middleware
{
    public class ValidateAntiForgeryToken
    {
        private const string XsrfTokenCookie = "XSRF-TOKEN";
        private const string XsrfTokenHeader = "X-" + XsrfTokenCookie;

        private readonly RequestDelegate _next;

        public ValidateAntiForgeryToken(RequestDelegate next)
        {
            _next = next;
        }

        public async Task Invoke(HttpContext context)
        {
            var needValidation = new[] { "POST", "PUT", "DELETE" }.Contains(context.Request.Method);

            bool valid = true;
            if (needValidation && context.Request.Cookies[XsrfTokenCookie] != StringValues.Empty)
            {
                var cookieValue = context.Request.Cookies[XsrfTokenCookie];
                var header = context.Request.Headers[XsrfTokenHeader];

                if (cookieValue != header)
                {
                    valid = false;
                }
            }

            if (valid)
            {
                await _next.Invoke(context);
                if (context.Request.Cookies[XsrfTokenCookie] == StringValues.Empty)
                {
                    var token = Convert.ToBase64String(Guid.NewGuid().ToByteArray());
                    context.Response.Cookies.Append(XsrfTokenCookie, token);
                }
            }
            else
            {
                context.Response.StatusCode = (int)HttpStatusCode.BadRequest;
                await context.Response.WriteAsync("The CSRF token in the cookie doesn't match the one received in a form/header.");
            }
        }
    }
}