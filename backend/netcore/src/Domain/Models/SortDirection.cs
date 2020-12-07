using System.Runtime.Serialization;
using Newtonsoft.Json;
using Newtonsoft.Json.Converters;

namespace Domain.Models
{
    [JsonConverter(typeof(StringEnumConverter))]
    public enum SortDirection
    {
        [EnumMember(Value = "None")]
        None = 0,
        [EnumMember(Value = "Asc")]
        Asc = 1,
        [EnumMember(Value = "Desc")]
        Desc = 2
    }
}
