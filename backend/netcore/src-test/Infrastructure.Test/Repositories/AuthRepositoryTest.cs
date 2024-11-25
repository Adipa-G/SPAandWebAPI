using System.Threading.Tasks;
using Domain.Models;
using Domain.Models.Auth;
using Infrastructure.Repositories;
using Infrastructure.Test.TestContext;
using NUnit.Framework;

namespace Infrastructure.Test.Repositories
{
    [TestFixture]
    public class AuthRepositoryTest : RepositoryTestBase
    {
        [OneTimeSetUp]
        protected override void OneTimeSetUp()
        {
            base.OneTimeSetUp();
        }

        [OneTimeTearDown]
        protected override void OneTimeTearDown()
        {
            base.OneTimeTearDown();
        }

        [SetUp]
        protected override void SetUp()
        {
            base.SetUp();
        }

        [TearDown]
        public override async Task TearDownAsync()
        {
            await base.TearDownAsync();
        }

        [Test]
        public async Task GivenNoUser_WhenRegisterUserAsync_ThenCreateUser()
        {
            var sut = new UserRepository(Session);
            await sut.RegisterUserAsync(new UserModel() {UserName = "a", Password = "abcdef",ConfirmPassword = "abcdef" });
            await FlushAndClearAsync();

            var user = await sut.FindUserAsync("a", "abcdef");

            Assert.That(user, Is.Not.Null);
        }
        
        [Test]
        public async Task GivenUser_WhenListAsync_ThenList()
        {
            var context = new InfrastructureTestContext(Session);
            context.User("Test");
            await Session.FlushAsync();

            var sut = new UserRepository(Session);

            var results = await sut.ListAsync(new ListRequest() { PageSize = 10, PageNumber = 1 });

            Assert.That(results.TotalCount, Is.EqualTo(1));
            Assert.That(results.Results[0].UserName, Is.EqualTo("Test"));
        }

        [Test]
        public async Task GivenUsers_WhenListAsyncWithPage_ThenPage()
        {
            var context = new InfrastructureTestContext(Session);
            context.User("Test1");
            context.User("Test2");
            context.User("Test3");
            context.User("Test4");
            await Session.FlushAsync();

            var sut = new UserRepository(Session);

            var results = await sut.ListAsync(new ListRequest() { PageSize = 3, PageNumber = 2 });

            Assert.That(results.TotalCount, Is.EqualTo(4));
            Assert.That(results.Results[0].UserName, Is.EqualTo("Test4"));
        }

        [Test]
        public async Task GivenUsers_WhenListAsyncWithOrdering_ThenSort()
        {
            var context = new InfrastructureTestContext(Session);
            context.User("A");
            context.User("B");
            context.User("C");
            await Session.FlushAsync();

            var sut = new UserRepository(Session);

            var results =
                await sut.ListAsync(new ListRequest()
                {
                    PageSize = 3,
                    PageNumber = 1,
                    OrderField = "UserName",
                    OrderDirection = SortDirection.Desc
                });

            Assert.That(results.TotalCount, Is.EqualTo(3));
            Assert.That(results.Results[0].UserName, Is.EqualTo("C"));
            Assert.That(results.Results[2].UserName, Is.EqualTo("A"));
        }

        [Test]
        public async Task GivenUser_WhenDeleteAsync_ThenDelete()
        {
            var context = new InfrastructureTestContext(Session);
            context.User("A");
            await Session.FlushAsync();

            var sut = new UserRepository(Session);
            
            var results = await sut.ListAsync(new ListRequest() { PageSize = 3, PageNumber = 1 });
            Assert.That(results.TotalCount, Is.EqualTo(1));

            await sut.DeleteAsync("A");
            await Session.FlushAsync();

            results = await sut.ListAsync(new ListRequest() {PageSize = 3, PageNumber = 1});
            Assert.That(results.TotalCount, Is.EqualTo(0));
        }
    }
}
