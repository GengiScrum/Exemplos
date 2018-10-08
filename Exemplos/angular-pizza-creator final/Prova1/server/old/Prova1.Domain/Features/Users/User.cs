namespace Prova1.Domain.Users
{
    /// <summary>
    /// Representa um User como entidade de negócio
    /// </summary>
    public class User : Entity
    {
        public string Name { get; set; }

        public string Email { get; set; }

        public string Password { get; set; }
    }
}
