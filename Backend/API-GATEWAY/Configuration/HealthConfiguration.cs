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

        var healthChecks = services.AddHealthChecks();

        if (!string.IsNullOrEmpty(authHost) && !string.IsNullOrEmpty(authPort))
        {
            healthChecks.AddUrlGroup(new Uri($"http://{authHost}:{authPort}/health"), name: "Authentication Service Health Check");
        }

        var productInstances = configuration.GetSection("DownstreamEndpoints:ProductService:Instances").GetChildren();
        int index = 1;
        foreach (var instance in productInstances)
        {
            var host = instance["Host"];
            var port = instance["Port"];
            if (!string.IsNullOrEmpty(host) && !string.IsNullOrEmpty(port))
            {
                healthChecks.AddUrlGroup(new Uri($"http://{host}:{port}/health"), name: $"Product Service Instance {index} Health Check");
                index++;
            }
        }

        return services;
    }
}
