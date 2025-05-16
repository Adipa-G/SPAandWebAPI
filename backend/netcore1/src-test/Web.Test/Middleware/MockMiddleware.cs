using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;

namespace Web.Test.Middleware
{
    public class MockMiddleware
    {
        public MockMiddleware()
        {
            InvokeCount = 0;
        }

        public bool ThrowException { get; set; }

        public int InvokeCount { get; set; }

        public Task Invoke(HttpContext context)
        {
            if (ThrowException)
            {
                throw new Exception();
            }
            InvokeCount++;
            return Task.FromResult(0);
        }
    }
}
