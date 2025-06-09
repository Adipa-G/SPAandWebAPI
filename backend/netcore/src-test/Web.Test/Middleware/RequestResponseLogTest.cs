using System;
using System.Collections.Generic;
using System.IO;
using System.Net;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using Domain.Enum;
using Domain.Interfaces.Config;
using Domain.Interfaces.Repositories;
using Domain.Models.Log;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Primitives;
using NSubstitute;
using NUnit.Framework;
using OpenIddict.Abstractions;
using Web.Middleware;

namespace Web.Test.Middleware;

[TestFixture]
public class RequestResponseLogTest
{
    private ILogWriterRepository _logRepository;
    private ILogConfig _logConfig;

    private HttpContext _context;
    private MockMiddleware _next;

    private RequestResponseLog _requestResponseLog;

    [SetUp]
    public void SetUp()
    {
        _logRepository = Substitute.For<ILogWriterRepository>();
        _logConfig = Substitute.For<ILogConfig>();

        _context = new DefaultHttpContext();
        _context.Request.Scheme = "http";
        _context.Request.Host = new HostString("localhost");
        _context.Request.Path = new PathString("/api/");
        _next = new MockMiddleware();

        _requestResponseLog = new RequestResponseLog(_next.Invoke, _logRepository, _logConfig);
    }

    [Test]
    public async Task GivenMiddlewareAndLogNotEnabled_WhenInvoke_NoLogging()
    {
        _logConfig.LogRequests.Returns(false);
        _context.Request.Body = new MemoryStream(Encoding.UTF8.GetBytes("test"));
        _context.Response.Body = new MemoryStream(new byte[20]);
        _context.Response.StatusCode = (int)HttpStatusCode.OK;

        await _requestResponseLog.Invoke(_context);

        _logRepository.Received(0).LogRequest(Arg.Any<LogLevel>(), Arg.Any<HttpLogModel>(), null);
    }

    [Test]
    public async Task GivenMiddlewareAndLogNotEnabled_WhenInvokeWithException_Log()
    {
        _next.ThrowException = true;

        _logConfig.LogRequests.Returns(false);
        _context.Request.Body = new MemoryStream(Encoding.UTF8.GetBytes("test"));
        _context.Response.Body = new MemoryStream(new byte[20]);

        await _requestResponseLog.Invoke(_context);

        _logRepository.Received(1).LogRequest(Arg.Any<LogLevel>(), Arg.Any<HttpLogModel>(), Arg.Any<Exception>());
    }

    [Test]
    public async Task GivenMiddleware_WhenInvoke_LogRequest()
    {
        HttpLogModel logModel = null;
        _logRepository.LogRequest(Arg.Any<LogLevel>(), Arg.Do<HttpLogModel>(x => logModel = x), Arg.Any<Exception>());

        _logConfig.LogRequests.Returns(true);

        _context.Request.Body = new MemoryStream(Encoding.UTF8.GetBytes("request body"));
        _context.Request.Method = "GET";
        _context.Request.ContentType = "application/json";
        var claims = new List<Claim>();
        claims.Add(new Claim(OpenIddictConstants.Claims.Name, "ABC"));
        _context.User = new ClaimsPrincipal(new ClaimsIdentity(claims, "Done"));

        _context.Request.Headers.Add(new KeyValuePair<string, StringValues>("key", "value"));

        _context.Response.Body = new MemoryStream(new byte[20]);

        await _requestResponseLog.Invoke(_context);

        _logRepository.Received(1).LogRequest(Arg.Any<LogLevel>(), Arg.Any<HttpLogModel>(), null);
        Assert.That(logModel.RequestIdentity, Is.EqualTo("ABC"));
        Assert.That(logModel.Verb, Is.EqualTo("GET"));
        Assert.That(logModel.RequestUri,
            Is.EqualTo(new Uri(
                $"{_context.Request.Scheme}://{_context.Request.Host}/{_context.Request.Path}?{_context.Request.QueryString}")));
        Assert.That(logModel.RequestHeaders.Contains("key"));
        Assert.That(logModel.RequestHeaders.Contains("value"));
        Assert.That(logModel.Request.Contains("request body"));
    }

    [Test]
    public async Task GivenMiddleware_WhenInvoke_LogResponse()
    {
        HttpLogModel logModel = null;
        _logRepository.LogRequest(Arg.Any<LogLevel>(), Arg.Do<HttpLogModel>(x => logModel = x), Arg.Any<Exception>());

        _logConfig.LogRequests.Returns(true);
        _context.Request.ContentType = "application/json";
        _context.Request.Body = new MemoryStream(Encoding.UTF8.GetBytes("request body"));

        _context.Response.Body = new MemoryStream(Encoding.UTF8.GetBytes("response body"));
        _context.Response.StatusCode = 400;

        await _requestResponseLog.Invoke(_context);

        _logRepository.Received(1).LogRequest(Arg.Any<LogLevel>(), Arg.Any<HttpLogModel>(), null);
        Assert.That(logModel.StatusCode, Is.EqualTo(400));
    }

    [Test]
    public async Task GivenMiddlewareAndLogNotEnabled_WhenInvokeWithErrorStatusCode_Log()
    {
        _next.ThrowException = false;

        _logConfig.LogRequests.Returns(false);
        _context.Request.Body = new MemoryStream(Encoding.UTF8.GetBytes("test"));
        _context.Request.Body = new MemoryStream(new byte[20]);
        _context.Response.StatusCode = 400;

        await _requestResponseLog.Invoke(_context);

        _logRepository.Received(1).LogRequest(Arg.Any<LogLevel>(), Arg.Any<HttpLogModel>(), null);
    }
}