using System;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.Owin;
using NHibernate;
using Ninject;

namespace Web.Middleware
{
    public class CreateTransaction : OwinMiddleware
    {
        private readonly IKernel _kernel;

        public CreateTransaction(OwinMiddleware next, IKernel kernel) : base(next)
        {
            _kernel = kernel;
        }

        public override async Task Invoke(IOwinContext context)
        {
            var sessionFactory = (ISessionFactory)_kernel.GetService(typeof(ISessionFactory));
            var session = sessionFactory.OpenSession();

            _kernel.Rebind<ISession>().ToConstant(session).InThreadScope();
            var needTransaction = new[] { "POST", "PUT", "DELETE" }.Contains(context.Request.Method);

            if (needTransaction)
            {
                using (var transaction = session.BeginTransaction())
                {
                    try
                    {
                        await Next.Invoke(context);
                        transaction.Commit();
                    }
                    catch (Exception)
                    {
                        transaction.Rollback();
                        throw;
                    }
                }
            }
            else
            {
                await Next.Invoke(context);
            }
        }
    }
}