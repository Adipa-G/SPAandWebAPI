using Domain.Entities;

namespace Domain.Interfaces.DataContext;

public interface IApplicationDbContextFactory
{
    IApplicationDbContext CreateDbContext();
}