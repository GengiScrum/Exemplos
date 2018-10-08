namespace Prova1.Application.Features.Orders.Queries
{
    public class OrderQuery
    {
        public virtual int Id { get; set; }

        public virtual string Customer { get; set; }

        public virtual int Quantity { get; set; }

        public virtual int ProductId { get; set; }

        public virtual string ProductName { get; set; }

        public virtual double Total { get; set; }
    }
}
