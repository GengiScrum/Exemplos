using Prova1.Application.Features.Orders.Commands;
using Prova1.Application.Features.Orders.Queries;
using Prova1.Domain.Orders;
using System.Linq;

namespace Prova1.Application.Features.Orders
{
    public interface IOrderService
    {
         int Add(OrderRegisterCommand order);

        bool Update(OrderUpdateCommand order);

        OrderQuery GetById(int id);

        IQueryable<Order>  GetAll();

        bool Remove(OrderRemoveCommand cmd);
    }
}
