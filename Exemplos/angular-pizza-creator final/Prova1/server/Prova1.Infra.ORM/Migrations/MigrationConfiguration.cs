using Prova1.Domain.Users;
using Prova1.Infra.Crypto;
using Prova1.Infra.ORM.Contexts;
using System.Data.Entity.Migrations;
using System.Diagnostics.CodeAnalysis;
using System.Linq;

namespace Prova1.Infra.ORM.Initializer
{
    /// <summary>
    /// Define as configurações para realização da migração do banco conforme alterações no o
    /// </summary>
    [ExcludeFromCodeCoverage]
    public class MigrationConfiguration : DbMigrationsConfiguration<Prova1DbContext>
    {
        public MigrationConfiguration()
        {
            AutomaticMigrationsEnabled = false;
        }

        protected override void Seed(Prova1DbContext context)
        {
            var password = "321";

            var _user = new User()
            {
                Id = 1,
                Name = "Admin",
                Email = "admin@admin.com",
                Password = password.GenerateHash(),
            };

            var foundUser = context.Users.Where(u => u.Email == _user.Email).FirstOrDefault();
            if (foundUser == null)
                context.Users.Add(_user);
            else
                context.Entry(foundUser).CurrentValues.SetValues(_user);
            context.SaveChanges();
        }
    }
}
