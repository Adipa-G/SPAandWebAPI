﻿using Domain.Models;
using Domain.Models.Log;
using System.Collections.Generic;

namespace Domain.Interfaces.Repositories
{
    public interface ILogHttpViewRepository
    {
        List<string> GetAllLevels();
        ListResult<LogHttpListItemModel> GetLogHttp(LogHttpListRequest request);
    }
}