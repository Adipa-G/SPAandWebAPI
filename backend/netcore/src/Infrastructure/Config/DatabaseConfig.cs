using System;
using System.IO;
using Domain.Interfaces.Config;
using Microsoft.Extensions.Configuration;

namespace Infrastructure.Config;

public class DatabaseConfig(IConfiguration configuration)
{
    public string DatabasePath => Path.Combine(AppContext.BaseDirectory, configuration["Database:DatabaseFileName"]);
}