using System.Threading.Tasks;
using Microsoft.Data.Sqlite;
using Microsoft.EntityFrameworkCore;
using Web.DataContext;

namespace Infrastructure.Test.Repositories;

public abstract class RepositoryTestBase
{
    protected SqliteConnection Connection;

    public async Task BaseSetUpAsync()
    {
        Connection = new SqliteConnection("DataSource=:memory:");
        Connection.Open();

        var options = new DbContextOptionsBuilder<ApplicationDbContext>().UseSqlite(Connection).Options;

        await using (var context = new ApplicationDbContext(options))
        {
            await context.Database.EnsureCreatedAsync();
        }
    }

    public async Task BaseTearDownAsync()
    {
        var options = new DbContextOptionsBuilder<ApplicationDbContext>().UseSqlite(Connection).Options;

        await using (var context = new ApplicationDbContext(options))
        {
            await context.Database.EnsureDeletedAsync();
        }

        await Connection.CloseAsync();
        await Connection.DisposeAsync();
    }

    protected ApplicationDbContext CreateContext()
    {
        var options = new DbContextOptionsBuilder<ApplicationDbContext>().UseSqlite(Connection).Options;
        return new ApplicationDbContext(options);
    }
}