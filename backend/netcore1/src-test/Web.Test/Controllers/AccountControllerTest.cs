using System.Linq;
using System.Net;
using System.Threading.Tasks;
using Domain.Models;
using Domain.Models.Auth;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.Sqlite;
using Microsoft.EntityFrameworkCore;
using NSubstitute;
using NUnit.Framework;
using Web.Controllers;
using Web.DataContext;
using Web.Models;

namespace Web.Test.Controllers
{
    [TestFixture]
    public class AccountControllerTest
    {
        protected SqliteConnection Connection;
        private UserManager<ApplicationUser> _userManager;
        private AccountController _controller;

        public async Task SetUpDbAsync()
        {
            Connection = new SqliteConnection("DataSource=:memory:");
            Connection.Open();

            var options = new DbContextOptionsBuilder<ApplicationDbContext>().UseSqlite(Connection).Options;

            await using (var context = new ApplicationDbContext(options))
            {
                await context.Database.EnsureCreatedAsync();
            }
        }

        public async Task TearDownDbAsync()
        {
            await Connection.CloseAsync();
        }

        protected ApplicationDbContext CreateContext()
        {
            var options = new DbContextOptionsBuilder<ApplicationDbContext>().UseSqlite(Connection).Options;
            return new ApplicationDbContext(options);
        }

        [SetUp]
        public void SetUp()
        {
            _userManager = Substitute.For<UserManager<ApplicationUser>>(
                Substitute.For<IUserStore<ApplicationUser>>(), 
                null, null, null, null, null, null, null, null);
            _controller = new AccountController(_userManager);
        }

        [Test]
        public async Task GivenUser_WhenRegisterAsyncAgain_ThenReturnConflict()
        {
            var userName = "testuser";
            _userManager.FindByNameAsync(userName).Returns(Task.FromResult(new ApplicationUser()));

            var result = await _controller.RegisterAsync(new UserModel()) as StatusCodeResult;

            Assert.That(result.StatusCode, Is.EqualTo((int)HttpStatusCode.Conflict));
        }

        [Test]
        public async Task GivenNewUser_WhenRegisterAsync_ThenRegister()
        {
            var userName = "testuser";
            var password = "password123";

            _userManager.FindByNameAsync(userName).Returns(Task.FromResult<ApplicationUser>(null));
            _userManager.CreateAsync(Arg.Any<ApplicationUser>(), password)
                .Returns(Task.FromResult(IdentityResult.Success));

            var result =
                await _controller.RegisterAsync(new UserModel() { UserName = userName, Password = password }) as
                    OkResult;

            Assert.That(result.StatusCode, Is.EqualTo((int)HttpStatusCode.OK));
            await _userManager.Received(1).CreateAsync(Arg.Any<ApplicationUser>(), password);
        }

        [Test]
        public async Task GivenUsers_WhenListAsync_ThenList()
        {
            await SetUpDbAsync();

            await using (var context = CreateContext())
            {
                context.Users.Add(new ApplicationUser { UserName = "testUser1" });
                await context.SaveChangesAsync();
            }

            await using (var context = CreateContext())
            {
                _userManager.Users.Returns(context.Users);
                var result = await _controller.ListAsync(new ListRequest(){PageSize = 10}) as OkObjectResult;

                Assert.That(result.StatusCode, Is.EqualTo((int)HttpStatusCode.OK));
                var users = result.Value as ListResult<UserListItemModel>;
                Assert.That(users, Is.Not.Null);
                Assert.That(users.Results.Count, Is.EqualTo(1));
                Assert.That(users.Results.Any(u => u.UserName == "testUser1"), Is.True);
            }
            await TearDownDbAsync();
        }

        [Test]
        public async Task GivenUsers_WhenListAsync_ThenSortAsc()
        {
            await SetUpDbAsync();

            await using (var context = CreateContext())
            {
                context.Users.Add(new ApplicationUser { UserName = "User B" });
                context.Users.Add(new ApplicationUser { UserName = "User A" });
                await context.SaveChangesAsync();
            }

            await using (var context = CreateContext())
            {
                _userManager.Users.Returns(context.Users);
                var result = await _controller.ListAsync(new ListRequest()
                    { PageSize = 10, OrderDirection = SortDirection.Asc, OrderField = "UserName"}) as OkObjectResult;

                Assert.That(result.StatusCode, Is.EqualTo((int)HttpStatusCode.OK));
                var users = result.Value as ListResult<UserListItemModel>;
                Assert.That(users, Is.Not.Null);
                Assert.That(users.Results.Count, Is.EqualTo(2));
                Assert.That(users.Results[0].UserName, Is.EqualTo("User A"));
                Assert.That(users.Results[1].UserName, Is.EqualTo("User B"));
            }
            await TearDownDbAsync();
        }

        [Test]
        public async Task GivenUsers_WhenListAsync_ThenSortDesc()
        {
            await SetUpDbAsync();

            await using (var context = CreateContext())
            {
                context.Users.Add(new ApplicationUser { UserName = "User A" });
                context.Users.Add(new ApplicationUser { UserName = "User B" });
                await context.SaveChangesAsync();
            }

            await using (var context = CreateContext())
            {
                _userManager.Users.Returns(context.Users);
                var result = await _controller.ListAsync(new ListRequest()
                    { PageSize = 10, OrderDirection = SortDirection.Desc, OrderField = "UserName" }) as OkObjectResult;

                Assert.That(result.StatusCode, Is.EqualTo((int)HttpStatusCode.OK));
                var users = result.Value as ListResult<UserListItemModel>;
                Assert.That(users, Is.Not.Null);
                Assert.That(users.Results.Count, Is.EqualTo(2));
                Assert.That(users.Results[0].UserName, Is.EqualTo("User B"));
                Assert.That(users.Results[1].UserName, Is.EqualTo("User A"));
            }
            await TearDownDbAsync();
        }

        [Test]
        public async Task GivenUsers_WhenListAsync_ThenPage()
        {
            await SetUpDbAsync();

            await using (var context = CreateContext())
            {
                context.Users.Add(new ApplicationUser { UserName = "User A" });
                context.Users.Add(new ApplicationUser { UserName = "User B" });
                await context.SaveChangesAsync();
            }

            await using (var context = CreateContext())
            {
                _userManager.Users.Returns(context.Users);
                var result = await _controller.ListAsync(new ListRequest()
                    { PageSize = 1, OrderDirection = SortDirection.Desc, OrderField = "UserName" }) as OkObjectResult;

                Assert.That(result.StatusCode, Is.EqualTo((int)HttpStatusCode.OK));
                var users = result.Value as ListResult<UserListItemModel>;
                Assert.That(users, Is.Not.Null);
                Assert.That(users.Results.Count, Is.EqualTo(1));
                Assert.That(users.Results[0].UserName, Is.EqualTo("User B"));
            }
            await TearDownDbAsync();
        }

        [Test]
        public async Task GivenUser_WhenDeleteAsync_ThenDelete()
        {
            var userName = "testuser";
            _userManager.FindByNameAsync(userName).Returns(Task.FromResult(new ApplicationUser()));

            var result = await _controller.DeleteAsync(userName) as OkResult;

            Assert.That(result.StatusCode, Is.EqualTo((int)HttpStatusCode.OK));
            await _userManager.Received(1).DeleteAsync(Arg.Any<ApplicationUser>());
        }

        [Test]
        public async Task GivenNonExistingUser_WhenDeleteAsync_ThenNotFound()
        {
            var userName = "testuser";
            _userManager.FindByNameAsync(userName).Returns(Task.FromResult<ApplicationUser>(null));

            var result = await _controller.DeleteAsync(userName) as NotFoundResult;

            Assert.That(result.StatusCode, Is.EqualTo((int)HttpStatusCode.NotFound));
            await _userManager.Received(0).DeleteAsync(Arg.Any<ApplicationUser>());
        }
    }
}
