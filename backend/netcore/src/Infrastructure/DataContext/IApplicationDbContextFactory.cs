namespace Infrastructure.DataContext;

public interface IApplicationDbContextFactory
{
    IApplicationDbContext CreateDbContext();
}