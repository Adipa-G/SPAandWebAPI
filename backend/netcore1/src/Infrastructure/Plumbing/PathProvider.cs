namespace Infrastructure.Plumbing;

public class PathProvider(string hostingDirectory) : IPathProvider
{
    public string HostingDirectory { get; } = hostingDirectory;
}