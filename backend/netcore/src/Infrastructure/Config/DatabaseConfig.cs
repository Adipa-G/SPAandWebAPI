using System.IO;
using Domain.Interfaces.Config;
using Microsoft.Extensions.Configuration;

namespace Infrastructure.Config
{
    public class DatabaseConfig : IDatabaseConfig
    {
        private IConfiguration _configuration;

        public DatabaseConfig(IConfigurationRoot configuration)
        {
            _configuration = configuration;
        }

        public string DatabaseFileName => _configuration["Database:DatabaseFileName"];
    }
}