using System;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using ISession = NHibernate.ISession;

namespace Web.Middleware
{
    public class CreateTransaction
    {
        private readonly RequestDelegate _next;

        public CreateTransaction(RequestDelegate next)
        {
            _next = next;
        }

        public async Task Invoke(HttpContext context, ISession session)
        {
            var needTransaction = new[] { "POST", "PUT", "DELETE" }.Contains(context.Request.Method);
            if (needTransaction)
            {
                using (var transaction = session.BeginTransaction())
                {
                    try
                    {
                        await _next.Invoke(context);
                        await session.FlushAsync();
                        await transaction.CommitAsync();
                    }
                    catch (Exception)
                    {
                        session.Clear();
                        await transaction.RollbackAsync();
                        throw;
                    }
                }
            }
            else
            {
                await _next.Invoke(context);
            }
        }
    }
}