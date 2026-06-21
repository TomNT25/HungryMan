using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using System;

namespace API_GATEWAY.Configuration;

public static class HealthConfiguration
{
    public static IServiceCollection AddDownstreamHealthChecks(this IServiceCollection services, IConfiguration configuration)
    {
        // Dynamically load downstream health check URLs from Environment Variables
        var authHost = configuration["DownstreamEndpoints:AuthService:Host"];
        var authPort = configuration["DownstreamEndpoints:AuthService:Port"];

        services.AddHealthChecks()
            .AddUrlGroup(new Uri($"http://{authHost}:{authPort}/health"), name: "Authentication Service Health Check");

        return services;
    }
}
