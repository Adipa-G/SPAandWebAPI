using System.Runtime.Serialization;

namespace Domain.Models;

public enum SortDirection
{
    [EnumMember(Value = "None")]
    None = 0,
    [EnumMember(Value = "Asc")]
    Asc = 1,
    [EnumMember(Value = "Desc")]
    Desc = 2
}