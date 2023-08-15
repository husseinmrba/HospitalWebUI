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
                .MaximumLength(30)
                .NotEmpty()
                .NotNull();

            RuleFor(p => p.FileNo)
                .Must(BeAnInteger);

            RuleFor(p => p.CitizenId)
                .MaximumLength(30)
                .NotEmpty()
                .NotNull();

            RuleFor(p => p.Birthdate)
                .NotEmpty()
                .NotNull()
                .Must(BeAnDate);

            RuleFor(p => p.Natinality)
                .NotEmpty()
                .NotNull()
                .MaximumLength(20);

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
                .MaximumLength(20);

            RuleFor(p => p.City)
                .NotEmpty()
                .NotNull()
                .MaximumLength(20);

            RuleFor(p => p.Street)
                .NotEmpty()
                .NotNull()
                .MaximumLength(20);

            RuleFor(p => p.Address1)
                .NotEmpty()
                .NotNull()
                .MaximumLength(20);

            RuleFor(p => p.Address2)
                .NotEmpty()
                .NotNull()
                .MaximumLength(20);

            RuleFor(p => p.ContactPerson)
                .NotEmpty()
                .NotNull()
                .MaximumLength(20);

            RuleFor(p => p.ContactRelation)
                .NotEmpty()
                .NotNull()
                .MaximumLength(20);

            RuleFor(p => p.ContactPhone)
                .NotEmpty()
                .NotNull()
                .MaximumLength(20);

            RuleFor(p => p.FirstVisitDate)
                .NotEmpty()
                .NotNull()
                .Must(BeAnDate);
        }

        private bool BeAnInteger(int number)
        {
            return int.TryParse(number.ToString(), out _);
        }
        private bool BeAnDate(DateTime number)
        {
            return DateTime.TryParse(number.ToString(), out _);
        }
    }
}
