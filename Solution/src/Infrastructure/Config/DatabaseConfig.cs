using Domain.Interfaces.Config;
using Microsoft.Extensions.Configuration;

namespace Infrastructure.Config
{
    public class DatabaseConfig : IDatabaseConfig
    {
        private IConfiguration _configuration;

        public DatabaseConfig()
        {
            _configuration = new ConfigurationBuilder().AddJsonFile("config.json").Build();
        }

        public string Server => _configuration["Server"];
        public string Database => _configuration["Database"];
        public string Username => _configuration["Username"];
        public string Password => _configuration["Password"];
        public string ConnectionString => _configuration["ConnectionString"];
    }
}