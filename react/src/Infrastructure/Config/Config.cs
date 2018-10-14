using System.Collections.Generic;
using Domain.Enum;
using Domain.Interfaces.Config;
using Domain.Interfaces.Repositories;

namespace Infrastructure.Config
{
    public class Config : IConfig
    {
        private readonly IConfigRepository _repository;
        private readonly Dictionary<string, object> _cache; 

        public Config(IConfigRepository repository)
        {
            _repository = repository;
            _cache = new Dictionary<string, object>();
        }

        public LogLevel LogLevelGeneral
        {
            get { return Get("LogLevelGeneral", LogLevel.Info); }
            set { Set("LogLevelGeneral", value); }
        }

        public bool LogRequests
        {
            get { return Get("LogRequests", true); }
            set { Set("LogRequests", value); }
        }

        public bool LogSqlStatements
        {
            get { return _repository.GetSettingValue("LogSqlStatements", true); }
            set { _repository.SetSettingValue("LogSqlStatements", value); }
        }

        private T Get<T>(string key,T defaultValue)
        {
            if (_cache.ContainsKey(key))
            {
                return (T)_cache[key];
            }
            T value = _repository.GetSettingValue(key,defaultValue);
            _cache.Add(key,value);
            return value;
        }

        private void Set<T>(string key, T value)
        {
            _repository.SetSettingValue(key, value);
            if (_cache.ContainsKey(key))
            {
                _cache.Remove(key);
                _cache.Add(key,value);
            }
        }
    }
}