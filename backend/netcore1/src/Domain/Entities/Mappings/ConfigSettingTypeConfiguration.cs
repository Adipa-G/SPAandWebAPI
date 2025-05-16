using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Domain.Entities.Mappings
{
    public class ConfigSettingTypeConfiguration : IEntityTypeConfiguration<ConfigSetting>
    {
        public void Configure(EntityTypeBuilder<ConfigSetting> builder)
        {
            builder.HasKey(r => r.Id);
            builder.Property(x => x.ConfigKey).HasMaxLength(256).IsRequired();
            builder.Property(x => x.ConfigValue).HasMaxLength(512);
        }
    }
}
