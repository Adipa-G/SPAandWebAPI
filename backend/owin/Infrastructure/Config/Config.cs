using System.Collections.Generic;
using System.ComponentModel;
using System.Configuration;
using Domain.Enum;
using Domain.Interfaces.Config;
using Domain.Interfaces.Repositories;

namespace Infrastructure.Config
{
    public class Config : IConfig
    {
        public LogLevel LogLevelGeneral => Get("LogLevelGeneral", LogLevel.Info);

        public bool LogRequests => Get("LogRequests", true);

        public bool LogSqlStatements => Get("LogSqlStatements", true);

        private T Get<T>(string key, T defaultValue)
        {
            var values = ConfigurationManager.AppSettings.GetValues(key);
            if (values?.Length > 0 && values[0] != null)
            {
                TypeConverter typeConverter = TypeDescriptor.GetConverter(typeof(T));
                return (T)typeConverter.ConvertFromString(values[0]);
            }
            return defaultValue;
        }
    }
}