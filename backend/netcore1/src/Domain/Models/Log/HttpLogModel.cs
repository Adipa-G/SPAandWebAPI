using System;

namespace Domain.Models.Log;

public class HttpLogModel
{
    public HttpLogModel()
    {
        CalledOn = DateTime.UtcNow;
    }

    public string TrackingId { get; set; }
    public DateTime CalledOn { get; set; }
    public string CallerAddress { get; set; }
    public string RequestIdentity { get; set; }
    public string Verb { get; set; }
    public Uri RequestUri { get; set; }
    public string RequestHeaders { get; set; }
    public string Request { get; set; }
    public int StatusCode { get; set; }
    public string ReasonPhrase { get; set; }
    public string ResponseHeaders { get; set; }
    public string Response { get; set; }
    public TimeSpan CallDuration { get; set; }
}