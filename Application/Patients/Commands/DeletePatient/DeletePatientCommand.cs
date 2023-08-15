using Application.Common.Exceptions;
using Application.Common.Interfaces;
using Domain.Entities;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Patients.Commands.DeletePatient
{
    public record DeletePatientCommand(Guid Id) : IRequest;

    public class DeletePatientCommandHandler : IRequestHandler<DeletePatientCommand>
    {
        private readonly IApplicationDBContext _context;

        public DeletePatientCommandHandler(IApplicationDBContext context)
        {
            _context = context;
        }

        public async Task Handle(DeletePatientCommand request, CancellationToken cancellationToken)
        {
            var patient = await _context.Patients.FirstOrDefaultAsync(p => p.Id == request.Id);

            if (patient == null)
                throw new NotFoundException(nameof(Patient) + request.Id);

            _context.Patients.Remove(patient);

            await _context.SaveChangesAsync();
        }
    }
}
