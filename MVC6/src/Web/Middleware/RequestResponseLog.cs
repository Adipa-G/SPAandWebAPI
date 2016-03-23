using System;
using System.IO;
using System.Net;
using System.Text;
using System.Text.RegularExpressions;
using System.Threading.Tasks;
using Domain.Enum;
using Domain.Interfaces.Config;
using Domain.Interfaces.Repositories;
using Domain.Models.Log;
using Infrastructure.Config;
using Microsoft.ApplicationInsights.AspNet.Extensions;
using Microsoft.AspNet.Builder;
using Microsoft.AspNet.Http;

namespace Web.Middleware
{
    public class RequestResponseLog
    {
        private readonly RequestDelegate _next;
        private readonly ILogWriterRepository _logRepository;
        private readonly IConfig _config;

        
        public RequestResponseLog(RequestDelegate next, ILogWriterRepository logRepository, IConfig config)
        {
            _next = next;
            _logRepository = logRepository;
            _config = config;
        }

        public async Task Invoke(HttpContext context)
        {
            if (!context.Request.GetUri().ToString().Contains("api/"))
            {
                await _next.Invoke(context);
                return;
            }

            var orginalResponseStream = context.Response.Body;
            var responseStream = new MemoryStream();
            context.Response.Body = responseStream;

            var httpLogModel = new HttpLogModel();

            httpLogModel.TrackingId = Guid.NewGuid().ToString("d");
            context.TraceIdentifier = httpLogModel.TrackingId;
            context.Response.Headers.Add("Http-Tracking-Id", new[] { httpLogModel.TrackingId });

            try
            {
                await UpdateForRequest(httpLogModel, context.Request);

                await _next.Invoke(context);

                var error = context.Response != null && context.Response.StatusCode != (int) HttpStatusCode.OK;
                if (_config.LogRequests
                    || error)
                {
                    UpdateForResponse(httpLogModel,context.Response, responseStream);
                    _logRepository.LogRequest(error? LogLevel.Error : LogLevel.Info, httpLogModel, null);
                }
            }
            catch (Exception ex)
            {
                UpdateForResponse(httpLogModel, context.Response, responseStream);
                _logRepository.LogRequest(LogLevel.Info, httpLogModel, ex);
            }
            finally
            {
                responseStream.Seek(0, SeekOrigin.Begin);
                await responseStream.CopyToAsync(orginalResponseStream);
            }
        }

        private async Task UpdateForRequest(HttpLogModel model, HttpRequest request)
        {
            model.RequestIdentity = request.HttpContext.User != null && request.HttpContext.User.Identity.IsAuthenticated
                ? request.HttpContext.User.Identity.Name
                : "(anonymous)";
            model.CallerAddress = request.HttpContext.Connection.RemoteIpAddress?.ToString() ?? string.Empty;
            model.Verb = request.Method;
            model.RequestUri = request.GetUri();
            model.RequestHeaders = GetHeaderList(request.Headers);

            if (IsTextContentType(request.ContentType))
            {
                var memoryStream = new MemoryStream();
                await request.Body.CopyToAsync(memoryStream);

                memoryStream.Seek(0, SeekOrigin.Begin);
                model.Request = GetEncoding(request.ContentType).GetString(memoryStream.ToArray());

                memoryStream.Seek(0, SeekOrigin.Begin);
                request.Body = memoryStream;
            }
            else
            {
                model.Request = $"Content type : {request.ContentType}, length : {request.Body.Length} bytes";
            }
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
            foreach (var keyValuePair in dictionary)
            {
                sb.AppendFormat("[Key : {0}, Value : {1}],", keyValuePair.Key, String.Join(",",keyValuePair.Value));
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
}