using FluentValidation;
using FluentValidation.Validators;
using Microsoft.AspNetCore.JsonPatch;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Patients.Commands.UpdatePatient
{
    public class UpdatePatientCommandValidator: AbstractValidator<UpdatePatientCommand>
    {
        public UpdatePatientCommandValidator()
        {
            
            RuleFor(p => p.PatientId)
                .Must(BeValidGuid)
                .WithMessage("Invalid GUID format for Id.");

            RuleFor(p => p.PatchDocument).NotNull().SetValidator(new PatientPatchDocumentValidator());

        }
        private bool BeValidGuid(Guid id)
        {
            return id != Guid.Empty;
        }
    }

    public class PatientPatchDocumentValidator : AbstractValidator<JsonPatchDocument<PatientForUpdate>>
    {
        public PatientPatchDocumentValidator()
        {
            RuleForEach(patchDocument => patchDocument.Operations)
            .Custom((operation, context) =>
            {
                if (operation.path == "/name" && operation.op == "replace")
                {
                    string? newValue = operation.value?.ToString();
                    if (string.IsNullOrEmpty(newValue))
                    {
                        context.AddFailure("Name cannot be empty.");
                    }
                    else if (newValue.Length > 50)
                    {
                        context.AddFailure("Name cannot be longer than 50 characters.");
                    }
                }
                else if (operation.path == "/fileNo" && operation.op == "replace")
                {
                    if (!int.TryParse(operation.value?.ToString(), out int fileNoValue) && fileNoValue > 0)
                    {
                        context.AddFailure("Invalid value for FileNo.");
                    }
                }
                else if (operation.path == "/citizenId" && operation.op == "replace")
                {
                    string? newValue = operation.value?.ToString();
                    if (string.IsNullOrEmpty(newValue))
                    {
                        context.AddFailure("CitizenId cannot be empty.");
                    }
                    else if (newValue.Length > 30)
                    {
                        context.AddFailure("CitizenId cannot be longer than 30 characters.");
                    }
                }
                else if (operation.path == "/birthdate" && operation.op == "replace")
                {
                    if (!DateTime.TryParse(operation.value?.ToString(), out DateTime birthdate))
                    {
                        context.AddFailure("Invalid value for Birthdate.");
                    }
                    else if (birthdate >= DateTime.Now)
                    {
                        context.AddFailure("Birthdate must be in the past.");
                    }
                }
                else if (operation.path == "/gender" && operation.op == "replace")
                {
                    if (!bool.TryParse(operation.value?.ToString(), out _))
                    {
                        context.AddFailure("Invalid value for Gender.");
                    }
                }
                else if (operation.path == "/natinality" && operation.op == "replace")
                {
                    string? newValue = operation.value?.ToString();
                    if (string.IsNullOrEmpty(newValue) || newValue.Length > 40)
                    {
                        context.AddFailure("Natinality must be between 1 and 40 characters.");
                    }
                }
                else if (operation.path == "/phoneNumber" && operation.op == "replace")
                {
                    string? newValue = operation.value?.ToString();
                    if (string.IsNullOrEmpty(newValue) || newValue.Length > 20)
                    {
                        context.AddFailure("PhoneNumber must be between 1 and 20 characters.");
                    }
                }
                else if (operation.path == "/email" && operation.op == "replace")
                {
                    string? newValue = operation.value?.ToString();
                    if (string.IsNullOrEmpty(newValue) || !IsValidEmail(newValue))
                    {
                        context.AddFailure("Invalid Email format.");
                    }
                }
                else if (operation.path == "/country" && operation.op == "replace")
                {
                    string? newValue = operation.value?.ToString();
                    if (string.IsNullOrEmpty(newValue) || newValue.Length > 50)
                    {
                        context.AddFailure("Country must be between 1 and 50 characters.");
                    }
                }
                else if (operation.path == "/city" && operation.op == "replace")
                {
                    string? newValue = operation.value?.ToString();
                    if (string.IsNullOrEmpty(newValue) || newValue.Length > 50)
                    {
                        context.AddFailure("City must be between 1 and 50 characters.");
                    }
                }
                else if (operation.path == "/street" && operation.op == "replace")
                {
                    string? newValue = operation.value?.ToString();
                    if (string.IsNullOrEmpty(newValue) || newValue.Length > 100)
                    {
                        context.AddFailure("Street must be between 1 and 100 characters.");
                    }
                }
                else if (operation.path == "/address1" && operation.op == "replace")
                {
                    string? newValue = operation.value?.ToString();
                    if (string.IsNullOrEmpty(newValue) || newValue.Length > 100)
                    {
                        context.AddFailure("Address1 must be between 1 and 100 characters.");
                    }
                }
                else if (operation.path == "/address2" && operation.op == "replace")
                {
                    string? newValue = operation.value?.ToString();
                    if (!string.IsNullOrEmpty(newValue) && newValue.Length > 100)
                    {
                        context.AddFailure("Address2 cannot be longer than 100 characters.");
                    }
                }
                else if (operation.path == "/contactPerson" && operation.op == "replace")
                {
                    string? newValue = operation.value?.ToString();
                    if (string.IsNullOrEmpty(newValue) || newValue.Length > 100)
                    {
                        context.AddFailure("ContactPerson must be between 1 and 100 characters.");
                    }
                }
                else if (operation.path == "/contactRelation" && operation.op == "replace")
                {
                    string? newValue = operation.value?.ToString();
                    if (string.IsNullOrEmpty(newValue) || newValue.Length > 50)
                    {
                        context.AddFailure("ContactRelation must be between 1 and 50 characters.");
                    }
                }
                else if (operation.path == "/contactPhone" && operation.op == "replace")
                {
                    string? newValue = operation.value?.ToString();
                    if (string.IsNullOrEmpty(newValue) || newValue.Length > 20)
                    {
                        context.AddFailure("ContactPhone must be between 1 and 20 characters.");
                    }
                }
                else if (operation.path == "/firstVisitDate" && operation.op == "replace")
                {
                    if (!DateTime.TryParse(operation.value?.ToString(), out DateTime firstVisitDate))
                    {
                        context.AddFailure("Invalid value for FirstVisitDate.");
                    }
                    else if (firstVisitDate >= DateTime.Now)
                    {
                        context.AddFailure("FirstVisitDate must be in the past.");
                    }
                }
                else
                {
                    context.AddFailure("Invalid operation or path.");
                }
            });
        }

        private bool IsValidEmail(string email)
        {
            return new EmailAddressAttribute().IsValid(email);
        }
    }
}
