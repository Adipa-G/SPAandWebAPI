using System.Net.Http.Headers;
using NUnit.Framework;
using NUnit.Framework.Legacy;

namespace E2E;

[TestFixture]
public class UserList : BaseTest
{
    private const int UserNumber = 2;

    [Test, Order(1)]
    public async Task Can_Get_User_List()
    {
        // Arrange
        await CreateUser(string.Format(Constants.Username,UserNumber));
        var accessToken = await Login(string.Format(Constants.Username, UserNumber));

        // Act
        var content = "{\"orderField\": \"UserName\", \"orderDirection\": \"Asc\", \"pageNumber\": \"1\", \"pageSize\": \"500\"}";
        var client = CreateHttpClient();
        client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", accessToken);
        var response = await client.PostAsync("/api/Account/list",
            new StringContent(content, new MediaTypeHeaderValue("application/json")));

        // Assert
        var results = await response.Content.ReadAsStringAsync();
        Assert.That(response.IsSuccessStatusCode, Is.True, "Response should be successful");
        StringAssert.Contains(string.Format(Constants.Username, UserNumber), results);
    }
}
