using Application.Common.Interfaces;
using AutoMapper;
using Domain.Entities;
using FluentValidation;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Patients.Commands.CreatePatient
{
    public record CreatePatientCommand : IRequest<Guid>
    {
        public string? Name { get; set; }
        public int FileNo { get; set; }
        public string? CitizenId { get; set; }
        public DateTime Birthdate { get; set; }
        public Boolean Gender { get; set; }
        public string? Natinality { get; set; }
        public string? PhoneNumber { get; set; }
        public string? Email { get; set; }
        public string? Country { get; set; }
        public string? City { get; set; }
        public string? Street { get; set; }
        public string? Address1 { get; set; }
        public string? Address2 { get; set; }
        public string? ContactPerson { get; set; }
        public string? ContactRelation { get; set; }
        public string? ContactPhone { get; set; }
        public DateTime FirstVisitDate { get; set; }
    }
    public class CreatePatientCommandHandler : IRequestHandler<CreatePatientCommand, Guid>
    {
        private readonly IApplicationDBContext _context;
        private readonly IMapper _mapper;

        public CreatePatientCommandHandler(IApplicationDBContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }
        public async Task<Guid> Handle(CreatePatientCommand request, CancellationToken cancellationToken)
        {

            var newPatient = _mapper.Map<Patient>(request);
            newPatient.RecordCreationDate = DateTime.Now;

            await _context.Patients.AddAsync(newPatient);
            await _context.SaveChangesAsync();

            return newPatient.Id;
        }
    }
}
