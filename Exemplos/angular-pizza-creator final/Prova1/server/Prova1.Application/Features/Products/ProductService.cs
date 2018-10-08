using System;
using System.Linq;
using AutoMapper;
using Prova1.Application.Features.Products.Commands;
using Prova1.Application.Features.Products.Queries;
using Prova1.Domain.Exceptions;
using Prova1.Domain.Features.Products;
using Prova1.Domain.Products;

namespace Prova1.Application.Features.Products
{
    /// <summary>
    /// Serviço de gerenciamento de products
    /// </summary>
    public class ProductService : IProductService
    {
        private readonly IProductRepository _repositoryProduct;

        public ProductService(IProductRepository repositoryProduct)
        {
            _repositoryProduct = repositoryProduct;
        }

        public int Add(ProductRegisterCommand productCmd)
        {
            var product = Mapper.Map<ProductRegisterCommand, Product>(productCmd);
            var newproduct = _repositoryProduct.Add(product);

            return newproduct.Id;
        }

        public IQueryable<Product> GetAll()
        {
            return _repositoryProduct.GetAll();
        }

        public ProductQuery GetById(int id)
        {
            var product = _repositoryProduct.GetById(id);

            return Mapper.Map<Product, ProductQuery>(product);
        }

        public bool Remove(ProductRemoveCommand cmd)
        {
            return _repositoryProduct.Remove(cmd.Id);
        }

        public bool Update(ProductUpdateCommand productCmd)
        {
            var product = _repositoryProduct.GetById(productCmd.Id);
            if (product == null)
                throw new NotFoundException();
            // Mapeia para o objeto do banco que está tracking pelo EF
            Mapper.Map(productCmd, product);

            return _repositoryProduct.Update(product);
        }
    }
}
