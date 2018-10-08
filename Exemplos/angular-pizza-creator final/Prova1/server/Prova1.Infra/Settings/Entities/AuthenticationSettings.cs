using System.Diagnostics.CodeAnalysis;

namespace Prova1.Infra.Settings.Entities
{
    /// <summary>
    /// Representa as configurações da autenticação providas pela Prova1.Infra
    /// </summary>
    [ExcludeFromCodeCoverage]
    public class AuthenticationSettings
    {
        /// <summary>
        /// Configuração de expiração do token de autenticação, em dias.
        /// </summary>
        public int TokenExpiration { get; set; }
    }
}
