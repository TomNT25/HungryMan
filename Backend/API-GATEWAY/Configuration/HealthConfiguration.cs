using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using System;

namespace API_GATEWAY.Configuration;

public static class HealthConfiguration
{
    public static IServiceCollection AddDownstreamHealthChecks(this IServiceCollection services, IConfiguration configuration)
    {
        var authHost = configuration["DownstreamEndpoints:AuthService:Host"];
        var authPort = configuration["DownstreamEndpoints:AuthService:Port"];

        var productHost = configuration["DownstreamEndpoints:ProductService:Host"];
        var productPort = configuration["DownstreamEndpoints:ProductService:Port"];

        services.AddHealthChecks()
            .AddUrlGroup(new Uri($"http://{authHost}:{authPort}/health"), name: "Authentication Service Health Check")
            .AddUrlGroup(new Uri($"http://{productHost}:{productPort}/health"), name: "Product Service Health Check");

        return services;
    }
}
