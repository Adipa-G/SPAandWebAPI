﻿using System;
using System.Collections.Generic;
using System.IO;
using System.Net;
using System.Security.Claims;
using System.Text;
using Domain.Enum;
using Domain.Interfaces.Config;
using Domain.Interfaces.Repositories;
using Domain.Models.Log;
using Microsoft.ApplicationInsights.AspNetCore.Extensions;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Primitives;
using NSubstitute;
using NUnit.Framework;
using Web.Middleware;

namespace Web.Test.Middleware
{
    [TestFixture]
    public class RequestResponseLogTest
    {
        private ILogWriterRepository _logRepository;
        private IConfig _config;

        private HttpContext _context;
        private MockMiddleware _next;

        private RequestResponseLog _requestResponseLog;

        [SetUp]
        public void SetUp()
        {
            _logRepository = Substitute.For<ILogWriterRepository>();
            _config = Substitute.For<IConfig>();

            _context = new DefaultHttpContext();
            _context.Request.Scheme = "http";
            _context.Request.Host = new HostString("localhost/api/");
            _next = new MockMiddleware();

            _requestResponseLog = new RequestResponseLog(_next.Invoke, _logRepository, _config);
        }

        [Test]
        public void GivenMiddlewareAndLogNotEnabled_WhenInvoke_NoLogging()
        {
            _config.LogRequests.Returns(false);
            _context.Request.Body = new MemoryStream(Encoding.UTF8.GetBytes("test"));
            _context.Response.Body = new MemoryStream(new byte[20]);
            _context.Response.StatusCode = (int)HttpStatusCode.OK;

            var result = _requestResponseLog.Invoke(_context);
            result.Wait();

            _logRepository.Received(0).LogRequest(Arg.Any<LogLevel>(), Arg.Any<HttpLogModel>(), null);
        }

        [Test]
        public void GivenMiddlewareAndLogNotEnabled_WhenInvokeWithException_Log()
        {
            _next.ThrowException = true;

            _config.LogRequests.Returns(false);
            _context.Request.Body = new MemoryStream(Encoding.UTF8.GetBytes("test"));
            _context.Response.Body = new MemoryStream(new byte[20]);

            var result = _requestResponseLog.Invoke(_context);
            result.Wait();

            _logRepository.Received(1).LogRequest(Arg.Any<LogLevel>(), Arg.Any<HttpLogModel>(), Arg.Any<Exception>());
        }

        [Test]
        public void GivenMiddleware_WhenInvoke_LogRequest()
        {
            HttpLogModel logModel = null;
            _logRepository.LogRequest(Arg.Any<LogLevel>(), Arg.Do<HttpLogModel>(x => logModel = x), Arg.Any<Exception>());

            _config.LogRequests.Returns(true);

            _context.Request.Body = new MemoryStream(Encoding.UTF8.GetBytes("request body"));
            _context.Request.Method = "GET";
            _context.Request.ContentType = "application/json";
            var claims = new List<Claim>();
            claims.Add(new Claim(ClaimTypes.NameIdentifier, "ABC"));
            _context.User = new ClaimsPrincipal(new ClaimsIdentity(claims, "Done"));

            _context.Request.Headers.Add(new KeyValuePair<string, StringValues>("key", "value"));

            _context.Response.Body = new MemoryStream(new byte[20]);

            var result = _requestResponseLog.Invoke(_context);
            result.Wait();

            _logRepository.Received(1).LogRequest(Arg.Any<LogLevel>(), Arg.Any<HttpLogModel>(), null);
            Assert.That(logModel.RequestIdentity, Is.EqualTo("ABC"));
            Assert.That(logModel.Verb, Is.EqualTo("GET"));
            Assert.That(logModel.RequestUri, Is.EqualTo(_context.Request.GetUri()));
            Assert.That(logModel.RequestHeaders.Contains("key"));
            Assert.That(logModel.RequestHeaders.Contains("value"));
            Assert.That(logModel.Request.Contains("request body"));
        }

        [Test]
        public void GivenMiddleware_WhenInvoke_LogResponse()
        {
            HttpLogModel logModel = null;
            _logRepository.LogRequest(Arg.Any<LogLevel>(), Arg.Do<HttpLogModel>(x => logModel = x), Arg.Any<Exception>());

            _config.LogRequests.Returns(true);
            _context.Request.ContentType = "application/json";
            _context.Request.Body = new MemoryStream(Encoding.UTF8.GetBytes("request body"));

            _context.Response.Body = new MemoryStream(Encoding.UTF8.GetBytes("response body"));
            _context.Response.StatusCode = 400;

            var result = _requestResponseLog.Invoke(_context);
            result.Wait();

            _logRepository.Received(1).LogRequest(Arg.Any<LogLevel>(), Arg.Any<HttpLogModel>(), null);
            Assert.That(logModel.StatusCode, Is.EqualTo(400));
        }

        public void GivenMiddlewareAndLogNotEnabled_WhenInvokeWithErrorStatusCode_Log()
        {
            _next.ThrowException = false;

            _config.LogRequests.Returns(false);
            _context.Request.Body = new MemoryStream(Encoding.UTF8.GetBytes("test"));
            _context.Request.Body = new MemoryStream(new byte[20]);
            _context.Response.StatusCode = 400;

            var result = _requestResponseLog.Invoke(_context);
            result.Wait();

            _logRepository.Received(1).LogRequest(Arg.Any<LogLevel>(), Arg.Any<HttpLogModel>(), null);
        }
    }
}
