using Domain.Entities;
using Domain.Interfaces.Config;
using Domain.Interfaces.Plumbing;
using FluentNHibernate.Cfg;
using FluentNHibernate.Cfg.Db;
using NHibernate;
using NHibernate.Cache;
using NHibernate.Tool.hbm2ddl;

namespace Infrastructure.Plumbing
{
    public class NHibernateSessionFactory : INHibernateSessionFactory
    {
        private readonly IDatabaseConfig _databaseConfig;
        private readonly ISQLStatementInterceptor _interceptor;

        private ISessionFactory _sessionFactory;

        public NHibernateSessionFactory(IDatabaseConfig databaseConfig
            , ISQLStatementInterceptor interceptor)
        {
            _databaseConfig = databaseConfig;
            _interceptor = interceptor;
        }

        public ISessionFactory GetSessionFactory()
        {
            if (_sessionFactory == null)
            {
                lock (this)
                {
                    if (_sessionFactory == null)
                    {
                        _sessionFactory = CreateConfiguration(CreateDatabaseConfiguration())
                            .BuildSessionFactory();
                    }
                }
            }
            return _sessionFactory;
        }

        public void Export(bool script, bool export, bool justDrop)
        {
            CreateConfiguration(CreateDatabaseConfiguration())
                .ExposeConfiguration(c => new SchemaExport(c).Execute(script, export, justDrop))
                .BuildConfiguration();
        }

        public void Update( bool useStdOut, bool doUpdate)
        {
            CreateConfiguration(CreateDatabaseConfiguration())
                .ExposeConfiguration(c => new SchemaUpdate(c).Execute(useStdOut, doUpdate))
                .BuildConfiguration();
        }

        public ISession GetTestSession()
        {
            var configuration = CreateConfiguration(CreateTestDatabaseConfiguration())
                .BuildConfiguration();

            var factory = configuration.BuildSessionFactory();

            var session = factory.OpenSession();
            new SchemaExport(configuration).Execute(true, true, false, session.Connection, null);

            return session;
        }

        private FluentConfiguration CreateConfiguration(IPersistenceConfigurer configurer)
        {
            return Fluently.Configure()
                .Database(configurer)
                .Cache(c => c.UseQueryCache().ProviderClass<HashtableCacheProvider>())
                .Mappings(m => m.FluentMappings.AddFromAssemblyOf<ConfigSetting>())
                .ExposeConfiguration(x => x.SetInterceptor(_interceptor));
        }

        private  IPersistenceConfigurer CreateDatabaseConfiguration()
        {
            if (!string.IsNullOrWhiteSpace(_databaseConfig.ConnectionString))
            {
                return MsSqlConfiguration
                .MsSql2012
                .ShowSql()
                .ConnectionString(_databaseConfig.ConnectionString);
            }

            return MsSqlConfiguration
                .MsSql2012
                .ShowSql()
                .ConnectionString(c => c
                    .Server(_databaseConfig.Server)
                    .Database(_databaseConfig.Database)
                    .Username(_databaseConfig.Username)
                    .Password(_databaseConfig.Password));
        }

        private IPersistenceConfigurer CreateTestDatabaseConfiguration()
        {
            return  SQLiteConfiguration
                .Standard
                .InMemory()
                .ShowSql();
        }
    }
}
