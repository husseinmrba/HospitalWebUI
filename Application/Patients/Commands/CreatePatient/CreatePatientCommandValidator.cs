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
            RuleFor(p => p.Address1)
                .Length(1, 4);
        }

    }
}
