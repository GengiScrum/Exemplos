using AutoMapper;
using Prova1.Application.Features.Products.Commands;
using Prova1.Application.Features.Products.Queries;
using Prova1.Domain.Products;

namespace Prova1.Application.Features.Products
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<ProductRegisterCommand, Product>();
            CreateMap<Product, ProductQuery>()
                .ForMember(p => p.Manufacture, mc => mc.MapFrom(pq => pq.Manufacture))
                .ForMember(p => p.Expiration, mc => mc.MapFrom(pq => pq.Expiration));
            CreateMap<ProductUpdateCommand, Product>();
        }
    }
}
