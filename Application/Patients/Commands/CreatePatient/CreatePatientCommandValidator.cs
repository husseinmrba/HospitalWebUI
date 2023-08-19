using FluentValidation;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Patients.Commands.CreatePatient
{
    public class CreatePatientCommandValidator: AbstractValidator<CreatePatientCommand>
    {
        public CreatePatientCommandValidator()
        {
            RuleFor(p => p.Name)
                .NotEmpty()
                .MaximumLength(50)
                .NotNull();

            RuleFor(p => p.FileNo)
                .NotEmpty()
                .GreaterThan(0);

            RuleFor(p => p.CitizenId)
                .NotEmpty()
                .NotNull()
                .MaximumLength(30);

            RuleFor(p => p.Birthdate)
                .NotEmpty()
                .NotNull()
                .LessThan(DateTime.Now);

            RuleFor(p => p.Gender)
                .NotNull();

            RuleFor(p => p.Natinality)
                .NotEmpty()
                .NotNull()
                .MaximumLength(40);

            RuleFor(p => p.PhoneNumber)
                .NotEmpty()
                .NotNull()
                .MaximumLength(20);

            RuleFor(p => p.Email)
                .NotEmpty()
                .NotNull()
                .EmailAddress();

            RuleFor(p => p.Country)
                .NotEmpty()
                .NotNull()
                .MaximumLength(50);

            RuleFor(p => p.City)
                .NotEmpty()
                .NotNull()
                .MaximumLength(50);

            RuleFor(p => p.Street)
                .NotEmpty()
                .NotNull()
                .MaximumLength(100);

            RuleFor(p => p.Address1)
                .NotEmpty()
                .NotNull()
                .MaximumLength(100);

            RuleFor(p => p.Address2)
                .MaximumLength(100);

            RuleFor(p => p.ContactPerson)
                .NotEmpty()
                .NotNull()
                .MaximumLength(100);

            RuleFor(p => p.ContactRelation)
                .NotEmpty()
                .NotNull()
                .MaximumLength(50);

            RuleFor(p => p.ContactPhone)
                .NotEmpty()
                .NotNull()
                .MaximumLength(20);

            RuleFor(p => p.FirstVisitDate)
                .NotEmpty()
                .NotNull()
                .LessThan(DateTime.Now);
        }
    }
}
