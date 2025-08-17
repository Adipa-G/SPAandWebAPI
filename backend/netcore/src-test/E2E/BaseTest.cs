using Microsoft.Extensions.Configuration;

namespace E2E;

public class BaseTest
{
    protected HttpClient CreateHttpClient()
    {
        var config = new ConfigurationBuilder()
            .AddJsonFile("appsettings.json")
            .Build();

        return new HttpClient
        {
            BaseAddress = new Uri(config["ApiURL"]),
        };
    }

    protected async Task<bool> CreateUser(string userName)
    {
        var content = $"{{\"userName\":\"{userName}\",\"password\":\"{Constants.Password}\",\"confirmPassword\":\"{Constants.Password}\"}}";

        var client = CreateHttpClient();
        var request = new HttpRequestMessage(HttpMethod.Post, "/api/account/register");
        request.Content = new StringContent(content, System.Text.Encoding.UTF8, "application/json");
        var response = await client.SendAsync(request);
        return response.IsSuccessStatusCode;
    }

    protected async Task<string> Login(string userName)
    {
        var keyValues = new[]
        {
            new KeyValuePair<string, string>("grant_type", "password"),
            new KeyValuePair<string, string>("username", userName),
            new KeyValuePair<string, string>("password", Constants.Password),
            new KeyValuePair<string, string>("client_id", "default"),
            new KeyValuePair<string, string>("scope", "openid")
        };

        var client = CreateHttpClient();
        var request = new HttpRequestMessage(HttpMethod.Post, "/connect/token")
        {
            Content = new FormUrlEncodedContent(keyValues)
        };

        var response = await client.SendAsync(request);
        var responseContent = await response.Content.ReadAsStringAsync();

        var json = System.Text.Json.JsonDocument.Parse(responseContent);
        return json.RootElement.TryGetProperty("access_token", out var accessToken) ? accessToken.GetString() : null;
    }
}
