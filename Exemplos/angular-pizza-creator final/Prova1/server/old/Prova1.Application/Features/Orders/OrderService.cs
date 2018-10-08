using AutoMapper;
using Prova1.Application.Features.Orders.Commands;
using Prova1.Application.Features.Orders.Queries;
using Prova1.Domain.Exceptions;
using Prova1.Domain.Features.Orders;
using Prova1.Domain.Features.Products;
using Prova1.Domain.Orders;
using System;
using System.Linq;

namespace Prova1.Application.Features.Orders
{
    /// <summary>
    /// Serviço de gerenciamento de orders
    /// </summary>
    public class OrderService : IOrderService
    {
        private readonly IOrderRepository _repositoryOrder;
        private readonly IProductRepository _repositoryProduct;


        public OrderService(IOrderRepository repositoryOrder, IProductRepository repositoryProduct)
        {
            _repositoryOrder = repositoryOrder;
            _repositoryProduct = repositoryProduct;
        }

        public int Add(OrderRegisterCommand orderCmd)
        {
            var order = Mapper.Map<OrderRegisterCommand, Order>(orderCmd);
            // obtém a entidade do banco
            order.Product = _repositoryProduct.GetById(orderCmd.ProductId) ?? throw new NotFoundException();
            var neworder = _repositoryOrder.Add(order);

            return neworder.Id;
        }

        public bool Remove(OrderRemoveCommand cmd)
        {
            return _repositoryOrder.Remove(cmd.Id);
        }

        public IQueryable<Order> GetAll()
        {
            return _repositoryOrder.GetAll();
        }

        public OrderQuery GetById(int id)
        {
            var updatedOrder = _repositoryOrder.GetById(id);

            return Mapper.Map<Order, OrderQuery>(updatedOrder);
        }

        public bool Update(OrderUpdateCommand orderCmd)
        {
            // Obtém a entidade Indexada pelo EF e valida
            var orderDb = _repositoryOrder.GetById(orderCmd.Id) ?? throw new NotFoundException();
            var product = _repositoryProduct.GetById(orderCmd.ProductId) ?? throw new NotFoundException();
            // Mapeia para o objeto do banco
            Mapper.Map<OrderUpdateCommand, Order>(orderCmd, orderDb);
            orderDb.Product = product;
            // Realiza o update no objeto do banco
            return _repositoryOrder.Update(orderDb);
        }
    }
}