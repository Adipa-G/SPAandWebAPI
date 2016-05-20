using System.Net;
using System.Net.Http;
using System.Threading;
using Domain.Interfaces.Repositories;
using Domain.Models;
using Domain.Models.Auth;
using Microsoft.AspNet.Mvc;
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
        }

        [Test]
        public void GivenSuccessRegistration_WhenRegister_ThenReturnOK()
        {
            _userRepository.RegisterUser(Arg.Any<UserModel>()).Returns(new UserModel() {UserName = "A"});

            var result = _controller.Register(new UserModel()) as HttpOkResult;

            Assert.AreEqual(HttpStatusCode.OK, (HttpStatusCode)result.StatusCode);
            _userRepository.Received(1).RegisterUser(Arg.Any<UserModel>());
        }

        [Test]
        public void GivenFailedRegistration_WhenRegister_ThenReturnBadRequest()
        {
            _userRepository.RegisterUser(Arg.Any<UserModel>()).Returns((UserModel)null);

            var result = _controller.Register(new UserModel()) as BadRequestResult;

            Assert.AreEqual(HttpStatusCode.BadRequest, (HttpStatusCode)result.StatusCode);
            _userRepository.Received(1).RegisterUser(Arg.Any<UserModel>());
        }

        [Test]
        public void GivenUsers_WhenList_ThenReturnList()
        {
            _userRepository.List(Arg.Any<ListRequest>()).Returns(new ListResult<UserListItemModel>());

            var result = _controller.List(new ListRequest()) as HttpOkObjectResult;

            Assert.AreEqual(HttpStatusCode.OK, (HttpStatusCode)result.StatusCode);
            _userRepository.Received(1).List(Arg.Any<ListRequest>());
        }

        [Test]
        public void GivenUsers_WhenDelete_ThenDelete()
        {
            _userRepository.Delete(Arg.Any<string>());

            var result = _controller.Delete("abc") as HttpOkObjectResult;

            Assert.AreEqual(HttpStatusCode.OK, (HttpStatusCode)result.StatusCode);
            _userRepository.Received(1).Delete("abc");
        }
    }
}
