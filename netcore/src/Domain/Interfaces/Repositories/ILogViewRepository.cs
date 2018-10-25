using System.Collections.Generic;
using Domain.Models;
using Domain.Models.Log;

namespace Domain.Interfaces.Repositories
{
    public interface ILogViewRepository
    {
        List<string> GetAllLevels();
        List<string> GetAllLoggers();
        ListResult<LogMessageListItemModel> GetLogMessages(LogMessageListRequest request);
        ListResult<LogHttpListItemModel> GetLogHttp(LogHttpListRequest request);
    }
}
