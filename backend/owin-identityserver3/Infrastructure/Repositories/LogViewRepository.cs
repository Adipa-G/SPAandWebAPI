﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
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

        public async Task<ListResult<LogMessageListItemModel>> GetLogMessagesAsync(LogMessageListRequest request)
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
                query = query.Where(lm => lm.LogTimestamp > request.FromDate.Timestamp());
            }
            if (!string.IsNullOrWhiteSpace(request.ToDate))
            {
                query = query.Where(lm => lm.LogTimestamp < request.ToDate.Timestamp());
            }
            if (request.OrderDirection == SortDirection.Asc)
            {
                query = query.OrderBy(Projections.Property(request.OrderField)).Asc;
            }
            else if (request.OrderDirection == SortDirection.Desc)
            {
                query = query.OrderBy(Projections.Property(request.OrderField)).Desc;
            }

            var totalCount = await query.RowCountAsync();
            var queryResults = await query.Skip((request.PageNumber - 1) * request.PageSize)
                    .Take(request.PageSize)
                    .ListAsync();

            var results= queryResults.Select(
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

        public async Task<ListResult<LogHttpListItemModel>> GetLogHttpAsync(LogHttpListRequest request)
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
                    query = query.Where(lm => lm.CalledOn > request.FromDate.Timestamp());
                }
                if (!string.IsNullOrWhiteSpace(request.ToDate))
                {
                    query = query.Where(lm => lm.CalledOn < request.ToDate.Timestamp());
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
            var queryResults =
                await query.Skip((request.PageNumber - 1) * request.PageSize)
                    .Take(request.PageSize)
                    .ListAsync();

                var results = queryResults.Select(
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
