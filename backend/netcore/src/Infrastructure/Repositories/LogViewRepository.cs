﻿using System;
using System.Collections.Generic;
using System.Data.SqlTypes;
using System.Linq;
using System.Threading.Tasks;
using Domain;
using Domain.Entities;
using Domain.Enum;
using Domain.Interfaces.Repositories;
using Domain.Models;
using Domain.Models.Log;
using Infrastructure.DataContext;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Repositories;

public class LogViewRepository(IApplicationDbContextFactory contextFactory) : ILogViewRepository
{
    public List<string> GetAllLevels()
    {
        return new List<string>(Enum.GetNames(typeof(LogLevel)));
    }

    public List<string> GetAllLoggers()
    {
        return new List<string>(Enum.GetNames(typeof(LoggerName)));
    }

    public async Task<ListResult<LogMessageListItemModel>> GetLogMessagesAsync(LogMessageListRequest request)
    {
        using var context = contextFactory.CreateDbContext();

        var query = context.LogMessageRecords.AsQueryable();
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
                query = query.Where(lm => lm.LogTimestamp > request.FromDate.Timestamp().Ticks);
            }
        }
        if (!string.IsNullOrWhiteSpace(request.ToDate))
        {
            var toDate = request.ToDate.Timestamp();
            if (toDate > SqlDateTime.MinValue.Value)
            {
                query = query.Where(lm => lm.LogTimestamp < request.ToDate.Timestamp().Ticks);
            }
        }
        if (request.OrderDirection == SortDirection.Asc)
        {
            query = query.OrderBy(lm => EF.Property<LogMessageRecord>(lm, request.OrderField));
        }
        else if (request.OrderDirection == SortDirection.Desc)
        {
            query = query.OrderByDescending(lm => EF.Property<LogMessageRecord>(lm, request.OrderField));
        }

        var totalCount = await query.CountAsync();
        var queryResults = await query.Skip((request.PageNumber - 1) * request.PageSize)
            .Take(request.PageSize)
            .ToListAsync();

        var results = queryResults.Select(
                r =>
                    new LogMessageListItemModel()
                    {
                        Id = r.Id,
                        LogTimestamp = r.LogTimestamp.Timestamp(),
                        Message = r.Message,
                        Level = Enum.GetName(typeof(LogLevel), r.Level),
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
        using var context = contextFactory.CreateDbContext();

        var query = context.LogHttpRecords.AsQueryable();
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
                    query = query.Where(lm => lm.CalledOn > fromDate.Ticks);
                }
            }
            if (!string.IsNullOrWhiteSpace(request.ToDate))
            {
                var toDate = request.ToDate.Timestamp();
                if (toDate > SqlDateTime.MinValue.Value)
                {
                    query = query.Where(lm => lm.CalledOn < toDate.Ticks);
                }
            }
            if (request.OrderDirection == SortDirection.Asc)
            {
                query = query.OrderBy(lm => EF.Property<LogMessageRecord>(lm, request.OrderField));
            }
            else if (request.OrderDirection == SortDirection.Desc)
            {
                query = query.OrderByDescending(lm => EF.Property<LogMessageRecord>(lm, request.OrderField));
            }
        }

        var totalCount = await query.CountAsync();
        var queryResults = await query.Skip((request.PageNumber - 1) * request.PageSize)
            .Take(request.PageSize)
            .ToListAsync();

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
                        Response = r.Response.Length > 1000 ? r.Response.Substring(0, 1000) : r.Response,
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