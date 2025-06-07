using System.Text.Json;
using Domain.Enum;
using Domain.Models.Log;
using Infrastructure.Converters;
using NUnit.Framework;

namespace Infrastructure.Test.Converters;

[TestFixture]
public class IntNullableEnumConverterTest
{
    private JsonSerializerOptions _options = new()
    {
        Converters =
        {
            new IntNullableEnumConverter<Domain.Enum.LogLevel?>()
        }
    };

    [Test]
    public void GivenNullEnum_WhenSerialise_ThenSerialise()
    {
        var model = new LogMessageListRequest();

        var serialised = JsonSerializer.Serialize(model, _options);

        Assert.That(serialised.Contains("\"LogLevel\":null"), "LogLevel should be serialized as null");
    }

    [Test]
    public void GivenEnum_WhenSerialise_ThenSerialise()
    {
        var model = new LogMessageListRequest(){LogLevel = LogLevel.Debug};

        var serialised = JsonSerializer.Serialize(model, _options);

        Assert.That(serialised.Contains("\"LogLevel\":\"Debug\""), "LogLevel should be serialized as Debug");
    }

    [Test]
    public void GivenNullEnum_WhenDeserialise_ThenDeserialise()
    {
        var req = "{\"Logger\":null,\"LogLevel\":\"\",\"FromDate\":null,\"ToDate\":null,\"PageNumber\":0,\"PageSize\":0,\"OrderField\":null,\"OrderDirection\":0}";

        var deserialised = JsonSerializer.Deserialize<LogMessageListRequest>(req, _options);

        Assert.That(deserialised.LogLevel, Is.Null);
    }

    [Test]
    public void GivenEnum_WhenDeserialise_ThenDeserialise()
    {
        var req = "{\"Logger\":null,\"LogLevel\":\"Debug\",\"FromDate\":null,\"ToDate\":null,\"PageNumber\":0,\"PageSize\":0,\"OrderField\":null,\"OrderDirection\":0}";

        var deserialised = JsonSerializer.Deserialize<LogMessageListRequest>(req, _options);

        Assert.That(deserialised.LogLevel, Is.EqualTo(LogLevel.Debug));
    }
}
