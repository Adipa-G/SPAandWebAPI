using System;
using Infrastructure.DataContext;
using Microsoft.EntityFrameworkCore;

namespace Web.DataContext;

public class ApplicationDbContextFactory(IDbContextFactory<ApplicationDbContext> contextFactory, IServiceProvider serviceProvider)
    : IApplicationDbContextFactory
{
    public IApplicationDbContext CreateDbContext()
    {
        var context = contextFactory.CreateDbContext();
        context.ServiceProvider = serviceProvider;
        return context;
    }
}