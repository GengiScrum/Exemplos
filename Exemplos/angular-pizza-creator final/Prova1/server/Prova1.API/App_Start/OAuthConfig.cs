using Microsoft.Owin.Security;
using Microsoft.Owin.Security.DataHandler.Encoder;
using Microsoft.Owin.Security.Jwt;
using Owin;
using System.Configuration;
using System.Diagnostics.CodeAnalysis;

namespace Prova1.API.App_Start
{
    /// <summary>
    /// Classe para a configuração da Autenticação da API
    /// </summary>
    public static class OAuthConfig
    {
        /// <summary>
        /// Método para realizar a configuração do OAuth para a Autenticação.
        /// </summary>
        [ExcludeFromCodeCoverage]
        public static void ConfigureOAuth(IAppBuilder app)
        {
            var issuer = ConfigurationManager.AppSettings["AuthApiUrl"];
            // Essas chaves são geradas no projeto Prova1.Auth
            // client é publica e identifica uma aplicação que usa essa API (client)
            // secret é a chave privada que será usado no algoritmo para verificação do token
            var client = "3b9a77fb35a54e40815f4fa8641234c5";
            var secret = TextEncodings.Base64Url.Decode("nbwQ3HDjLNvOnuNyQkBxADEVEwGBEovFZKakYoBQRQo");
            // Controladores da API com o atributo [Authorize] ou [CustomAuthorize] irão ser validados via JWT
            app.UseJwtBearerAuthentication(
                new JwtBearerAuthenticationOptions
                {
                    AuthenticationMode = AuthenticationMode.Active,
                    AllowedAudiences = new[] { client },
                    IssuerSecurityTokenProviders = new IIssuerSecurityTokenProvider[]
                    {
                        new SymmetricKeyIssuerSecurityTokenProvider(issuer, secret)
                    },
                    Realm = "Prova1.API"
                });
        }
    }
}