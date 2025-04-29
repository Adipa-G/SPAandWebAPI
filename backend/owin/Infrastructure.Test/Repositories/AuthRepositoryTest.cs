using Domain.Models;
using Domain.Models.Auth;
using Infrastructure.Repositories;
using Infrastructure.Test.TestContext;
using Microsoft.AspNet.Identity;
using NHibernate.AspNet.Identity;
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
        public override void TearDown()
        {
            base.TearDown();
        }

        [Test]
        public void GivenNoUser_WhenRegisterUser_ThenCreateUser()
        {
            var sut = new AuthRepository(Session,new UserManager<IdentityUser>(new UserStore<IdentityUser>(Session)));
            var result = sut.RegisterUser(new UserModel() {UserName = "a", Password = "abcdef",ConfirmPassword = "abcdef" });
            FlushAndClear();

            var user = sut.FindUser("a", "abcdef");

            Assert.That(result.Succeeded, Is.True);
            Assert.That(user, Is.Not.Null);
        }

        [Test]
        public void GivenUser_WhenAddLogin_ThenAddLogin()
        {
            var sut = new AuthRepository(Session, new UserManager<IdentityUser>(new UserStore<IdentityUser>(Session)));
            sut.RegisterUser(new UserModel() { UserName = "a", Password = "abcdef", ConfirmPassword = "abcdef" });
            FlushAndClear();
            var user = sut.FindUser("a", "abcdef");

            sut.AddLogin(user.Id, new UserLoginInfo("facebook", "key1"));
            FlushAndClear();

            user = sut.Find(new UserLoginInfo("facebook","key1"));
            Assert.That(user, Is.Not.Null);
        }

        [Test]
        public void GivenUser_WhenList_ThenList()
        {
            var context = new InfrastructureTestContext(Session);
            context.User("Test");
            Session.Flush();

            var sut = new AuthRepository(Session, new UserManager<IdentityUser>(new UserStore<IdentityUser>(Session)));

            var results = sut.List(new ListRequest() { PageSize = 10, PageNumber = 1 });

            Assert.That(results.TotalCount, Is.EqualTo(1));
            Assert.That(results.Results[0].UserName, Is.EqualTo("Test"));
        }

        [Test]
        public void GivenUsers_WhenListWithPage_ThenPage()
        {
            var context = new InfrastructureTestContext(Session);
            context.User("Test1");
            context.User("Test2");
            context.User("Test3");
            context.User("Test4");
            Session.Flush();

            var sut = new AuthRepository(Session, new UserManager<IdentityUser>(new UserStore<IdentityUser>(Session)));

            var results = sut.List(new ListRequest() { PageSize = 3, PageNumber = 2 });

            Assert.That(results.TotalCount, Is.EqualTo(4));
            Assert.That(results.Results[0].UserName, Is.EqualTo("Test4"));
        }

        [Test]
        public void GivenUsers_WhenListWithOrdering_ThenSort()
        {
            var context = new InfrastructureTestContext(Session);
            context.User("A");
            context.User("B");
            context.User("C");
            Session.Flush();

            var sut = new AuthRepository(Session, new UserManager<IdentityUser>(new UserStore<IdentityUser>(Session)));

            var results =
                sut.List(new ListRequest()
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
        public void GivenUser_WhenDelete_ThenDelete()
        {
            var sut = new AuthRepository(Session, new UserManager<IdentityUser>(new UserStore<IdentityUser>(Session)));
            sut.Create(new IdentityUser("User1"));
            Session.Flush();

            var results = sut.List(new ListRequest() { PageSize = 3, PageNumber = 1 });
            Assert.That(results.TotalCount, Is.EqualTo(1));

            sut.Delete("User1");
            Session.Flush();

            results = sut.List(new ListRequest() {PageSize = 3, PageNumber = 1});
            Assert.That(results.TotalCount, Is.EqualTo(0));
        }
    }
}
