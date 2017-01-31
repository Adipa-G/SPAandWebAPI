using System;
using System.Collections.Generic;
using System.Data.SqlTypes;
using System.Linq;
using Domain;
using Domain.Entities;
using Domain.Enum;
using Domain.Interfaces.Repositories;
using Domain.Models;
using Domain.Models.Log;
using NHibernate;
using NHibernate.Criterion;

namespace Infrastructure.Repositories
{
    public class LogViewRepository : ILogViewRepository
    {
        private ISession _session;

        public LogViewRepository(ISession session)
        {
            _session = session;
        }

        public List<string> GetAllLevels()
        {
            return new List<string>(Enum.GetNames(typeof (LogLevel)));
        }

        public List<string> GetAllLoggers()
        {
            return new List<string>(Enum.GetNames(typeof(LoggerName)));
        }

        public ListResult<LogMessageListItemModel> GetLogMessages(LogMessageListRequest request)
        {
            var query = _session.QueryOver<LogMessageRecord>();
            if (request.LogLevel.HasValue)
            {
                query = query.Where(lm => lm.Level == request.LogLevel);
            }
            if (!string.IsNullOrEmpty(request.Logger))
            {
                query = query.Where(lm => lm.Logger == request.Logger);
            }
            if (!string.IsNullOrWhiteSpace(request.FromDate))
            {
                var fromDate = request.FromDate.Timestamp();
                if (fromDate > SqlDateTime.MinValue.Value)
                {
                    query = query.Where(lm => lm.LogTimestamp > request.FromDate.Timestamp());
                }
            }
            if (!string.IsNullOrWhiteSpace(request.ToDate))
            {
                var toDate = request.ToDate.Timestamp();
                if (toDate > SqlDateTime.MinValue.Value)
                {
                    query = query.Where(lm => lm.LogTimestamp < request.ToDate.Timestamp());
                }
            }
            if (request.OrderDirection == SortDirection.Asc)
            {
                query = query.OrderBy(Projections.Property(request.OrderField)).Asc;
            }
            else if (request.OrderDirection == SortDirection.Desc)
            {
                query = query.OrderBy(Projections.Property(request.OrderField)).Desc;
            }

            var totalCount = query.RowCount();
            var results =
                query.Skip((request.PageNumber - 1) * request.PageSize)
                    .Take(request.PageSize)
                    .List()
                    .Select(
                        r =>
                            new LogMessageListItemModel()
                            {
                                Id = r.Id,
                                LogTimestamp = r.LogTimestamp.Timestamp(),
                                Message = r.Message,
                                Level = Enum.GetName(typeof (LogLevel), r.Level),
                                Logger = r.Logger,
                                StackTrace = r.StackTrace
                            })
                    .ToList();

            return new ListResult<LogMessageListItemModel>()
            {
                PageNumber = request.PageNumber,
                PageSize = request.PageSize,
                Results = results,
                TotalCount = totalCount
            };
        }

        public ListResult<LogHttpListItemModel> GetLogHttp(LogHttpListRequest request)
        {
            var query = _session.QueryOver<LogHttpRecord>();
            if (!string.IsNullOrEmpty(request.TrackingId))
            {
                query = query.Where(lm => lm.TrackingId == request.TrackingId);
            }
            else
            {
                if (request.LogLevel.HasValue)
                {
                    query = query.Where(lm => lm.Level == request.LogLevel);
                }
                if (!string.IsNullOrWhiteSpace(request.Identity))
                {
                    query = query.Where(lm => lm.RequestIdentity == request.Identity);
                }
                if (!string.IsNullOrWhiteSpace(request.FromDate))
                {
                    var fromDate = request.FromDate.Timestamp();
                    if (fromDate > SqlDateTime.MinValue.Value)
                    {
                        query = query.Where(lm => lm.CalledOn > fromDate);
                    }
                }
                if (!string.IsNullOrWhiteSpace(request.ToDate))
                {
                    var toDate = request.ToDate.Timestamp();
                    if (toDate > SqlDateTime.MinValue.Value)
                    {
                        query = query.Where(lm => lm.CalledOn < toDate);
                    }
                }
                if (request.OrderDirection == SortDirection.Asc)
                {
                    query = query.OrderBy(Projections.Property(request.OrderField)).Asc;
                }
                else if (request.OrderDirection == SortDirection.Desc)
                {
                    query = query.OrderBy(Projections.Property(request.OrderField)).Desc;
                }
            }

            var totalCount = query.RowCount();

            var sqlResults = query.Skip((request.PageNumber - 1)*request.PageSize)
                .Take(request.PageSize)
                .List();

            var results = sqlResults.Select(
                        r =>
                            new LogHttpListItemModel()
                            {
                                Id = r.Id,
                                LogTimestamp = r.CalledOn.Timestamp(),
                                TrackingId = r.TrackingId,
                                Caller = r.RequestIdentity,
                                Verb = r.Verb,
                                RequestUri = r.RequestUri,
                                RequestHeaders = r.RequestHeaders,
                                Request = r.Request.Length > 1000 ? r.Request.Substring(0, 1000) : r.Request,
                                Status = string.Format("{0}\n{1}", r.StatusCode, r.ReasonPhrase),
                                ResponseHeaders = r.ResponseHeaders,
                                Response = r.Response.Length > 1000 ? r.Response.Substring(0,1000) : r.Response,
                                Duration = r.CallDuration.TotalSeconds.ToString()
                            })
                    .ToList();

            return new ListResult<LogHttpListItemModel>()
            {
                PageNumber = request.PageNumber,
                PageSize = request.PageSize,
                Results = results,
                TotalCount = totalCount
            };
        }
    }
}
