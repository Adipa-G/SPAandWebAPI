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
        public override void TearDown()
        {
            base.TearDown();
        }

        [Test]
        public void GivenNoUser_WhenRegisterUser_ThenCreateUser()
        {
            var sut = new UserRepository(Session);
            sut.RegisterUser(new UserModel() {UserName = "a", Password = "abcdef",ConfirmPassword = "abcdef" });
            FlushAndClear();

            var user = sut.FindUser("a", "abcdef");

            Assert.IsNotNull(user);
        }
        
        [Test]
        public void GivenUser_WhenList_ThenList()
        {
            var context = new InfrastructureTestContext(Session);
            context.User("Test");
            Session.Flush();

            var sut = new UserRepository(Session);

            var results = sut.List(new ListRequest() { PageSize = 10, PageNumber = 1 });

            Assert.AreEqual(1, results.TotalCount);
            Assert.AreEqual("Test", results.Results[0].UserName);
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

            var sut = new UserRepository(Session);

            var results = sut.List(new ListRequest() { PageSize = 3, PageNumber = 2 });

            Assert.AreEqual(4, results.TotalCount);
            Assert.AreEqual("Test4", results.Results[0].UserName);
        }

        [Test]
        public void GivenUsers_WhenListWithOrdering_ThenSort()
        {
            var context = new InfrastructureTestContext(Session);
            context.User("A");
            context.User("B");
            context.User("C");
            Session.Flush();

            var sut = new UserRepository(Session);

            var results =
                sut.List(new ListRequest()
                {
                    PageSize = 3,
                    PageNumber = 1,
                    OrderField = "UserName",
                    OrderDirection = SortDirection.Desc
                });

            Assert.AreEqual(3, results.TotalCount);
            Assert.AreEqual("C", results.Results[0].UserName);
            Assert.AreEqual("A", results.Results[2].UserName);
        }

        [Test]
        public void GivenUser_WhenDelete_ThenDelete()
        {
            var context = new InfrastructureTestContext(Session);
            context.User("A");
            Session.Flush();

            var sut = new UserRepository(Session);
            
            var results = sut.List(new ListRequest() { PageSize = 3, PageNumber = 1 });
            Assert.AreEqual(1, results.TotalCount);

            sut.Delete("A");
            Session.Flush();

            results = sut.List(new ListRequest() {PageSize = 3, PageNumber = 1});
            Assert.AreEqual(0, results.TotalCount);
        }
    }
}
