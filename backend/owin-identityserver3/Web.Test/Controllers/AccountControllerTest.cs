using System.Net;
using System.Net.Http;
using System.Threading;
using System.Threading.Tasks;
using System.Web.Http;
using System.Web.Http.Controllers;
using System.Web.Http.Routing;
using Domain.Interfaces.Repositories;
using Domain.Models;
using Domain.Models.Auth;
using NSubstitute;
using NUnit.Framework;
using Web.Controllers;

namespace Web.Test.Controllers
{
    [TestFixture]
    public class AccountControllerTest
    {
        private IUserRepository _userRepository;

        private AccountController _controller;

        [SetUp]
        public void SetUp()
        {
            _userRepository = Substitute.For<IUserRepository>();

            _controller = new AccountController(_userRepository);
            _controller.ControllerContext = new HttpControllerContext(new HttpConfiguration(),
                new HttpRouteData(new HttpRoute()), new HttpRequestMessage());
        }

        [Test]
        public async Task GivenSuccessRegistration_WhenRegisterAsync_ThenReturnOK()
        {
            _userRepository.RegisterUserAsync(Arg.Any<UserModel>()).Returns(new UserModel());

            var actionResult = await _controller.RegisterAsync(new UserModel());
            var result = actionResult.ExecuteAsync(new CancellationToken()).Result;

            Assert.AreEqual(HttpStatusCode.OK,result.StatusCode);
            await _userRepository.Received(1).RegisterUserAsync(Arg.Any<UserModel>());
        }

        [Test]
        public async Task GivenFailedRegistration_WhenRegisterAsync_ThenReturnBadRequest()
        {
            _userRepository.RegisterUserAsync(Arg.Any<UserModel>()).Returns((UserModel)null);

            var actionResult = await _controller.RegisterAsync(new UserModel());
            var result = actionResult.ExecuteAsync(new CancellationToken()).Result;

            Assert.AreEqual(HttpStatusCode.InternalServerError, result.StatusCode);
            await _userRepository.Received(1).RegisterUserAsync(Arg.Any<UserModel>());
        }

        [Test]
        public async Task GivenUsers_WhenListAsync_ThenReturnList()
        {
            _userRepository.ListAsync(Arg.Any<ListRequest>()).Returns(new ListResult<UserListItemModel>());

            var actionResult = await _controller.ListAsync(new ListRequest());
            var result = actionResult.ExecuteAsync(new CancellationToken()).Result;

            Assert.AreEqual(HttpStatusCode.OK, result.StatusCode);
            await _userRepository.Received(1).ListAsync(Arg.Any<ListRequest>());
        }

        [Test]
        public async Task GivenUsers_WhenDeleteAsync_ThenDelete()
        {
            await _userRepository.DeleteAsync(Arg.Any<string>());

            var actionResult = await _controller.DeleteAsync("abc");
            var result = actionResult.ExecuteAsync(new CancellationToken()).Result;

            Assert.AreEqual(HttpStatusCode.OK, result.StatusCode);
            await _userRepository.Received(1).DeleteAsync("abc");
        }
    }
}
