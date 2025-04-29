using System.Net;
using System.Net.Http;
using System.Threading;
using System.Web.Http;
using System.Web.Http.Controllers;
using System.Web.Http.Routing;
using Domain.Interfaces.Repositories;
using Domain.Models;
using Domain.Models.Auth;
using Microsoft.AspNet.Identity;
using NSubstitute;
using NUnit.Framework;
using Web.Controllers;

namespace Web.Test.Controllers
{
    [TestFixture]
    public class AccountControllerTest
    {
        private IAuthRepository _authRepository;

        private AccountController _controller;

        [SetUp]
        public void SetUp()
        {
            _authRepository = Substitute.For<IAuthRepository>();

            _controller = new AccountController(_authRepository);
            _controller.ControllerContext = new HttpControllerContext(new HttpConfiguration(),
                new HttpRouteData(new HttpRoute()), new HttpRequestMessage());
        }

        [Test]
        public void GivenSuccessRegistration_WhenRegister_ThenReturnOK()
        {
            _authRepository.RegisterUser(Arg.Any<UserModel>()).Returns(IdentityResult.Success);

            var actionResult = _controller.Register(new UserModel());
            var result = actionResult.ExecuteAsync(new CancellationToken()).Result;

            Assert.That(result.StatusCode, Is.EqualTo(HttpStatusCode.OK));
            _authRepository.Received(1).RegisterUser(Arg.Any<UserModel>());
        }

        [Test]
        public void GivenFailedRegistration_WhenRegister_ThenReturnBadRequest()
        {
            _authRepository.RegisterUser(Arg.Any<UserModel>()).Returns(new IdentityResult(new[] {"Error"}));

            var actionResult = _controller.Register(new UserModel());
            var result = actionResult.ExecuteAsync(new CancellationToken()).Result;

            Assert.That(result.StatusCode, Is.EqualTo(HttpStatusCode.BadRequest));
            _authRepository.Received(1).RegisterUser(Arg.Any<UserModel>());
        }

        [Test]
        public void GivenUsers_WhenList_ThenReturnList()
        {
            _authRepository.List(Arg.Any<ListRequest>()).Returns(new ListResult<UserListItemModel>());

            var actionResult = _controller.List(new ListRequest());
            var result = actionResult.ExecuteAsync(new CancellationToken()).Result;

            Assert.That(result.StatusCode, Is.EqualTo(HttpStatusCode.OK));
            _authRepository.Received(1).List(Arg.Any<ListRequest>());
        }

        [Test]
        public void GivenUsers_WhenDelete_ThenDelete()
        {
            _authRepository.Delete(Arg.Any<string>());

            var actionResult = _controller.Delete("abc");
            var result = actionResult.ExecuteAsync(new CancellationToken()).Result;

            Assert.That(result.StatusCode, Is.EqualTo(HttpStatusCode.OK));
            _authRepository.Received(1).Delete("abc");
        }
    }
}
