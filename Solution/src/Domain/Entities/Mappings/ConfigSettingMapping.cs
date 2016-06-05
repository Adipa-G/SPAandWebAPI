using FluentNHibernate.Mapping;

namespace Domain.Entities.Mappings
{
    public class ConfigSettingMapping : ClassMap<ConfigSetting>
    {
        public ConfigSettingMapping()
        {
            Id(x => x.Id).UnsavedValue(0).GeneratedBy.Native();
            Map(x => x.ConfigKey).Length(256).Not.Nullable();
            Map(x => x.ConfigValue).Length(512);
        }
    }
}
