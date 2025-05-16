using System.ComponentModel.DataAnnotations.Schema;

namespace Domain.Entities
{
    [Table("ConfigSettings")]
    public class ConfigSetting
    {
        public virtual long Id { get; set; }
        public virtual string ConfigKey { get; set; }
        public virtual string ConfigValue { get; set; }
    }
}
