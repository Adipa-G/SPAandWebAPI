using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Primitives;
using System.Net;
using System.Threading.Tasks;
using System.Web;
using System;
using System.Linq;

namespace Web.Middleware;

public class ValidateAntiForgeryToken(RequestDelegate next)
{
    private const string XsrfTokenCookie = "XSRF-TOKEN";
    private const string XsrfTokenHeader = "X-" + XsrfTokenCookie;

    public async Task Invoke(HttpContext context)
    {
        var needValidation = new[] { "POST", "PUT", "DELETE" }.Contains(context.Request.Method);

        bool valid = true;
        if (needValidation && context.Request.Cookies[XsrfTokenCookie] != StringValues.Empty)
        {
            var cookieValue = context.Request.Cookies[XsrfTokenCookie];
            var header = context.Request.Headers[XsrfTokenHeader];

            if (cookieValue != header
                && HttpUtility.UrlDecode(cookieValue) != header
                && cookieValue != HttpUtility.UrlDecode(header))
            {
                valid = false;
            }
        }

        if (valid)
        {
            if (context.Request.Cookies[XsrfTokenCookie] == StringValues.Empty)
            {
                var token = Convert.ToBase64String(Guid.NewGuid().ToByteArray());
                context.Response.Cookies.Append(XsrfTokenCookie, token);
            }
            await next.Invoke(context);
        }
        else
        {
            context.Response.StatusCode = (int)HttpStatusCode.BadRequest;
            await context.Response.WriteAsync("The CSRF token in the cookie doesn't match the one received in a form/header.");
        }
    }
}