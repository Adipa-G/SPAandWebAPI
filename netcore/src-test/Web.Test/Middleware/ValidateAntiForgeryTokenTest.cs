using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Http.Internal;
using Microsoft.Net.Http.Headers;
using NUnit.Framework;
using Web.Middleware;

namespace Web.Test.Middleware
{
    [TestFixture]
    public class ValidateAntiForgeryTokenTest
    {
        private HttpContext _context;
        private HttpRequest _request;
        private HttpResponse _response;

        private MockMiddleware _next;

        private ValidateAntiForgeryToken _validateAntiForgeryToken;

        [SetUp]
        public void SetUp()
        {
            _context = new DefaultHttpContext();
            _request = _context.Request;
            _response = _context.Response;

            _next = new MockMiddleware();

            _validateAntiForgeryToken = new ValidateAntiForgeryToken(_next.Invoke);
        }

        [Test]
        public void GivenMiddleware_WhenInvokeGet_NoValidation()
        {
            _request.Method = "GET";

            _request.Cookies = new RequestCookieCollection();
            
            var result = _validateAntiForgeryToken.Invoke(_context);
            result.Wait();

            Assert.AreEqual(1,_next.InvokeCount);
        }

        [Test]
        public void GivenMiddleware_WhenInvokePostWithValidXSRF_Validation()
        {
            _request.Method = "POST";

            _request.Headers.Add("Cookie", new CookieHeaderValue("XSRF-TOKEN", "123").ToString());
            _request.Headers.Add("X-XSRF-TOKEN", "123");

            var result = _validateAntiForgeryToken.Invoke(_context);
            result.Wait();

            Assert.AreEqual(1, _next.InvokeCount);
        }

        [Test]
        public void GivenMiddleware_WhenInvokePostWithInValidXSRF_Validation()
        {
            _request.Method = "POST";

            _request.Headers.Add("Cookie", new CookieHeaderValue("XSRF-TOKEN", "123").ToString());
            _request.Headers.Add("X-XSRF-TOKEN", "1234");

            var result = _validateAntiForgeryToken.Invoke(_context);
            result.Wait();

            Assert.AreEqual(0, _next.InvokeCount);
        }
    }
}
