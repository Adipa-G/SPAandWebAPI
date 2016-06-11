using System;
using Domain.Entities;
using Domain.Enum;
using NHibernate;

namespace Infrastructure.Test.TestContext
{
    public class InfrastructureTestContext
    {
        private readonly ISession _session;

        public InfrastructureTestContext(ISession session)
        {
            _session = session;
        }

        public void User(string name)
        {
            var user = new User() {UserName = name, Password = "123"};
            _session.Save(user);
        }

        public void LogMessage(LogLevel level, string logger,string message)
        {
            _session.Save(new LogMessageRecord()
            {
                Level = LogLevel.Error,
                Logger = "Test",
                LogTimestamp = DateTime.UtcNow,
                Message = message,
                StackTrace = "Test stack trace"
            });
        }

        public void LogHttp(LogLevel level,string trackId)
        {
            _session.Save(new LogHttpRecord()
            {
                Level = level,
                TrackingId = trackId,
                Request = "Test Req",
                Response = "Test Resp",
                StatusCode = 200,
                RequestIdentity = "User",
                CalledOn = DateTime.UtcNow,
                CallDuration = new TimeSpan(0,1,0),
                CallerAddress = "127.0.0.1",
                ReasonPhrase = "OK",
                Verb = "GET",
                RequestHeaders = "Req Headers",
                RequestUri = new Uri("http://localhost/index.html"),
                ResponseHeaders = "Resp Headers",
            });
        }
    }
}
