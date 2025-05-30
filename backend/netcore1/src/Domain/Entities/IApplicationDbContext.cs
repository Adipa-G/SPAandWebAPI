using System;
using Microsoft.EntityFrameworkCore;

namespace Domain.Entities;

public interface IApplicationDbContext : IDisposable
{
    DbSet<LogHttpRecord> LogHttpRecords { get; set; }

    DbSet<LogMessageRecord> LogMessageRecords { get; set; }

    int SaveChanges();
}