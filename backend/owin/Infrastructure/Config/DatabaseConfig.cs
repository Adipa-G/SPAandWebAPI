using Domain.Interfaces.Config;
using System.Configuration;

namespace Infrastructure.Config
{
    public class DatabaseConfig : IDatabaseConfig
    {
        public string DatabaseFileName => ConfigurationManager.AppSettings["DatabaseFileName"];
    }
}