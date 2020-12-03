using System;
using System.Reflection;
using Domain.Entities;
using Domain.Interfaces.Config;
using Domain.Interfaces.Plumbing;
using FluentNHibernate.Cfg;
using FluentNHibernate.Cfg.Db;
using NHibernate;
using NHibernate.AspNet.Identity;
using NHibernate.Cache;
using NHibernate.Mapping.ByCode;
using NHibernate.Tool.hbm2ddl;

namespace Infrastructure.Plumbing
{
    public class NHibernateSessionFactory : INHibernateSessionFactory
    {
        private readonly IDatabaseConfig _databaseConfig;
        private readonly ISQLStatementInterceptor _interceptor;

        public NHibernateSessionFactory(IDatabaseConfig databaseConfig
            , ISQLStatementInterceptor interceptor)
        {
            _databaseConfig = databaseConfig;
            _interceptor = interceptor;
        }

        public ISessionFactory GetSessionFactory()
        {
            var factory = CreateConfiguration(CreateDatabaseConfiguration())
                .BuildSessionFactory();

            return factory;
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
            var identityMapper = new ModelMapper();
            identityMapper.AddMappings(Assembly
                .GetAssembly(typeof(IdentityUser)) // here we have to get access to the mapping
                .GetExportedTypes());
            var identityMapping = identityMapper.CompileMappingForAllExplicitlyAddedEntities();

            return Fluently.Configure()
                .Database(configurer)
                .Cache(c => c.UseQueryCache().ProviderClass<HashtableCacheProvider>())
                .Mappings(m => m.FluentMappings.AddFromAssemblyOf<ConfigSetting>())
                .ExposeConfiguration(x => x.SetInterceptor(_interceptor))
                .ExposeConfiguration(x => x.AddDeserializedMapping(identityMapping,null));
        }

        private  IPersistenceConfigurer CreateDatabaseConfiguration()
        {
            return SQLiteConfiguration
                .Standard
                .UsingFile($"{AppContext.BaseDirectory}//{_databaseConfig.DatabaseFileName}")
                .ShowSql();
        }

        private IPersistenceConfigurer CreateTestDatabaseConfiguration()
        {
            return SQLiteConfiguration
                .Standard
                .InMemory()
                .ShowSql();
        }
    }
}
