using System.Net.Http.Headers;
using NUnit.Framework;
using NUnit.Framework.Legacy;

namespace E2E;

[TestFixture]
public class LogHttp : BaseTest
{
    private const int UserNumber = 5;

    [Test, Order(1)]
    public async Task Can_Get_LogHttp()
    {
        await Task.Delay(2000);

        // Arrange
        await CreateUser(string.Format(Constants.Username, UserNumber));
        var accessToken = await Login(string.Format(Constants.Username, UserNumber));

        // Act
        var content = "{\"orderField\":\"CalledOn\",\"orderDirection\":\"Desc\",\"pageNumber\":1,\"pageSize\":100,\"logLevel\":\"\",\"trackingId\":\"\",\"fromDate\":\"\",\"toDate\":\"\"}";
        var client = CreateHttpClient();
        client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", accessToken);
        var response = await client.PostAsync("api/log/logHttp",
            new StringContent(content, new MediaTypeHeaderValue("application/json")));

        // Assert
        var results = await response.Content.ReadAsStringAsync();
        Assert.That(response.IsSuccessStatusCode, Is.True, "Response should be successful");
        StringAssert.Contains("requestUri", results);
    }
}
