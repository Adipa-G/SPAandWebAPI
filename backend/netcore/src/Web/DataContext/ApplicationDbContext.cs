using System;
using Domain.Entities;
using Domain.Interfaces.Repositories;
using Infrastructure.DataContext;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Web.Models;
using Web.Models.Configuration;

namespace Web.DataContext;

public class ApplicationDbContext(DbContextOptions options)
    : IdentityDbContext<ApplicationUser>(options), IApplicationDbContext
{
    protected override void OnModelCreating(ModelBuilder builder)
    {
        builder.ApplyConfiguration(new LogHttpRecordConfiguration());
        builder.ApplyConfiguration(new LogMessageRecordConfiguration());
        builder.UseOpenIddict();

        base.OnModelCreating(builder);
    }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        if (ServiceProvider != null)
        {
            var logWriterRepository = ServiceProvider.GetService<ILogWriterRepository>();
            optionsBuilder.LogTo(sql =>
            {
                if (sql.Contains("Executing DbCommand")
                    && !sql.Contains("INSERT INTO \"LogMessageRecords\""))
                {
                    logWriterRepository.LogSQL(sql);
                }
            });
        }
        base.OnConfiguring(optionsBuilder);
    }

    public DbSet<LogHttpRecord> LogHttpRecords { get; set; }

    public DbSet<LogMessageRecord> LogMessageRecords { get; set; }

    public IServiceProvider ServiceProvider { get; set; }
}
