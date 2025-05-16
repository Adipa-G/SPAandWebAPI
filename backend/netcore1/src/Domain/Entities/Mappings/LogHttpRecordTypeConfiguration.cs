using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Domain.Entities.Mappings
{
    public class LogHttpRecordTypeConfiguration : IEntityTypeConfiguration<LogHttpRecord>
    {
        public void Configure(EntityTypeBuilder<LogHttpRecord> builder)
        {
            builder.HasKey(x => x.Id);
            builder.Property(x => x.Level).IsRequired();
            builder.Property(x => x.TrackingId);
            builder.Property(x => x.CalledOn).IsRequired();
            builder.Property(x => x.CallerAddress).IsRequired();
            builder.Property(x => x.RequestIdentity).HasMaxLength(256).IsRequired();
            builder.Property(x => x.Verb).HasMaxLength(50).IsRequired();
            builder.Property(x => x.RequestUri).HasMaxLength(1024).IsRequired();
            builder.Property(x => x.RequestHeaders).IsRequired();
            builder.Property(x => x.Request).IsRequired();
            builder.Property(x => x.StatusCode);
            builder.Property(x => x.ReasonPhrase);
            builder.Property(x => x.ResponseHeaders);
            builder.Property(x => x.Response);
            builder.Property(x => x.CallDuration);
        }
    }
}
