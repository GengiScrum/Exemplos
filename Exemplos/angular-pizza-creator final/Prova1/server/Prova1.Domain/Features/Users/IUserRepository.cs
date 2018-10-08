using System;

namespace Prova1.Domain.Users
{
    /// <summary>
    /// Representa o repositório de usuários
    /// </summary>
    public interface IUserRepository
    {
        User GetByCredentials(string email, string password); 
    }
}
