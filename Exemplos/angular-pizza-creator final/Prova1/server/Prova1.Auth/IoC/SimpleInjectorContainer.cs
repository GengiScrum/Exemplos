using System.Web.Http;
using Prova1.Infra.ORM.Contexts;
using SimpleInjector;
using SimpleInjector.Integration.WebApi;
using SimpleInjector.Lifestyles;
using Prova1.Application.Features.Orders;
using Prova1.Infra.ORM.Features.Orders;
using Prova1.Domain.Features.Orders;
using Prova1.Domain.Features.Products;
using Prova1.Infra.ORM.Features.Products;
using Prova1.Application.Features.Products;
using System.Diagnostics.CodeAnalysis;
using Prova1.Infra.ORM.Features.Users;
using Prova1.Domain.Users;
using Prova1.Application.Features.Authentication;

namespace Prova1.API.IoC
{
    /// <summary>
    /// Classe responsável por realizar as configurações de injeção de depêndencia.
    /// </summary>
    [ExcludeFromCodeCoverage]
    public static class SimpleInjectorContainer
    {
        public static Container ContainerInstance { get; set; }

        /// <summary>
        /// Método que inicializa a injeção de depêndencia
        /// </summary>
        public static void Initialize()
        {
            ContainerInstance = new Container();

            ContainerInstance.Options.DefaultScopedLifestyle = new AsyncScopedLifestyle();
            RegisterServices();

            ContainerInstance.RegisterWebApiControllers(GlobalConfiguration.Configuration);

            ContainerInstance.Verify();
            // Informa que para resolver as depedências nos construtores será usado o container criado
            GlobalConfiguration.Configuration.DependencyResolver = new SimpleInjectorWebApiDependencyResolver(ContainerInstance);
        }


        /// <summary>
        /// Registra todos os serviços que podem ser injetados nos construtores
        /// </summary>
        public static void RegisterServices()
        {
            ContainerInstance.Register<IUserRepository, UserRepository>();
            ContainerInstance.Register<IAuthenticationService, AuthenticationService>();

            ContainerInstance.Register<Prova1DbContext>(() => new Prova1DbContext(), Lifestyle.Scoped);
        }
    }
}