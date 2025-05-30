namespace Domain.Models.Log;

public class LogMessageListItemModel
{
    public long Id { get; set; }
    public string LogTimestamp { get; set; }
    public string Logger { get; set; }
    public string Level { get; set; }
    public string Message { get; set; }
    public string StackTrace { get; set; }
}