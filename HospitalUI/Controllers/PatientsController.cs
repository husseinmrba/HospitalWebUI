using Application.Common.Models;
using Application.Patients.Commands.CreatePatient;
using Application.Patients.Commands.DeletePatient;
using Application.Patients.Commands.UpdatePatient;
using Application.Patients.Queries.GetPatientsWithPagination;
using Domain.Entities;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using static Microsoft.EntityFrameworkCore.DbLoggerCategory.Database;

namespace HospitalUI.Controllers
{

    public class PatientsController : ApiControllerBase
    {

        [HttpGet]
        public async Task<ActionResult<PaginatedList<Patient>>> GetPatients([FromQuery] GetPatientsWithPaginationQuery query)
        {
            return await Mediator.Send(query);
        }

        [HttpPost]
        public async Task<ActionResult<Guid>> CreatePatient(CreatePatientCommand command)
        {
            return await Mediator.Send(command);
        }

        [HttpDelete("{patientId}")]
        public async Task<IActionResult> DeletePatientById(Guid patientId)
        {
            await Mediator.Send(new DeletePatientCommand(patientId));

            return NoContent();
        }

        [HttpPatch]
        public async Task<IActionResult> UpdatePatient(UpdatePatientCommand command)
        {
            await Mediator.Send(command);

            return NoContent();
        }
    }
}
