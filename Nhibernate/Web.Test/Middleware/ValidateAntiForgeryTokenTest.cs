using System;
using System.Collections.Concurrent;
using System.Collections.Generic;
using System.IO;
using System.Net.Http.Headers;
using System.Security.Principal;
using System.Text;
using Domain.Enum;
using Domain.Interfaces.Config;
using Domain.Interfaces.Repositories;
using Domain.Models.Log;
using Microsoft.Owin;
using NHibernate;
using Ninject;
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
        public void GivenMiddleware_WhenInvokeGet_NoValidation()
        {
            _request.Method.Returns("GET");

            var requestCookies = new RequestCookieCollection(new Dictionary<string, string>());
            _request.Cookies.Returns(requestCookies);

            var responseCookies = new ResponseCookieCollection(new HeaderDictionary(new Dictionary<string, string[]>()));
            _response.Cookies.Returns(responseCookies);
            
            var result = _validateAntiForgeryToken.Invoke(_context);
            result.Wait();

            Assert.AreEqual(1,_next.InvokeCount);
        }

        [Test]
        public void GivenMiddleware_WhenInvokePostWithValidXSRF_Validation()
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

            var result = _validateAntiForgeryToken.Invoke(_context);
            result.Wait();

            Assert.AreEqual(1, _next.InvokeCount);
        }

        [Test]
        public void GivenMiddleware_WhenInvokePostWithInValidXSRF_Validation()
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

            var result = _validateAntiForgeryToken.Invoke(_context);
            result.Wait();

            Assert.AreEqual(0, _next.InvokeCount);
        }
    }
}
