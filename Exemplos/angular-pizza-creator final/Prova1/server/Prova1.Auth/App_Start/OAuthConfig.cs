using Microsoft.Owin;
using Microsoft.Owin.Security.OAuth;
using Prova1.Auth.Formats;
using Prova1.Auth.Providers;
using Prova1.Infra.Settings;
using Owin;
using System;
using System.Configuration;
using Prova1.API.IoC;
using Prova1.Application.Features.Authentication;
using System.Threading.Tasks;
using SimpleInjector.Lifestyles;

namespace Prova1.Auth.App_Start
{
    /// <summary>
    /// Classe para configurar a autenticação da API
    /// </summary>
    public static class OAuthConfig
    {
        /// <summary>
        /// Método que configura e inicializa a disponibilização de tokens
        /// </summary>
        public static void ConfigureOAuth(IAppBuilder app)
        {
            OAuthAuthorizationServerOptions OAuthServerOptions = new OAuthAuthorizationServerOptions()
            {
                //Somente para ambiente DEV (Em produção deve ser AllowInsecureHttp = false)
                AllowInsecureHttp = true,
                // Indica que o token será obtido através de: <url>/token
                TokenEndpointPath = new PathString("/token"),
                // Tempo de expiração do token
                AccessTokenExpireTimeSpan = TimeSpan.FromDays(Prova1Settings.AuthenticationSettings.TokenExpiration),
                // Informa o nosso provedor customizado
                Provider = new OAuthProvider(),
                // Informa que o formato do token será o JWT customizado
                AccessTokenFormat = new CustomJwtFormat(ConfigurationManager.AppSettings["AuthApiUrl"])
            };

            // Disponibiliza o OAuth 2.0 Bearer Access Token Generation na aplicação com as configurações acima
            app.UseOAuthAuthorizationServer(OAuthServerOptions);
        }
    }
}