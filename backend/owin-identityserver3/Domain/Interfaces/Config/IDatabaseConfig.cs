namespace Domain.Interfaces.Config
{
    public interface IDatabaseConfig
    {
        string Server { get; }
        string Database { get; }
        string Username { get; }
        string Password { get; }
        string ConnectionString { get; }
    }
}
