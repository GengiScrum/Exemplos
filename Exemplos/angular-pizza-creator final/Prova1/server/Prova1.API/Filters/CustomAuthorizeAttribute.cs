using System.Diagnostics.CodeAnalysis;
using System.Web.Http;
using System.Web.Http.Controllers;

namespace Prova1.API.Filters
{
    /// <summary>
    /// Classe que provem o atributo de autenticação customizado [CustomAuthorize]
    /// Herda de AuthorizeAttribute que é o [Authorize] padrão fornecido pelo framework OAuth
    /// </summary>
    [ExcludeFromCodeCoverage]
    public class CustomAuthorizeAttribute : AuthorizeAttribute
    {
        /// <summary>
        /// Método responsável por validar a autenticação de cada chamada realizada.
        /// </summary>
        /// <param name="actionContext">É o contexto atual da chamada Http recebida</param>
        protected override bool IsAuthorized(HttpActionContext actionContext)
        {
            // Verifica se o token é válido pela validação padrão do oauth
            // poderia acessar o banco, consultar outro ws e etc conforme necessário
            return base.IsAuthorized(actionContext);
        }
    }
}