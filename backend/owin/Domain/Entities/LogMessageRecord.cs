using Domain.Enum;
using System;

namespace Domain.Entities
{
    public class LogMessageRecord
    {
        public virtual long Id { get; set; }
        public virtual DateTime LogTimestamp { get; set; }
        public virtual string Logger { get; set; }
        public virtual LogLevel Level { get; set; }
        public virtual string Message { get; set; }
        public virtual string StackTrace { get; set; }
    }
}