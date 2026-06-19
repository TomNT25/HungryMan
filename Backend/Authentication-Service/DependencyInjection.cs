using Microsoft.Extensions.DependencyInjection;
using Shared.Helpers.Interfaces;

namespace Authentication_Service;

public static class DependencyInjection
{
    public static IServiceCollection AddApplicationServices(this IServiceCollection services)
    {
        // Scan assemblies to automatically register classes ending with Service or Hasher
        services.Scan(scan => scan
            .FromAssemblies(
                typeof(DependencyInjection).Assembly,
                typeof(IJwtService).Assembly
            )
            .AddClasses(classes => classes.Where(type => type.Name.EndsWith("Service") || type.Name.EndsWith("Hasher")))
            .AsImplementedInterfaces()
            .WithScopedLifetime());

        return services;
    }
}
