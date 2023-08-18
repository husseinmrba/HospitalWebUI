using Application.Common.Exceptions;
using Application.Common.Interfaces;
using AutoMapper;
using Domain.Entities;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Application.Patients.Queries.GetPatient
{
    public record GetPatientQuery(Guid Id): IRequest<Patient>;

    public class GetPatientQueryHandler : IRequestHandler<GetPatientQuery, Patient>
    {
        private readonly IApplicationDBContext _context;
        private readonly IMapper _mapper;

        public GetPatientQueryHandler(IApplicationDBContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }


        public async Task<Patient> Handle(GetPatientQuery request, CancellationToken cancellationToken)
        {
            var patient = await _context.Patients.FirstOrDefaultAsync(p => p.Id == request.Id);

            if (patient == null)
                throw new NotFoundException(nameof(Patient), request.Id);

            return patient;
        }
    }
   

    
}
