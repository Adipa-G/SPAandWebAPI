using Domain.Entities;
using Domain.Interfaces.DataContext;
using Microsoft.EntityFrameworkCore;
using Web.Models;

namespace Web.DataContext;

public class ApplicationDbContextFactory : IApplicationDbContextFactory
{
    private readonly IDbContextFactory<ApplicationDbContext> _contextFactory;

    public ApplicationDbContextFactory(IDbContextFactory<ApplicationDbContext> contextFactory)
    {
        _contextFactory = contextFactory;
    }

    public IApplicationDbContext CreateDbContext()
    {
        return _contextFactory.CreateDbContext();
    }
}