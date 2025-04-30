using Domain.Interfaces.Plumbing;
using NHibernate;
using Ninject;
using Ninject.Activation;

namespace Infrastructure.Plumbing
{
    public class NhibernateSessionFactoryProvider : Provider<ISessionFactory>
    {
        protected override ISessionFactory CreateInstance(IContext context)
        {
            var sessionFactory = context.Kernel.Get<INHibernateSessionFactory>();
            return sessionFactory.GetSessionFactory();
        }
    }
}