using Domain.Enum;
using Domain.Interfaces.Config;
using Domain.Interfaces.Repositories;
using Domain.Models.Log;
using Microsoft.Owin;
using Ninject;
using NSubstitute;
using NUnit.Framework;
using System;
using System.Collections.Generic;
using System.IO;
using System.Net;
using System.Security.Principal;
using System.Text;
using System.Threading.Tasks;
using Web.Middleware;

namespace Web.Test.Middleware
{
    [TestFixture]
    public class RequestResponseLogTest
    {
        private ILogWriterRepository _logRepository;
        private IConfig _config;
        private IKernel _kernel;
        private IOwinContext _context;
        private IOwinRequest _request;
        private IOwinResponse _response;

        private MockMiddleware _next;

        private RequestResponseLog _requestResponseLog;

        [SetUp]
        public void SetUp()
        {
            _logRepository = Substitute.For<ILogWriterRepository>();
            _config = Substitute.For<IConfig>();
            _context = Substitute.For<IOwinContext>();
            _request = Substitute.For<IOwinRequest>();
            _response = Substitute.For<IOwinResponse>();
            _context.Request.Returns(_request);
            _context.Response.Returns(_response);

            _kernel = Substitute.For<IKernel>();
            _next = new MockMiddleware();

            _kernel.Inject(Arg.Do<RequestResponseLog>(Inject));
            _requestResponseLog = new RequestResponseLog(_next, _kernel);
        }

        private void Inject(RequestResponseLog x)
        {
            x.Config = _config;
            x.LogRepository = _logRepository;
        }

        [Test]
        public async Task GivenMiddlewareAndLogNotEnabled_WhenInvoke_NoLogging()
        {
            _config.LogRequests.Returns(false);
            _request.Body.Returns(new MemoryStream(Encoding.UTF8.GetBytes("test")));
            _response.Body.Returns(new MemoryStream(new byte[20]));
            _response.StatusCode.Returns((int)HttpStatusCode.OK);

            await _requestResponseLog.Invoke(_context);

            _logRepository.Received(0).LogRequest(Arg.Any<LogLevel>(), Arg.Any<HttpLogModel>(), null);
        }

        [Test]
        public async Task GivenMiddlewareAndLogNotEnabled_WhenInvokeWithException_Log()
        {
            _next.ThrowException = true;

            _config.LogRequests.Returns(false);
            _request.Body.Returns(new MemoryStream(Encoding.UTF8.GetBytes("test")));
            _response.Body.Returns(new MemoryStream(new byte[20]));

            await _requestResponseLog.Invoke(_context);

            _logRepository.Received(1).LogRequest(Arg.Any<LogLevel>(), Arg.Any<HttpLogModel>(), Arg.Any<Exception>());
        }

        [Test]
        public async Task GivenMiddleware_WhenInvoke_LogRequest()
        {
            HttpLogModel logModel = null;
            _logRepository.LogRequest(Arg.Any<LogLevel>(), Arg.Do<HttpLogModel>(x => logModel = x), Arg.Any<Exception>());

            _config.LogRequests.Returns(true);

            _request.User.Returns(new GenericPrincipal(new GenericIdentity("ABC"), new[] { "a", "b" }));
            _request.Body.Returns(new MemoryStream(Encoding.UTF8.GetBytes("request body")));
            _request.Method.Returns("GET");
            _request.RemoteIpAddress.Returns("127.0.0.1");
            _request.Uri.Returns(new Uri("http://www.google.com"));
            _request.ContentType.Returns("application/json");

            var headers = new Dictionary<string, string[]>();
            headers["key"] = new[] { "value" };
            _request.Headers.Returns(new HeaderDictionary(headers));

            _response.Body.Returns(new MemoryStream(new byte[20]));

            await _requestResponseLog.Invoke(_context);

            _logRepository.Received(1).LogRequest(Arg.Any<LogLevel>(), Arg.Any<HttpLogModel>(), null);
            Assert.That(logModel.RequestIdentity, Is.EqualTo("ABC"));
            Assert.That(logModel.CallerAddress, Is.EqualTo("127.0.0.1"));
            Assert.That(logModel.Verb, Is.EqualTo("GET"));
            Assert.That(logModel.RequestUri, Is.EqualTo(_request.Uri));
            Assert.That(logModel.RequestHeaders.Contains("key"), Is.True);
            Assert.That(logModel.RequestHeaders.Contains("value"), Is.True);
            Assert.That(logModel.Request.Contains("request body"), Is.True);
        }

        [Test]
        public async Task GivenMiddleware_WhenInvoke_LogResponse()
        {
            HttpLogModel logModel = null;
            _logRepository.LogRequest(Arg.Any<LogLevel>(), Arg.Do<HttpLogModel>(x => logModel = x), Arg.Any<Exception>());

            _config.LogRequests.Returns(true);
            _request.ContentType.Returns("application/json");
            _request.Body.Returns(new MemoryStream(Encoding.UTF8.GetBytes("request body")));

            _response.Body.Returns(new MemoryStream(Encoding.UTF8.GetBytes("response body")));
            _response.StatusCode.Returns(400);

            await _requestResponseLog.Invoke(_context);

            _logRepository.Received(1).LogRequest(Arg.Any<LogLevel>(), Arg.Any<HttpLogModel>(), null);
            Assert.That(logModel.StatusCode, Is.EqualTo(400));
        }

        [Test]
        public async Task GivenMiddlewareAndLogNotEnabled_WhenInvokeWithErrorStatusCode_Log()
        {
            _next.ThrowException = false;

            _config.LogRequests.Returns(false);
            _request.Body.Returns(new MemoryStream(Encoding.UTF8.GetBytes("test")));
            _response.Body.Returns(new MemoryStream(new byte[20]));
            _response.StatusCode.Returns(400);

            await _requestResponseLog.Invoke(_context);

            _logRepository.Received(1).LogRequest(Arg.Any<LogLevel>(), Arg.Any<HttpLogModel>(), null);
        }
    }
}