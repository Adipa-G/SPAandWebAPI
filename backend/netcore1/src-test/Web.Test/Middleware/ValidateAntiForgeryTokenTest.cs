using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
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

        private MockMiddleware _next;

        private ValidateAntiForgeryToken _validateAntiForgeryToken;

        [SetUp]
        public void SetUp()
        {
            _context = new DefaultHttpContext();
            _request = _context.Request;

            _next = new MockMiddleware();

            _validateAntiForgeryToken = new ValidateAntiForgeryToken(_next.Invoke);
        }

        [Test]
        public async Task GivenMiddleware_WhenInvokeGet_NoValidation()
        {
            _request.Method = "GET";

            await _validateAntiForgeryToken.Invoke(_context);

            Assert.That(_next.InvokeCount, Is.EqualTo(1));
        }

        [Test]
        public async Task GivenMiddleware_WhenInvokePostWithValidXSRF_Validation()
        {
            _request.Method = "POST";

            _request.Headers.Append("Cookie", new CookieHeaderValue("XSRF-TOKEN", "123").ToString());
            _request.Headers.Append("X-XSRF-TOKEN", "123");

            await _validateAntiForgeryToken.Invoke(_context);

            Assert.That(_next.InvokeCount, Is.EqualTo(1));
        }

        [Test]
        public async Task GivenMiddleware_WhenInvokePostWithInValidXSRF_Validation()
        {
            _request.Method = "POST";

            _request.Headers.Append("Cookie", new CookieHeaderValue("XSRF-TOKEN", "123").ToString());
            _request.Headers.Append("X-XSRF-TOKEN", "1234");

            await _validateAntiForgeryToken.Invoke(_context);

            Assert.That(_next.InvokeCount, Is.EqualTo(0));
        }
    }
}
