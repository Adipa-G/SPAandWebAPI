using System;
using System.Linq;
using Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.DataContext;

public interface IApplicationDbContext : IDisposable
{
    DbSet<LogHttpRecord> LogHttpRecords { get; set; }

    DbSet<LogMessageRecord> LogMessageRecords { get; set; }

    int SaveChanges();
    
    IServiceProvider ServiceProvider { get; set; }
}