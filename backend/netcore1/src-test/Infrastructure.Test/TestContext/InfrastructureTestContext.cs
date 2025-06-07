using System;
using Domain.Entities;
using Domain.Enum;
using Infrastructure.DataContext;

namespace Infrastructure.Test.TestContext;

public class InfrastructureTestContext(IApplicationDbContext dbContext)
{
    public void LogMessage(LogLevel level, string logger, string message)
    {
        dbContext.LogMessageRecords.Add(new LogMessageRecord()
        {
            Level = LogLevel.Error,
            Logger = "Test",
            LogTimestamp = DateTime.UtcNow.Ticks,
            Message = message,
            StackTrace = "Test stack trace"
        });
    }

    public void LogHttp(LogLevel level, string trackId)
    {
        dbContext.LogHttpRecords.Add(new LogHttpRecord()
        {
            Level = level,
            TrackingId = trackId,
            Request = "Test Req",
            Response = "Test Resp",
            StatusCode = 200,
            RequestIdentity = "User",
            CalledOn = DateTime.UtcNow.Ticks,
            CallDuration = new TimeSpan(0, 1, 0),
            CallerAddress = "127.0.0.1",
            ReasonPhrase = "OK",
            Verb = "GET",
            RequestHeaders = "Req Headers",
            RequestUri = new Uri("http://localhost/index.html"),
            ResponseHeaders = "Resp Headers",
        });
    }
}