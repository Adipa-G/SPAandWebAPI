using System.ComponentModel;
using Domain.Entities;
using Domain.Interfaces.Repositories;
using NHibernate;

namespace Infrastructure.Repositories
{
    public class ConfigRepository : IConfigRepository
    {
        private readonly ISession _session;

        public ConfigRepository(ISession session)
        {
            _session = session;
        }

        public T GetSettingValue<T>(string key,T defaultValue)
        {
            ConfigSetting setting = _session.QueryOver<ConfigSetting>()
                   .Where(u => u.ConfigKey == key)
                   .SingleOrDefault();

            if (setting == null || string.IsNullOrWhiteSpace(setting.ConfigValue))
            {
                SetSettingValue(key,defaultValue);
                return defaultValue;
            }

            TypeConverter typeConverter = TypeDescriptor.GetConverter(typeof(T));
            return (T)typeConverter.ConvertFromString(setting.ConfigValue);
        }

        public void SetSettingValue<T>(string key, T value)
        {
            ConfigSetting setting = _session.QueryOver<ConfigSetting>()
                    .Where(u => u.ConfigKey == key)
                    .SingleOrDefault();

            setting = setting ?? new ConfigSetting() { ConfigKey = key };
            TypeConverter typeConverter = TypeDescriptor.GetConverter(typeof(T));

            setting.ConfigValue = typeConverter.ConvertToString(value);
            _session.Save(setting);
        }
    }
}