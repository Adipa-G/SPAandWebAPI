namespace Domain.Interfaces.Repositories
{
    public interface IConfigRepository
    {
        T GetSettingValue<T>(string key, T defaultValue);
        void SetSettingValue<T>(string key, T value);
    }
}
