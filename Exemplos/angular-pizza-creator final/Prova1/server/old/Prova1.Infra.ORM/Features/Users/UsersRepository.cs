using System;
using System.Linq;
using Prova1.Infra.ORM.Contexts;
using Prova1.Domain.Users;
using Prova1.Domain.Exceptions;

namespace Prova1.Infra.ORM.Features.Users
{
    /// <summary>
    ///  Repositório de usuários
    /// </summary>
    public class UsersRepository : IUserRepository
    {
        private readonly Prova1DbContext _context;

        public UsersRepository(Prova1DbContext context)
        {
            _context = context;
        }

        public User GetByCredentials(string email, string password)
        {
            var user = this._context.Users.FirstOrDefault(u => u.Email.Equals(email) && u.Password == password) ?? throw new InvalidCredentialsException();  
            return user;
        }
    }
}
