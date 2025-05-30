using System;
using System.IO;
using System.Linq;
using System.Net;
using System.Security.Claims;
using System.Text;
using System.Text.RegularExpressions;
using System.Threading.Tasks;
using Domain.Enum;
using Domain.Interfaces.Config;
using Domain.Interfaces.Repositories;
using Domain.Models.Log;
using Microsoft.AspNetCore.Http;
using OpenIddict.Abstractions;

namespace Web.Middleware;

public class RequestResponseLog
{
    private readonly RequestDelegate _next;
    private readonly ILogWriterRepository _logRepository;
    private readonly ILogConfig _logConfig;


    public RequestResponseLog(RequestDelegate next, ILogWriterRepository logRepository, ILogConfig logConfig)
    {
        _next = next;
        _logRepository = logRepository;
        _logConfig = logConfig;
    }

    public async Task Invoke(HttpContext context)
    {
        if (!context.Request.Path.ToString().Contains("api/"))
        {
            await _next.Invoke(context);
        }
        else
        {
            using (var requestStream = new MemoryStream())
            using (var responseStream = new MemoryStream())
            {
                var originalRequestStream = context.Request.Body;
                var orginalResponseStream = context.Response.Body;

                try
                {
                    if (IsTextContentType(context.Request.ContentType))
                    {
                        await context.Request.Body.CopyToAsync(requestStream);
                        context.Request.Body = requestStream;
                        requestStream.Seek(0, SeekOrigin.Begin);
                    }
                    context.Response.Body = responseStream;

                    await _next.Invoke(context);

                    var error = context.Response != null && context.Response.StatusCode != (int)HttpStatusCode.OK;
                    if (_logConfig.LogRequests
                        || error)
                    {
                        var httpLogModel = UpdateForRequest(context.Request, requestStream);
                        UpdateForResponse(httpLogModel, context.Response, responseStream);
                        _logRepository.LogRequest(error ? LogLevel.Error : LogLevel.Info, httpLogModel, null);
                    }
                }
                catch (Exception ex)
                {
                    var httpLogModel = UpdateForRequest(context.Request, requestStream);
                    UpdateForResponse(httpLogModel, context.Response, responseStream);
                    _logRepository.LogRequest(LogLevel.Error, httpLogModel, ex);
                }
                finally
                {
                    if (IsTextContentType(context.Request.ContentType))
                    {
                        context.Request.Body = originalRequestStream;
                    }

                    responseStream.Seek(0, SeekOrigin.Begin);
                    await responseStream.CopyToAsync(orginalResponseStream);
                    context.Response.Body = orginalResponseStream;
                }
            }
        }
    }

    private HttpLogModel UpdateForRequest(HttpRequest request, MemoryStream requestStream)
    {
        var model = new HttpLogModel();
        model.TrackingId = Guid.NewGuid().ToString("d");
        request.HttpContext.TraceIdentifier = model.TrackingId;
        request.HttpContext.Response.Headers.Append("Http-Tracking-Id", new[] { model.TrackingId });

        model.RequestIdentity = request.HttpContext.User != null && request.HttpContext.User.Identity.IsAuthenticated
            ? ((ClaimsIdentity)request.HttpContext.User.Identity).Claims.Single(c => c.Type == OpenIddictConstants.Claims.Name).Value
            : "(anonymous)";
        model.CallerAddress = request.HttpContext.Connection.RemoteIpAddress?.ToString() ?? string.Empty;
        model.Verb = request.Method;
        model.RequestUri = new Uri($"{request.Scheme}://{request.Host}/{request.Path}?{request.QueryString}");
        model.RequestHeaders = GetHeaderList(request.Headers);

        if (IsTextContentType(request.ContentType))
        {
            requestStream.Seek(0, SeekOrigin.Begin);
            model.Request = GetEncoding(request.ContentType).GetString(requestStream.ToArray());
        }
        else
        {
            model.Request = $"Content type : {request.ContentType}, length : {requestStream.Length} bytes";
        }

        return model;
    }

    private void UpdateForResponse(HttpLogModel model, HttpResponse response, MemoryStream responseStream)
    {
        model.StatusCode = response.StatusCode;
        model.ReasonPhrase = string.Empty;
        model.ResponseHeaders = GetHeaderList(response.Headers);

        if (IsTextContentType(response.ContentType))
        {
            responseStream.Seek(0, SeekOrigin.Begin);
            model.Response = GetEncoding(response.ContentType).GetString(responseStream.ToArray());
        }
        else
        {
            model.Response = $"Content type : {response.ContentType}, length : {response.Body.Length} bytes";
        }

        model.CallDuration = DateTime.UtcNow - model.CalledOn;
    }

    private string GetHeaderList(IHeaderDictionary dictionary)
    {
        var sb = new StringBuilder();
        foreach (var (key, value) in dictionary)
        {
            sb.AppendFormat("[Key : {0}, Value : {1}],", key, String.Join(",", value.ToString()));
        }
        return sb.ToString();
    }

    private bool IsTextContentType(string contentType)
    {
        return contentType == null ||
               contentType.StartsWith("application/json") ||
               contentType.StartsWith("application/xml") ||
               contentType.StartsWith("text/");
    }

    private Encoding GetEncoding(string contentType)
    {
        if (contentType == null)
            return Encoding.UTF8;

        try
        {
            var charset = "utf-8";
            var regex = new Regex(@";\s*charset=(?<charset>[^\s;]+)");
            var match = regex.Match(contentType);
            if (match.Success)
                charset = match.Groups["charset"].Value;

            return Encoding.GetEncoding(charset);
        }
        catch (ArgumentException)
        {
            return Encoding.UTF8;
        }
    }
}