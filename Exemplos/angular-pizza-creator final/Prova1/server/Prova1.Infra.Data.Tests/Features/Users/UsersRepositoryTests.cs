using Effort;
using FluentAssertions;
using NUnit.Framework;
using Prova1.Common.Tests.Features.ObjectMothers;
using Prova1.Domain.Exceptions;
using Prova1.Domain.Users;
using Prova1.Infra.Data.Tests.Context;
using Prova1.Infra.ORM.Features.Users;
using Prova1.Infra.ORM.Tests.Initializer;
using System;

namespace Prova1.Infra.ORM.Tests.Features.Users
{
    public class UsersRepositoryTests : EffortTestBase
    {
        private FakeDbContext _ctx;
        private UserRepository _repository;
        private User _user;
        private User _userSeed;

        [SetUp]
        public void Setup()
        {
            var connection = DbConnectionFactory.CreatePersistent(Guid.NewGuid().ToString());
            _ctx = new FakeDbContext(connection);
            _repository = new UserRepository(_ctx);
            _user = ObjectMother.GetValidUser();
            //Seed
            _userSeed = ObjectMother.GetValidUser();
            _ctx.Users.Add(_userSeed);
            _ctx.SaveChanges();
        }

        #region GetByCredentials
        [Test]
        public void Users_Repository_GetByCredentials_ShouldBeOk()
        {
            //Action
            var userRegistered = _repository.GetByCredentials(_user.Email, _user.Password);
            //Assert
            userRegistered.Should().NotBeNull();
            userRegistered.Should().Be(_user);
            userRegistered.Email.Should().Be(_user.Email);
            userRegistered.Password.Should().Be(_user.Password);
        }

        [Test]
        public void Users_Repository_GetByCredentials_ShouldBeHandleInvalidCredentialsException()
        {
            //Action
            var invalidUser = ObjectMother.GetInvalidUser();
            Action action = () =>  _repository.GetByCredentials(invalidUser.Email, invalidUser.Password);
            //Assert
            action.Should().ThrowExactly<InvalidCredentialsException>();
        }

        #endregion
    }
}
