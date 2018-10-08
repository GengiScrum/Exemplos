using Microsoft.Owin.Security;
using Microsoft.Owin.Security.DataHandler.Encoder;
using Prova1.Auth.Entities;
using System;
using System.IdentityModel.Protocols.WSTrust;
using System.IdentityModel.Tokens;
using Thinktecture.IdentityModel.Tokens;
namespace Prova1.Auth.Formats
{
    /// <summary>
    /// 
    /// Representa e configura o JSON Web Token (JWT) de acordo com as necessidades do projeto
    /// O token será gerado de acordo com o formato estabelecido nessa classe.
    /// 
    /// </summary>
    public class CustomJwtFormat : ISecureDataFormat<AuthenticationTicket>
    {
        private const string AppClientPropertyKey = "client";

        private readonly string _issuer = string.Empty;

        /// <summary>
        /// 
        /// O construtor da classe obriga que seja informado um "Issuer" (Emitente)
        /// O Emitente deverá corresponder a URI do seu serviço de autenticação
        /// Neste exemplo foi fixado o valor na classe Staturp "http://localhost/Prova1auth"
        /// 
        /// </summary>
        /// <param name="issuer">É o indentificador do emissor do token</param>
        public CustomJwtFormat(string issuer)
        {
            _issuer = issuer;
        }

        /// <summary>
        /// 
        /// Esse método deverá escrever o Token de Acesso (JWT) de maneira segura, para isso:
        ///     Irá ler o ClientId do ticket de autenticação e buscará na lista de aplicações registradas (AppClientsStore In-Memory)
        ///     Irá decodificar a chave para um array de bytes e após isso irá aplicar uma assinatura HMAC256 que será devolvida para o cliente
        ///     Por fim, irá emitir para o requisitor as informações do JWT
        /// 
        /// </summary>
        /// <param name="data">São os dados de autenticação informados</param>
        /// <returns>O token que identifica o usuário para a aplicação</returns>
        public string Protect(AuthenticationTicket data)
        {
            if (data == null)
            {
                throw new ArgumentNullException("data");
            }

            string clientId = data.Properties.Dictionary.ContainsKey(AppClientPropertyKey) ? data.Properties.Dictionary[AppClientPropertyKey] : null;

            if (string.IsNullOrWhiteSpace(clientId)) throw new InvalidOperationException("AuthenticationTicket.Properties does not include client");

            AppClient client = AppClientsStore.FindClient(clientId);

            string symmetricKeyAsBase64 = client.Base64Secret;

            var keyByteArray = TextEncodings.Base64Url.Decode(symmetricKeyAsBase64);

            var signingKey = new HmacSigningCredentials(keyByteArray);

            var token = new JwtSecurityToken(_issuer, clientId, data.Identity.Claims, 
                data.Properties.IssuedUtc.Value.UtcDateTime, data.Properties.ExpiresUtc.Value.UtcDateTime, signingKey);

            var handler = new JwtSecurityTokenHandler();

            var jwt = handler.WriteToken(token);

            return jwt;
        }

        /// <summary>
        /// 
        /// Método para invalidar o token gerado no método Protect()
        /// Como não armazenamos o estado da autenticação, não é possível invalidar o token gerado.
        /// 
        /// </summary>
        public AuthenticationTicket Unprotect(string protectedText)
        {
            throw new NotImplementedException();
        }
    }
}