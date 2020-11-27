using System;
using System.Collections.Generic;
using System.Text;
using System.Threading;
using Domain.Entities;
using Domain.Enum;
using Domain.Interfaces.Config;
using Domain.Interfaces.Repositories;
using Domain.Models.Log;
using NHibernate;

namespace Infrastructure.Repositories
{
    public class LogWriterRepository : ILogWriterRepository
    {
        private readonly IList<LogMessageRecord> _messageRecords = new List<LogMessageRecord>();
        private readonly IList<LogHttpRecord> _httpRecords = new List<LogHttpRecord>();

        private readonly ISessionFactory _sessionFactory;


        public LogWriterRepository(ISessionFactory sessionFactory)
        {
            _sessionFactory = sessionFactory;

            var logThread = new Thread(LogThreadExec);
            logThread.Start();
        }

        public void LogSQL(string message)
        {
            var record = new LogMessageRecord()
            {
                Level = LogLevel.Debug,
                Logger = Enum.GetName(typeof(LoggerName), LoggerName.SQL),
                Message = message,
                LogTimestamp = DateTime.UtcNow
            };

            lock (_messageRecords)
            {
                _messageRecords.Add(record);
            }
        }

        public void Log(LogLevel level, LoggerName logger, string message, Exception ex)
        {
            var record = new LogMessageRecord()
            {
                Level = level,
                Logger = Enum.GetName(typeof(LoggerName), logger),
                Message = message,
                LogTimestamp = DateTime.UtcNow,
                StackTrace = ex == null ? string.Empty : FlattenException(ex)
            };

            lock (_messageRecords)
            {
                _messageRecords.Add(record);
            }
        }

        public void LogRequest(LogLevel level, HttpLogModel log, Exception ex)
        {
            var record = new LogHttpRecord()
            {
                Level = level,
                RequestIdentity = log.RequestIdentity,
                Request = log.Request,
                CallDuration = log.CallDuration,
                CalledOn = log.CalledOn,
                CallerAddress = log.CallerAddress,
                ReasonPhrase = log.ReasonPhrase,
                RequestHeaders = log.RequestHeaders,
                RequestUri = log.RequestUri,
                Response = log.Response + "\n" + (ex == null ? string.Empty : FlattenException(ex)),
                ResponseHeaders = log.RequestHeaders,
                StatusCode = log.StatusCode,
                TrackingId = log.TrackingId,
                Verb = log.Verb,
            };

            lock (_httpRecords)
            {
                _httpRecords.Add(record);
            }
        }

        private void LogThreadExec()
        {
            while (true)
            {
                using (var session = _sessionFactory.OpenSession())
                using (var transaction = session.BeginTransaction())
                {
                    try
                    {
                        var config = new Config.Config();
                        LogThreadExec(config, session);
                        transaction.Commit();
                    }
                    catch (Exception ex)
                    {
                        transaction.Rollback();
                    }
                }
                Thread.Sleep(1000);
            }
        }

        public void LogThreadExec(IConfig config,ISession session)
        {
            lock (_messageRecords)
            {
                foreach (var messageRecord in _messageRecords)
                {
                    var shouldLog = messageRecord.Logger ==
                                    Enum.GetName(typeof(LoggerName), LoggerName.General)
                                    && messageRecord.Level >= config.LogLevelGeneral;

                    shouldLog = shouldLog ||
                                (messageRecord.Logger == Enum.GetName(typeof(LoggerName), LoggerName.SQL) &&
                                    config.LogSqlStatements);

                    if (shouldLog)
                    {
                        session.Save(messageRecord);
                    }
                }
                _messageRecords.Clear();
            }

            lock (_httpRecords)
            {
                foreach (var httpRecord in _httpRecords)
                {
                    session.Save(httpRecord);
                }
                _httpRecords.Clear();
            }
        }

        private string FlattenException(Exception exception)
        {
            var stringBuilder = new StringBuilder();

            while (exception != null)
            {
                stringBuilder.AppendLine(exception.Message);
                stringBuilder.AppendLine(exception.StackTrace);

                exception = exception.InnerException;
            }

            string result = stringBuilder.ToString();
            if (result.Length > 1024)
                result = result.Substring(0, 1024);
            return result;
        }
    }
}