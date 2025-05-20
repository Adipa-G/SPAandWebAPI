using System;
using System.IO;
using Domain.Interfaces.Config;
using Microsoft.Extensions.Configuration;

namespace Infrastructure.Config
{
    public class DatabaseConfig : IDatabaseConfig
    {
        private IConfiguration _configuration;

        public DatabaseConfig(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        public string DatabasePath => Path.Combine(AppContext.BaseDirectory, _configuration["Database:DatabaseFileName"]);
    }
}