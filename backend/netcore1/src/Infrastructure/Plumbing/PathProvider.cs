namespace Infrastructure.Plumbing;

public class PathProvider : IPathProvider
{
    public PathProvider(string hostingDirectory)
    {
        HostingDirectory = hostingDirectory;
    }

    public string HostingDirectory { get; }
}