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
using Microsoft.Owin;
using Ninject;
using Serilog;

namespace Web.Middleware
{
    public class RequestResponseLog : OwinMiddleware
    {
        [Inject]
        public ILogWriterRepository LogRepository { get; set; }

        [Inject]
        public IConfig Config { get; set; }

        public RequestResponseLog(OwinMiddleware next,IKernel kernel) : base(next)
        {
            kernel.Inject(this);

            if (LogRepository == null)
                throw new Exception("Failed to resolve LogRepository");

            if (Config == null)
                throw new Exception("Failed to resolve Config");
        }

        public override async Task Invoke(IOwinContext context)
        {
            var orginalResponseStream = context.Response.Body;
            var responseStream = new MemoryStream();
            context.Response.Body = responseStream;

            var httpLogModel = new HttpLogModel();
            httpLogModel.TrackingId = Guid.NewGuid().ToString("d");
            context.Response.Headers.Add("Http-Tracking-Id", new[] { httpLogModel.TrackingId });

            try
            {
                await UpdateForRequest(httpLogModel, context.Request);

                await Next.Invoke(context);

                var error = context.Response != null && context.Response.StatusCode != (int) HttpStatusCode.OK;
                if (Config.LogRequests
                    || error)
                {
                    UpdateForResponse(httpLogModel,context.Response, responseStream);
                    LogRepository.LogRequest(error? LogLevel.Error : LogLevel.Info, httpLogModel, null);
                }
            }
            catch (Exception ex)
            {
                Log.Error(ex,ex.Message);
                UpdateForResponse(httpLogModel, context.Response, responseStream);
                LogRepository.LogRequest(LogLevel.Info, httpLogModel, ex);
            }
            finally
            {
                responseStream.Seek(0, SeekOrigin.Begin);
                await responseStream.CopyToAsync(orginalResponseStream);
            }
        }

        private async Task UpdateForRequest(HttpLogModel model, IOwinRequest request)
        {
            model.RequestIdentity = request.User != null && request.User.Identity.IsAuthenticated
                ? request.User.Identity.Name
                : "(anonymous)";
            model.CallerAddress = request.RemoteIpAddress;
            model.Verb = request.Method;
            model.RequestUri = request.Uri;
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

        private void UpdateForResponse(HttpLogModel model, IOwinResponse response, MemoryStream responseStream)
        {
            model.StatusCode = response.StatusCode;
            model.ReasonPhrase = response.ReasonPhrase;
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