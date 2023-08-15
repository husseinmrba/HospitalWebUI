using FluentValidation;
using FluentValidation.AspNetCore;
using HospitalUI.Filters;
using System.Reflection;

namespace HospitalUI
{
    public static class ConfigureServices
    {
        public static IServiceCollection AddWebUIServices(this IServiceCollection services)
        {
            services.AddControllersWithViews(options =>
                options.Filters.Add<ApiExceptionFilterAttribute>())
                       .AddFluentValidation(x => x.AutomaticValidationEnabled = false);

            return services;
        }
    }
}
