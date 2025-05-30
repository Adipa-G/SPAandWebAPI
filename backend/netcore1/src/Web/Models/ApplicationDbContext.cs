using Domain.Entities;
using Domain.Entities.Mappings;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace Web.Models;

public class ApplicationDbContext : IdentityDbContext<ApplicationUser>, IApplicationDbContext
{
    public ApplicationDbContext(DbContextOptions options)
        : base(options) { }

    protected override void OnModelCreating(ModelBuilder builder)
    {
        builder.ApplyConfiguration(new LogHttpRecordConfiguration());
        builder.ApplyConfiguration(new LogMessageRecordConfiguration());

        base.OnModelCreating(builder);
    }

    public DbSet<LogHttpRecord> LogHttpRecords { get; set; }

    public DbSet<LogMessageRecord> LogMessageRecords { get; set; }
}
