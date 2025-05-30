using System.Collections.Generic;
using System.Threading.Tasks;
using Domain.Models;
using Domain.Models.Log;

namespace Domain.Interfaces.Repositories;

public interface ILogViewRepository
{
    List<string> GetAllLevels();
    List<string> GetAllLoggers();
    Task<ListResult<LogMessageListItemModel>> GetLogMessagesAsync(LogMessageListRequest request);
    Task<ListResult<LogHttpListItemModel>> GetLogHttpAsync(LogHttpListRequest request);
}