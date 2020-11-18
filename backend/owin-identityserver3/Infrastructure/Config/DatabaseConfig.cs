using System.Configuration;
using Domain.Interfaces.Config;

namespace Infrastructure.Config
{
    public class DatabaseConfig : IDatabaseConfig
    {
        public string DatabaseFileName => ConfigurationManager.AppSettings["DatabaseFileName"];
    }
}