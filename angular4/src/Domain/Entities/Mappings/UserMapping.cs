using FluentNHibernate.Mapping;

namespace Domain.Entities.Mappings
{
    public class UserMapping : ClassMap<User>
    {
        public UserMapping()
        {
            Id(x => x.UserId).UnsavedValue(0).GeneratedBy.Native();
            Map(x => x.UserName).Length(256).Not.Nullable();
            Map(x => x.Password).Length(512).Not.Nullable();
        }
    }
}
