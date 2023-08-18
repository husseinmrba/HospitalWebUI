using Application.Common.Exceptions;
using Application.Common.Interfaces;
using AutoMapper;
using Domain.Entities;
using MediatR;
using Microsoft.AspNetCore.JsonPatch;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Patients.Commands.UpdatePatient
{
    public class UpdatePatientCommand : IRequest
    {
        public Guid PatientId { get; set; }
        public JsonPatchDocument<PatientForUpdate>? PatchDocument { get; set; }
    }

    public class UpdatePatientCommandHandler : IRequestHandler<UpdatePatientCommand>
    {
        private readonly IApplicationDBContext _context;
        private readonly IMapper _mapper;

        public UpdatePatientCommandHandler(IApplicationDBContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task Handle(UpdatePatientCommand request, CancellationToken cancellationToken)
        {
            var patient = await _context.Patients.FirstOrDefaultAsync(p => p.Id == request.PatientId);
            if (patient == null)
            {
                throw new NotFoundException(nameof(Patient) + request.PatientId);
            }
            var patientTpPatch = _mapper.Map<PatientForUpdate>(patient);

            request.PatchDocument?.ApplyTo(patientTpPatch);

            _mapper.Map(patientTpPatch, patient);

            _context.Patients.Update(patient);

            await _context.SaveChangesAsync();
        }
    }
}
