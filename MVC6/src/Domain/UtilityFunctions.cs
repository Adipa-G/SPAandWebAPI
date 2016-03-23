using System;
using System.Threading;
using Microsoft.AspNet.Http;

namespace Domain
{
    public static class UtilityFunctions
    {
        private const string DateFormat = "yyyy-MM-ddTHH:mm:ss";

        public static string Timestamp(this DateTime dateTime)
        {
            return dateTime.ToString(DateFormat);
        }

        public static DateTime Timestamp(this string dateTime)
        {
            return DateTime.ParseExact(dateTime, DateFormat, Thread.CurrentThread.CurrentCulture);
        }

        public static Uri GetUri(HttpRequest request)
        {
            var builder = new UriBuilder();
            builder.Scheme = request.Scheme;
            builder.Host = request.Host.Value;
            builder.Path = request.Path;
            builder.Query = request.QueryString.ToUriComponent();
            return builder.Uri;
        }
    }
}
