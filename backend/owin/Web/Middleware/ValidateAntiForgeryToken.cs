using System;
using System.Linq;
using System.Net;
using System.Threading.Tasks;
using System.Web;
using Microsoft.Owin;

namespace Web.Middleware
{
    public class ValidateAntiForgeryToken : OwinMiddleware
    {
        private const string XsrfTokenCookie = "XSRF-TOKEN";
        private const string XsrfTokenHeader = "X-" + XsrfTokenCookie;

        public ValidateAntiForgeryToken(OwinMiddleware next) : base(next)
        {
        }

        public override async Task Invoke(IOwinContext context)
        {
            var needValidation = new[] { "POST", "PUT", "DELETE" }.Contains(context.Request.Method);

            bool valid = true;
            if (needValidation && context.Request.Cookies[XsrfTokenCookie] != null)
            {
                var cookieValue = context.Request.Cookies[XsrfTokenCookie];
                var header = context.Request.Headers[XsrfTokenHeader];

                if (cookieValue != HttpUtility.UrlDecode(header))
                {
                    valid = false;
                }
            }

            if (valid)
            {
                await Next.Invoke(context);
                if (context.Request.Cookies[XsrfTokenCookie] == null)
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