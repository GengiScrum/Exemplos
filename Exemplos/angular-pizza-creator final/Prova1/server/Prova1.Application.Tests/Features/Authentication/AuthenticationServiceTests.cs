using FluentAssertions;
using Moq;
using NUnit.Framework;
using Prova1.Application.Features.Authentication;
using Prova1.Application.Tests.Initializer;
using Prova1.Common.Tests.Features.ObjectMothers;
using Prova1.Domain.Users;
using Prova1.Infra.Crypto;

namespace Prova1.Application.Tests.Features.Authentication
{
    [TestFixture]
    public class AuthenticationServiceTests : TestServiceBase
    {
        private IAuthenticationService _service;
        private Mock<IUserRepository> _userRepositoryFake;

        [SetUp]
        public void Initialize()
        {
            _userRepositoryFake = new Mock<IUserRepository>();
            _service = new AuthenticationService(_userRepositoryFake.Object);
        }

        #region Login 
        [Test]
        public void Auth_Service_Login_ShouldBeOk()
        {
            //Arrange
            var user = ObjectMother.GetValidUser();
            var pass = user.Password.GenerateHash();
            _userRepositoryFake.Setup(ur => ur.GetByCredentials(user.Email, pass)).Returns(user);
            //Action
            var userLogged = _service.Login(user.Email, user.Password);
            //Assert
            _userRepositoryFake.Verify(ur => ur.GetByCredentials(user.Email, pass), Times.Once);
            userLogged.Should().NotBeNull();
            userLogged.Should().Be(user);
        }
        #endregion
    }
}
