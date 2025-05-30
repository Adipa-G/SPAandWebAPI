using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Domain.Entities.Mappings;

public class LogMessageRecordConfiguration : IEntityTypeConfiguration<LogMessageRecord>
{
    public void Configure(EntityTypeBuilder<LogMessageRecord> builder)
    {
        builder.HasKey(x => x.Id);

        builder.Property(x => x.LogTimestamp)
            .IsRequired();

        builder.Property(x => x.Logger);

        builder.Property(x => x.Level)
            .IsRequired();

        builder.Property(x => x.Message);

        builder.Property(x => x.StackTrace);
    }
}