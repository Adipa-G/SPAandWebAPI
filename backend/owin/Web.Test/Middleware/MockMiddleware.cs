using Microsoft.Owin;
using System;
using System.Threading.Tasks;

namespace Web.Test.Middleware
{
    public class MockMiddleware : OwinMiddleware
    {
        public MockMiddleware() : base(null)
        {
            InvokeCount = 0;
        }

        public bool ThrowException { get; set; }

        public int InvokeCount { get; set; }

        public override Task Invoke(IOwinContext context)
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