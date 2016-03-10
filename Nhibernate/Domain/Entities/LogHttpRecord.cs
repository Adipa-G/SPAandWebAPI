using System;
using Domain.Enum;

namespace Domain.Entities
{
    public class LogHttpRecord
    {
        public virtual long Id { get; set; }
        public virtual LogLevel Level { get; set; }
        public virtual string TrackingId { get; set; }
        public virtual DateTime CalledOn { get; set; }
        public virtual string CallerAddress { get; set; }
        public virtual string RequestIdentity { get; set; }
        public virtual string Verb { get; set; }
        public virtual Uri RequestUri { get; set; }
        public virtual string RequestHeaders { get; set; }
        public virtual string Request { get; set; }
        public virtual int StatusCode { get; set; }
        public virtual string ReasonPhrase { get; set; }
        public virtual string ResponseHeaders { get; set; }
        public virtual string Response { get; set; }
        public virtual TimeSpan CallDuration { get; set; }
    }
}
