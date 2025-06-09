using System.Collections.Generic;

namespace Domain.Models;

public class ListResult<T> where T : class
{
    public IList<T> Results { get; set; }

    public int PageNumber { get; set; }

    public int PageSize { get; set; }

    public int TotalCount { get; set; }
}