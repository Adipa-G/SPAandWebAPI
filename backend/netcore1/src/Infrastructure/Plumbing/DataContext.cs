using Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Plumbing
{
    public class DataContext : DbContext
    {
        public DbSet<ConfigSetting> Settings { get; set; }

        public DbSet<LogHttpRecord> LogHttpRecords { get; set; }

        public DbSet<LogMessageRecord> LogMessageRecords { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseLoggerFactory()

            base.OnConfiguring(optionsBuilder);
        }
    }
}
