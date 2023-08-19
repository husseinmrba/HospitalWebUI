using Application.Common.Interfaces;
using Application.Patients.Commands.CreatePatient;
using AutoMapper;
using Azure.Core;
using Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;

namespace Infrastructure.Persistence
{
    public class ApplicationDBContextInitialiser
    {
        private readonly ILogger<ApplicationDBContextInitialiser> _logger;
        private readonly ApplicationDBContext _context;
        private readonly IMapper mapper;

        public ApplicationDBContextInitialiser(ILogger<ApplicationDBContextInitialiser> logger,
                                               ApplicationDBContext context,
                                               IMapper mapper)
        {
            _logger = logger;
            _context = context;
            this.mapper = mapper;
        }

        public async Task InitialiseAsync()
        {
            try
            {
                if (_context.Database.IsSqlServer())
                {
                    await _context.Database.MigrateAsync();
                }
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "An error occurred while initialising the database.");
                throw;
            }
        }

        public async Task SeedAsync()
        {
            try
            {
                await TrySeedAsync();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "An error occurred while seeding the database.");
                throw;
            }
        }

        public async Task TrySeedAsync()
        {
            // Default data
            // Seed, if necessary
            if (!_context.Patients.Any())
            {
                string contents = File.ReadAllText("../Infrastructure//Persistence//PatientDataByDefault.json");

                var defaultPatiensForCreate = JsonSerializer.Deserialize<List<CreatePatientCommand>>(contents);

                var defaultPatiens = mapper.Map<List<Patient>>(defaultPatiensForCreate);

                defaultPatiens.ForEach(p => p.RecordCreationDate = DateTime.Now);

                if (defaultPatiens != null && defaultPatiens.Any())
                {
                    await _context.Patients.AddRangeAsync(defaultPatiens);
                    await _context.SaveChangesAsync();
                }
            }
        }
    }
}
