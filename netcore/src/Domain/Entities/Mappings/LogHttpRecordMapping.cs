using FluentNHibernate.Mapping;

namespace Domain.Entities.Mappings
{
    public class LogHttpRecordMapping : ClassMap<LogHttpRecord>
    {
        public LogHttpRecordMapping()
        {
            Id(x => x.Id).UnsavedValue(0).GeneratedBy.Native();
            Map(x => x.Level).Not.Nullable();
            Map(x => x.TrackingId);
            Map(x => x.CalledOn).Not.Nullable();
            Map(x => x.CallerAddress).Not.Nullable();
            Map(x => x.RequestIdentity).Length(256).Not.Nullable();
            Map(x => x.Verb).Length(50).Not.Nullable();
            Map(x => x.RequestUri).Length(1024).Not.Nullable();
            Map(x => x.RequestHeaders).CustomType("StringClob").CustomSqlType("ntext").Not.Nullable();
            Map(x => x.Request).CustomType("StringClob").CustomSqlType("ntext").Not.Nullable();
            Map(x => x.StatusCode);
            Map(x => x.ReasonPhrase);
            Map(x => x.ResponseHeaders).CustomType("StringClob").CustomSqlType("ntext");
            Map(x => x.Response).CustomType("StringClob").CustomSqlType("ntext");
            Map(x => x.CallDuration);
        }
    }
}
