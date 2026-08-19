using FluentValidation;
using Microsoft.Extensions.DependencyInjection;
using Shared.Helpers.Interfaces;
using Scrutor;

namespace AuthenticationService.Application;

public static class DependencyInjection
{
    public static IServiceCollection AddApplicationServices(this IServiceCollection services)
    {
        var assembly = typeof(DependencyInjection).Assembly;

        services.AddMediatR(config =>
        {
            config.RegisterServicesFromAssembly(assembly);
            config.AddOpenBehavior(typeof(Behaviors.ValidationBehavior<,>));
        });

        services.AddValidatorsFromAssembly(assembly);

        services.Scan(scan => scan
            .FromAssemblies(
                assembly,
                typeof(IJwtService).Assembly
            )
            .AddClasses(classes => classes.Where(type => type.Name.EndsWith("Service") || type.Name.EndsWith("Hasher")))
            .AsImplementedInterfaces()
            .WithScopedLifetime());

        return services;
    }
}
