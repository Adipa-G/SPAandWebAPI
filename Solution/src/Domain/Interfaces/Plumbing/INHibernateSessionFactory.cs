using NHibernate;

namespace Domain.Interfaces.Plumbing
{
    public interface INHibernateSessionFactory
    {
        ISessionFactory GetSessionFactory();

        void Export(bool script, bool export, bool justDrop);

        void Update(bool useStdOut, bool doUpdate);
    }
}
