using FluentNHibernate.Mapping;

namespace Domain.Entities.Mappings
{
    public class LogMessageRecordMapping : ClassMap<LogMessageRecord>
    {
        public LogMessageRecordMapping()
        {
            Id(x => x.Id).UnsavedValue(0).GeneratedBy.Native();
            Map(x => x.LogTimestamp).Not.Nullable();
            Map(x => x.Level).Not.Nullable();
            Map(x => x.Logger).Length(256).Not.Nullable();
            Map(x => x.Message).CustomType("StringClob").CustomSqlType("ntext").Not.Nullable();
            Map(x => x.StackTrace).CustomType("StringClob").CustomSqlType("ntext");
        }
    }
}