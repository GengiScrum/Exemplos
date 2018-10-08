using Prova1.Infra.Settings.Entities;
using System.Configuration;
using System.Diagnostics.CodeAnalysis;

namespace Prova1.Infra.Settings
{
    /// <summary>
    /// Fornece configurações transversais (para todas as layers) do Prova1Server
    /// </summary>
    [ExcludeFromCodeCoverage]
    public static class Prova1Settings
    {
        #region private fields
        static AuthenticationSettings _authSettings;
        #endregion private fields

        /// <summary>
        /// Fornece as configurações de autenticação que estão dispostas no Web.config
        /// </summary>
        public static AuthenticationSettings AuthenticationSettings
        {
            get
            {
                return _authSettings ?? ((AuthenticationSettings)ConfigurationManager.GetSection("Prova1/AuthenticationSettings"));
            }
        }
    }
}
