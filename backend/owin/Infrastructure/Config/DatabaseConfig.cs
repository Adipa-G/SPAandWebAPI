using System.Configuration;
using Domain.Interfaces.Config;

namespace Infrastructure.Config
{
    public class DatabaseConfig : IDatabaseConfig
    {
        public string Server => ConfigurationManager.AppSettings["Server"];
        public string Database => ConfigurationManager.AppSettings["Database"];
        public string Username => ConfigurationManager.AppSettings["Username"];
        public string Password => ConfigurationManager.AppSettings["Password"];
        public string ConnectionString => ConfigurationManager.AppSettings["ConnectionString"];
    }
}