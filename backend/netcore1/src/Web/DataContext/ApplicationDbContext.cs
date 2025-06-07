using Domain.Entities;
using Infrastructure.DataContext;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
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

        base.OnModelCreating(builder);
    }

    public DbSet<LogHttpRecord> LogHttpRecords { get; set; }

    public DbSet<LogMessageRecord> LogMessageRecords { get; set; }
}
