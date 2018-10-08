using FluentValidation;
using FluentValidation.Results;
using System.Diagnostics.CodeAnalysis;

namespace Prova1.Application.Features.Products.Commands
{
    [ExcludeFromCodeCoverage]
    public class ProductRemoveCommand
    {
        public int Id { get; set; }

        public virtual ValidationResult Validate()
        {
            return new Validator().Validate(this);
        }

        class Validator : AbstractValidator<ProductRemoveCommand>
        {
            public Validator()
            {
                RuleFor(p => p.Id).NotNull().GreaterThan(0);
            }
        }
    }
}
