using Microsoft.Owin.Security;
using Microsoft.Owin.Security.OAuth;
using Prova1.API.IoC;
using Prova1.Application.Features.Authentication;
using Prova1.Domain.Users;
using SimpleInjector.Lifestyles;
using System;
using System.Collections.Generic;
using System.Security.Claims;
using System.Threading.Tasks;

namespace Prova1.Auth.Providers
{
    /// <summary>
    /// Provedor de autenticação do Prova1.Auth
    /// 
    /// É o responsável por validar os parâmetros da chamada htpp de solicitação de token
    /// e também verificar as credenciais informadas.
    /// 
    /// </summary>
    public class OAuthProvider : OAuthAuthorizationServerProvider
    {

        public OAuthProvider() : base()
        {
            
        }


        /// <summary>
        /// 
        /// Esse método é responsável por validar se a API da Aplicação está registrada para usar a API de Autenticação
        /// Tudo isso ocorrerá através do valor do ClientId informado, que deve ser informado no Request sem a chave criptografada
        /// Diante do "caminho feliz" o contexto do Request será marcado como válido
        /// 
        /// </summary>
        /// <param name="context">É o contexto atual da chamada http na visão do oauth</param>
        /// <returns>Retorna se o client_id informado é válido (true) ou não (false)</returns>
        public override Task ValidateClientAuthentication(OAuthValidateClientAuthenticationContext context)
        {
            string clientId = string.Empty;
            string clientSecret = string.Empty;
            string symmetricKeyAsBase64 = string.Empty;
            // Obtém as chaves do contexto de autenticação
            if (!context.TryGetBasicCredentials(out clientId, out clientSecret))
            {
                context.TryGetFormCredentials(out clientId, out clientSecret);
            }
            // Caso não tenha um client_id no contexto da chamada
            if (context.ClientId == null)
            {
                context.SetError("invalid_clientId", "ErrorCode:001 - The client_id is not set");

                return Task.FromResult<object>(null);
            }
            // Busca o client
            var client = AppClientsStore.FindClient(context.ClientId);
            // Se não encontrou, então o client_id é inválido
            if (client == null)
            {
                context.SetError("invalid_clientId", "ErrorCode:002 - The client_id is incorrect");

                return Task.FromResult<object>(null);
            }
            // Torna válido o contexto da chamada
            context.Validated();

            return Task.FromResult<object>(null);
        }

        /// <summary>
        /// 
        /// Esse método é responsável por validar as credenciais do usuário
        /// Essa validação é a verificação das credencias (email e senha) em uma base de usuários
        /// 
        /// O token de acesso JWT será gerado a partir da chamada "context.Validated(ticket)",
        /// seguindo os padrões de formatação definidos na classe "CustomJwtFormat"
        /// 
        /// </summary>
        /// <param name="context">É o contexto atual da chamada http na visão do oauth</param>
        /// <returns>Retorna se as credenciais informadas são válidas (true) ou não (false)</returns>
        public override Task GrantResourceOwnerCredentials(OAuthGrantResourceOwnerCredentialsContext context)
        {
            context.OwinContext.Response.Headers.Add("Access-Control-Allow-Origin", new[] { "*" });
            var user = default(User);
            try
            {
                using (AsyncScopedLifestyle.BeginScope(SimpleInjectorContainer.ContainerInstance))
                {
                    var authService = SimpleInjectorContainer.ContainerInstance.GetInstance<IAuthenticationService>();
                    // Verifica as credenciais do usuário do serviço de autenticação
                    user = authService.Login(context.UserName, context.Password);
                }
            }
            catch (Exception ex) {
                // Se não está valido, o user será null e retornará o erro de credenciais inválidas
                context.SetError("invalid_grant", ex.Message);
                return Task.FromResult<object>(null);
            }
            // Cria os atributos que estarão no JsonWebToken (JWT)
            var identity = new ClaimsIdentity("JWT");
            identity.AddClaim(new Claim("UserId", user.Id.ToString()));
            identity.AddClaim(new Claim(ClaimTypes.Email, user.Email));
            identity.AddClaim(new Claim(ClaimTypes.Name, user.Name));
            // Valida o contexto atual com o JWT
            var props = new AuthenticationProperties(new Dictionary<string, string> { { "client", context.ClientId } });
            // O ticket são as informações públicas que estarão codificadas no token JWT
            var ticket = new AuthenticationTicket(identity, props);
            // Torna válido as credenciais e gera o token de resposta com base no ticket
            context.Validated(ticket);

            return Task.FromResult<object>(null);
        }
    }
}