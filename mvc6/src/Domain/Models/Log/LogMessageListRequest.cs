using Domain.Enum;

namespace Domain.Models.Log
{
    public class LogMessageListRequest : ListRequest
    {
        public string Logger { get; set; }

        public LogLevel? LogLevel { get; set; }

        public string FromDate { get; set; }

        public string ToDate { get; set; }
    }
}
