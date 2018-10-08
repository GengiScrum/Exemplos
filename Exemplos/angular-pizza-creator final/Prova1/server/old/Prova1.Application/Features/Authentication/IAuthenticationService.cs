using Prova1.Domain.Users;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Prova1.Application.Features.Authentication
{
    public interface IAuthenticationService
    {
        User Login(string email, string password);
    }
}
