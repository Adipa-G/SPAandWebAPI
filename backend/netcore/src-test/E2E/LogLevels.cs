using System.Net.Http.Headers;
using NUnit.Framework;
using NUnit.Framework.Legacy;

namespace E2E;

[TestFixture]
public class LogLevels : BaseTest
{
    private const int UserNumber = 3;

    [Test, Order(1)]
    public async Task Can_Get_Log_Levels()
    {
        // Arrange
        await CreateUser(string.Format(Constants.Username,UserNumber));
        var accessToken = await Login(string.Format(Constants.Username, UserNumber));

        // Act
        var client = CreateHttpClient();
        client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", accessToken);
        var response = await client.GetAsync("api/log/levels");

        // Assert
        var results = await response.Content.ReadAsStringAsync();
        Assert.That(response.IsSuccessStatusCode, Is.True, "Response should be successful");
        StringAssert.Contains("Warn", results);
    }
}
