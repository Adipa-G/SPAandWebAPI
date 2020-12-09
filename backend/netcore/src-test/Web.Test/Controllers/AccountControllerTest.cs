using System.Net;
using System.Net.Http;
using System.Threading;
using System.Threading.Tasks;
using Domain.Interfaces.Repositories;
using Domain.Models;
using Domain.Models.Auth;
using Microsoft.AspNetCore.Mvc;
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
        public async Task GivenSuccessRegistration_WhenRegisterAsync_ThenReturnOK()
        {
            _userRepository.RegisterUserAsync(Arg.Any<UserModel>()).Returns(new UserModel() {UserName = "A"});

            var result = await _controller.RegisterAsync(new UserModel()) as OkResult;

            Assert.AreEqual(HttpStatusCode.OK, (HttpStatusCode)result.StatusCode);
            await _userRepository.Received(1).RegisterUserAsync(Arg.Any<UserModel>());
        }

        [Test]
        public async Task GivenFailedRegistration_WhenRegisterAsync_ThenReturnBadRequest()
        {
            _userRepository.RegisterUserAsync(Arg.Any<UserModel>()).Returns((UserModel)null);

            var result = await _controller.RegisterAsync(new UserModel()) as BadRequestResult;

            Assert.AreEqual(HttpStatusCode.BadRequest, (HttpStatusCode)result.StatusCode);
            await _userRepository.Received(1).RegisterUserAsync(Arg.Any<UserModel>());
        }

        [Test]
        public async Task GivenUsers_WhenListAsync_ThenReturnList()
        {
            _userRepository.ListAsync(Arg.Any<ListRequest>()).Returns(new ListResult<UserListItemModel>());

            var result = await _controller.ListAsync(new ListRequest()) as OkObjectResult;

            Assert.AreEqual(HttpStatusCode.OK, (HttpStatusCode)result.StatusCode);
            await _userRepository.Received(1).ListAsync(Arg.Any<ListRequest>());
        }

        [Test]
        public async Task GivenUsers_WhenDeleteAsync_ThenDelete()
        {
            var result = await _controller.DeleteAsync("abc") as OkResult;

            Assert.AreEqual(HttpStatusCode.OK, (HttpStatusCode)result.StatusCode);
            await _userRepository.Received(1).DeleteAsync("abc");
        }
    }
}
