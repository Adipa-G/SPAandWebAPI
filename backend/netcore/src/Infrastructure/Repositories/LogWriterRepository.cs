using System;
using System.Collections.Generic;
using System.Text;
using System.Threading;
using Domain.Entities;
using Domain.Enum;
using Domain.Interfaces.Config;
using Domain.Interfaces.Repositories;
using Domain.Models.Log;
using Infrastructure.DataContext;

namespace Infrastructure.Repositories;

public class LogWriterRepository : ILogWriterRepository
{
    public static bool TEST_MODE = false;

    private readonly IList<LogMessageRecord> _messageRecords = new List<LogMessageRecord>();
    private readonly IList<LogHttpRecord> _httpRecords = new List<LogHttpRecord>();

    private readonly ILogConfig _logConfig;
    private readonly IApplicationDbContextFactory _contextFactory;


    public LogWriterRepository(IApplicationDbContextFactory contextFactory, 
        ILogConfig logConfig)
    {
        _contextFactory = contextFactory;
        _logConfig = logConfig;

        if (!TEST_MODE)
        {
            var logThread = new Thread(LogThreadExec);
            logThread.Start();
        }
    }

    public void LogSQL(string message)
    {
        var record = new LogMessageRecord()
        {
            Level = LogLevel.Debug,
            Logger = Enum.GetName(typeof(LoggerName), LoggerName.SQL),
            Message = message,
            LogTimestamp = DateTime.UtcNow.Ticks
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
            LogTimestamp = DateTime.UtcNow.Ticks,
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
            CalledOn = log.CalledOn.Ticks,
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
            using (var context = _contextFactory.CreateDbContext())
            {
                try
                {
                    LogThreadExec(_logConfig, context);
                    context.SaveChanges();
                }
                catch (Exception ex)
                {
                    Console.Write(ex.StackTrace);
                }
            }
            Thread.Sleep(1000);
        }
    }

    public void LogThreadExec(ILogConfig logConfig, IApplicationDbContext context)
    {
        lock (_messageRecords)
        {
            var copy = new List<LogMessageRecord>(_messageRecords);
            _messageRecords.Clear();
            foreach (var messageRecord in copy)
            {
                var shouldLog = messageRecord.Logger ==
                                Enum.GetName(typeof(LoggerName), LoggerName.General)
                                && messageRecord.Level >= logConfig.LogLevelGeneral;

                shouldLog = shouldLog ||
                            (messageRecord.Logger == Enum.GetName(typeof(LoggerName), LoggerName.SQL) &&
                             logConfig.LogSqlStatements);

                if (shouldLog)
                {
                    context.LogMessageRecords.Add(messageRecord);
                }
            }
        }

        lock (_httpRecords)
        {
            var copy = new List<LogHttpRecord>(_httpRecords);
            _httpRecords.Clear();
            foreach (var httpRecord in copy)
            {
                context.LogHttpRecords.Add(httpRecord);
            }
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