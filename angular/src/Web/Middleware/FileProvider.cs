using System;
using Microsoft.Extensions.FileProviders;
using Microsoft.Extensions.Primitives;

namespace Web.Middleware
{
    public class FileProvider : IFileProvider
    {
        private PhysicalFileProvider provider;

        public FileProvider(string root)
        {
            provider = new PhysicalFileProvider(root);
        }

        public IFileInfo GetFileInfo(string subpath)
        {
            subpath = DetectHtml5Routing(subpath,false);
            return provider.GetFileInfo(subpath);
        }

        public IDirectoryContents GetDirectoryContents(string subpath)
        {
            subpath = DetectHtml5Routing(subpath,true);
            return provider.GetDirectoryContents(subpath);
        }

        public IChangeToken Watch(string filter)
        {
            return provider.Watch(filter);
        }

        private static string DetectHtml5Routing(string subpath,bool path)
        {
            var index = subpath.ToLower().IndexOf(".html/", StringComparison.Ordinal);
            if (index > 0)
            {
                var appender = path ? "/" : "";
                subpath = $"{subpath.Substring(0, index)}.html{appender}";
            }
            return subpath;
        }
    }
}
