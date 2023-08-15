using Application.Common.Interfaces;
using Application.Common.Mappings;
using Application.Common.Models;
using Domain.Entities;
using MediatR;

namespace Application.Patients.Queries.GetPatientsWithPagination
{
    public record GetPatientsWithPaginationQuery : IRequest<PaginatedList<Patient>>
    {
        public int PageNumber { get; init; } = 1;
        public int PageSize { get; init; } = 10;
        public int SearchBy { get; set; } = 0;
        public string KeyWord { get; set; } = string.Empty;
    }

    public class GetPatientsWithPaginationQueryHandler : IRequestHandler<GetPatientsWithPaginationQuery, PaginatedList<Patient>>
    {
        private readonly IApplicationDBContext _context;

        public GetPatientsWithPaginationQueryHandler(IApplicationDBContext context)
        {
            _context = context;
        }


        public async Task<PaginatedList<Patient>> Handle(GetPatientsWithPaginationQuery request, CancellationToken cancellationToken)
        {
            var query = _context.Patients as IQueryable<Patient>;

            query = InitializeTheQueryWithTheFilterValue(query, request.SearchBy, request.KeyWord);

            var filteredPatients = await query.PaginatedListAsync(request.PageNumber, request.PageSize);

            return filteredPatients;
        }
        

        private IQueryable<Patient> InitializeTheQueryWithTheFilterValue(IQueryable<Patient> query, int searchBy, string keyWord)
        {
            switch (searchBy)
            {
                // Filter by name
                case 1:
                    if (!string.IsNullOrEmpty(keyWord))
                        query = query.Where(p => p.Name.StartsWith(keyWord))
                                     .OrderBy(p => p.Name);
                    break;

                // Filter by fileNo
                case 2:
                    if (!string.IsNullOrEmpty(keyWord) && int.TryParse(keyWord, out _))
                        query = query.Where(p => p.FileNo.ToString().StartsWith(keyWord))
                                     .OrderBy(p => p.FileNo);    
                    break;

                // Filter by phone number
                case 3:
                    if (!string.IsNullOrEmpty(keyWord))
                        query = query.Where(p => p.PhoneNumber.StartsWith(keyWord))
                                     .OrderBy(p => p.PhoneNumber);
                    break;

                default:
                    break;
            }

            return query;
        }
    }
}
