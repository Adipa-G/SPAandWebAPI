namespace Infrastructure.Plumbing;

public class PathProvider(string hostingDirectory)
{
    public string HostingDirectory { get; } = hostingDirectory;
}