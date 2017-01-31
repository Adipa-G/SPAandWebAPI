using System.Collections.Generic;
using Domain.Models;
using Domain.Models.Log;

namespace Domain.Interfaces.Repositories
{
    public interface ILogHttpViewRepository
    {
        List<string> GetAllLevels();
        ListResult<LogHttpListItemModel> GetLogHttp(LogHttpListRequest request);
    }
}
