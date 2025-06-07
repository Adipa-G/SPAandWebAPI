using Infrastructure.DataContext;
using Microsoft.EntityFrameworkCore;

namespace Web.DataContext;

public class ApplicationDbContextFactory(IDbContextFactory<ApplicationDbContext> contextFactory)
    : IApplicationDbContextFactory
{
    public IApplicationDbContext CreateDbContext()
    {
        return contextFactory.CreateDbContext();
    }
}