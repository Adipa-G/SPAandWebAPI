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

        public string Server => _configuration["Database:Server"];
        public string Database => _configuration["Database:Database"];
        public string Username => _configuration["Database:Username"];
        public string Password => _configuration["Database:Password"];
        public string ConnectionString => _configuration["Database:ConnectionString"];
    }
}