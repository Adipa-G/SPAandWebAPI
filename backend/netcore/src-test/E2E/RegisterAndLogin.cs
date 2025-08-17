using NUnit.Framework;

namespace E2E;

[TestFixture]
public class RegisterAndLogin : BaseTest
{
    private const int UserNumber = 1;

    [Test, Order(1)]
    public async Task Can_Create_User()
    {
        // Act
        var result = await CreateUser(string.Format(Constants.Username,UserNumber));
    
        // Assert
        Assert.That(result, Is.Not.False);
    }


    [Test, Order(2)]
    public async Task Can_Get_Access_Token()
    {
        // Act
        var accessToken = await Login(string.Format(Constants.Username, UserNumber));

        // Assert
        Assert.That(accessToken, Is.Not.Empty);
    }
}
