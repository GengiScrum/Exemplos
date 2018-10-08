using Prova1.Application.Features.Products.Commands;
using Prova1.Application.Features.Products.Queries;
using Prova1.Domain.Products;
using System.Linq;

namespace Prova1.Application.Features.Products
{
    public interface IProductService
    {
        int Add(ProductRegisterCommand product);

        bool Update(ProductUpdateCommand product);

        ProductQuery GetById(int id);

        IQueryable<Product> GetAll();

        bool Remove(ProductRemoveCommand cmd);
    }
}
