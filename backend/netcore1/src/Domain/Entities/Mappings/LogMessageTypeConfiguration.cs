using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Domain.Entities.Mappings
{
    public class LogMessageTypeConfiguration : IEntityTypeConfiguration<LogMessageRecord>
    {
        public void Configure(EntityTypeBuilder<LogMessageRecord> builder)
        {
            builder.HasKey(x => x.Id);
            builder.Property(x => x.LogTimestamp).IsRequired();
            builder.Property(x => x.Level).IsRequired();
            builder.Property(x => x.Logger).HasMaxLength(256).IsRequired();
            builder.Property(x => x.Message).IsRequired();
            builder.Property(x => x.StackTrace);
        }
    }
}
