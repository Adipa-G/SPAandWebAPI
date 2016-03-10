using System;

namespace Domain.Models.Log
{
    public class LogHttpListItemModel
    {
        public long Id { get; set; }
        public string TrackingId { get; set; }
        public string LogTimestamp { get; set; }
        public string Caller { get; set; }
        public string Request { get; set; }
        public string Verb { get; set; }
        public Uri RequestUri { get; set; }
        public string RequestHeaders { get; set; }
        public string Status { get; set; }
        public string Response { get; set; }
        public string ResponseHeaders { get; set; }
        public string Duration { get; set; }
    }
}