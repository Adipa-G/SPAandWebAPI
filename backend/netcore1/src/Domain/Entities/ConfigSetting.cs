namespace Domain.Entities
{
    public class ConfigSetting
    {
        public virtual long Id { get; set; }
        public virtual string ConfigKey { get; set; }
        public virtual string ConfigValue { get; set; }
    }
}
