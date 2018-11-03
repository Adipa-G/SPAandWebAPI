namespace Domain.Models
{
    public class ListRequest
    {
        public int PageNumber { get; set; }

        public int PageSize { get; set; }

        public string OrderField { get; set; }

        public SortDirection OrderDirection { get; set; }
    }
}
