using System.Net.Http.Headers;
using NUnit.Framework;
using NUnit.Framework.Legacy;

namespace E2E;

[TestFixture]
public class LogMessages : BaseTest
{
    private const int UserNumber = 5;

    [Test, Order(1)]
    public async Task Can_Get_LogMessages()
    {
        // Arrange
        await CreateUser(string.Format(Constants.Username, UserNumber));
        var accessToken = await Login(string.Format(Constants.Username, UserNumber));

        // Act
        var content = "{\"orderField\":\"LogTimestamp\",\"orderDirection\":\"Desc\",\"pageNumber\":1,\"pageSize\":100,\"logLevel\":\"\",\"logger\":\"\",\"fromDate\":\"\",\"toDate\":\"\"}";
        var client = CreateHttpClient();
        client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", accessToken);
        var response = await client.PostAsync("api/log/logMessages",
            new StringContent(content, new MediaTypeHeaderValue("application/json")));

        // Assert
        var results = await response.Content.ReadAsStringAsync();
        Assert.That(response.IsSuccessStatusCode, Is.True, "Response should be successful");
        StringAssert.Contains("logTimestamp", results);
    }
}
