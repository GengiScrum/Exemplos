using Prova1.Domain.Users;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Prova1.Common.Tests.Features.ObjectMothers
{
    public static partial class ObjectMother
    {
        public static User GetValidUser()
        {
            return new User()
            {
                Id = 1,
                Name = "teste",
                Password = "teste",
                Email = "teste@teste.com"
            };
        }

        public static User GetInvalidUser()
        {
            return new User()
            {
                Id = 1,
                Name = "teste 2",
                Password = "teste2",
                Email = "teste2@teste.com"
            };
        }
    }
}
