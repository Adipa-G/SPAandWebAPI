using Domain.Enum;

namespace Domain.Models.Log
{
    public class LogHttpListRequest : ListRequest
    {
        public LogLevel? LogLevel { get; set; }

        public string TrackingId { get; set; }

        public string Identity { get; set; }

        public string FromDate { get; set; }

        public string ToDate { get; set; }
    }
}