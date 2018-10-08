using Microsoft.Owin;
using Owin;
using System.Data.Entity;
using System.Web.Http;
using Prova1.Auth.App_Start;
using Prova1.Infra.ORM.Initializer;

[assembly: OwinStartup(typeof(Prova1.Auth.Startup))]
namespace Prova1.Auth
{
    /// <summary>
    /// Classe para o inicio da API de autenticação.
    /// </summary>
    public class Startup
    {
        /// <summary>
        /// Método que invoca as configurações iniciais para execução da API
        /// 
        /// </summary>
        public void Configuration(IAppBuilder app)
        {
            // Cria a configuração da api
            HttpConfiguration config = new HttpConfiguration();
            config.EnableCors();
            // Configura a autenticação
            OAuthConfig.ConfigureOAuth(app);
            // Inicia a API e o banco com as configurações
            app.UseWebApi(config);
            Database.SetInitializer(new DbInitializer());
        }
    }
}