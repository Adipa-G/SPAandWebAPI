using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.Owin;
using NSubstitute;
using NUnit.Framework;
using Web.Middleware;

namespace Web.Test.Middleware
{
    [TestFixture]
    public class ValidateAntiForgeryTokenTest
    {
        private IOwinContext _context;
        private IOwinRequest _request;
        private IOwinResponse _response;

        private MockMiddleware _next;

        private ValidateAntiForgeryToken _validateAntiForgeryToken;

        [SetUp]
        public void SetUp()
        {
            _context = Substitute.For<IOwinContext>();
            _request = Substitute.For<IOwinRequest>();
            _response = Substitute.For<IOwinResponse>();
            _context.Request.Returns(_request);
            _context.Response.Returns(_response);

            _next = new MockMiddleware();

            _validateAntiForgeryToken = new ValidateAntiForgeryToken(_next);
        }

        [Test]
        public async Task GivenMiddleware_WhenInvokeGet_NoValidation()
        {
            _request.Method.Returns("GET");

            var requestCookies = new RequestCookieCollection(new Dictionary<string, string>());
            _request.Cookies.Returns(requestCookies);

            var responseCookies = new ResponseCookieCollection(new HeaderDictionary(new Dictionary<string, string[]>()));
            _response.Cookies.Returns(responseCookies);
            
            await _validateAntiForgeryToken.Invoke(_context);

            Assert.That(_next.InvokeCount, Is.EqualTo(1));
        }

        [Test]
        public async Task GivenMiddleware_WhenInvokePostWithValidXSRF_Validation()
        {
            _request.Method.Returns("POST");

            var requestCookieDictionary = new Dictionary<string, string>();
            requestCookieDictionary.Add("XSRF-TOKEN","123");
            var requestCookies = new RequestCookieCollection(requestCookieDictionary);
            _request.Cookies.Returns(requestCookies);

            var requestHeaderDictionary = new Dictionary<string, string[]>();
            requestHeaderDictionary.Add("X-XSRF-TOKEN", new []{"123"});
            var requestHeaders = new HeaderDictionary(requestHeaderDictionary);
            _request.Headers.Returns(requestHeaders);

            var responseCookies = new ResponseCookieCollection(new HeaderDictionary(new Dictionary<string, string[]>()));
            _response.Cookies.Returns(responseCookies);

            await _validateAntiForgeryToken.Invoke(_context);

            Assert.That(_next.InvokeCount, Is.EqualTo(1));
        }

        [Test]
        public async Task GivenMiddleware_WhenInvokePostWithInValidXSRF_Validation()
        {
            _request.Method.Returns("POST");

            var requestCookieDictionary = new Dictionary<string, string>();
            requestCookieDictionary.Add("XSRF-TOKEN", "123");
            var requestCookies = new RequestCookieCollection(requestCookieDictionary);
            _request.Cookies.Returns(requestCookies);

            var requestHeaderDictionary = new Dictionary<string, string[]>();
            requestHeaderDictionary.Add("X-XSRF-TOKEN", new[] { "1234" });
            var requestHeaders = new HeaderDictionary(requestHeaderDictionary);
            _request.Headers.Returns(requestHeaders);

            var responseCookies = new ResponseCookieCollection(new HeaderDictionary(new Dictionary<string, string[]>()));
            _response.Cookies.Returns(responseCookies);

            await _validateAntiForgeryToken.Invoke(_context);

            Assert.That(_next.InvokeCount, Is.EqualTo(0));
        }
    }
}
