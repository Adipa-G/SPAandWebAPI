using System.Net;
using System.Net.Http;
using System.Threading;
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
        public void GivenSuccessRegistration_WhenRegister_ThenReturnOK()
        {
            _userRepository.RegisterUser(Arg.Any<UserModel>()).Returns(new UserModel());

            var actionResult = _controller.Register(new UserModel());
            var result = actionResult.ExecuteAsync(new CancellationToken()).Result;

            Assert.AreEqual(HttpStatusCode.OK,result.StatusCode);
            _userRepository.Received(1).RegisterUser(Arg.Any<UserModel>());
        }

        [Test]
        public void GivenFailedRegistration_WhenRegister_ThenReturnBadRequest()
        {
            _userRepository.RegisterUser(Arg.Any<UserModel>()).Returns((UserModel)null);

            var actionResult = _controller.Register(new UserModel());
            var result = actionResult.ExecuteAsync(new CancellationToken()).Result;

            Assert.AreEqual(HttpStatusCode.InternalServerError, result.StatusCode);
            _userRepository.Received(1).RegisterUser(Arg.Any<UserModel>());
        }

        [Test]
        public void GivenUsers_WhenList_ThenReturnList()
        {
            _userRepository.List(Arg.Any<ListRequest>()).Returns(new ListResult<UserListItemModel>());

            var actionResult = _controller.List(new ListRequest());
            var result = actionResult.ExecuteAsync(new CancellationToken()).Result;

            Assert.AreEqual(HttpStatusCode.OK, result.StatusCode);
            _userRepository.Received(1).List(Arg.Any<ListRequest>());
        }

        [Test]
        public void GivenUsers_WhenDelete_ThenDelete()
        {
            _userRepository.Delete(Arg.Any<string>());

            var actionResult = _controller.Delete("abc");
            var result = actionResult.ExecuteAsync(new CancellationToken()).Result;

            Assert.AreEqual(HttpStatusCode.OK, result.StatusCode);
            _userRepository.Received(1).Delete("abc");
        }
    }
}
