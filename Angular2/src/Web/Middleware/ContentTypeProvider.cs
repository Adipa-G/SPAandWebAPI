using System;
using Microsoft.AspNet.StaticFiles;

namespace Web.Middleware
{
    public class ContentTypeProvider : IContentTypeProvider
    {
        private FileExtensionContentTypeProvider provider;

        public ContentTypeProvider()
        {
            provider = new FileExtensionContentTypeProvider();
        }

        public bool TryGetContentType(string subpath, out string contentType)
        {
            subpath = DetectHtml5Routing(subpath);
            return provider.TryGetContentType(subpath, out contentType);
        }

        private static string DetectHtml5Routing(string subpath)
        {
            var index = subpath.ToLower().IndexOf(".html/", StringComparison.Ordinal);
            if (index > 0)
            {
                subpath = $"{subpath.Substring(0, index)}.html";
            }
            return subpath;
        }
    }
}
