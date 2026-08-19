using MassTransit;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Options;
using System.Reflection;

namespace MessageQueue_Service;

public static class DependencyInjection
{
    public static IServiceCollection AddRabbitMqBroker(
        this IServiceCollection services, 
        IConfiguration configuration,
        Assembly? consumersAssembly = null)
    {
        services.Configure<RabbitMqSettings>(configuration.GetSection(RabbitMqSettings.SectionName));

        services.AddMassTransit(x =>
        {
            if (consumersAssembly != null)
            {
                x.AddConsumers(consumersAssembly);
            }

            x.SetKebabCaseEndpointNameFormatter();

            x.UsingRabbitMq((context, cfg) =>
            {
                var settings = context.GetRequiredService<IOptions<RabbitMqSettings>>().Value;

                cfg.Host(settings.Host, settings.Port, "/", h =>
                {
                    h.Username(settings.Username);
                    h.Password(settings.Password);
                });

                cfg.ConfigureEndpoints(context);
            });
        });

        return services;
    }

    public static IServiceCollection AddKafkaBroker(
        this IServiceCollection services,
        IConfiguration configuration,
        Assembly? consumersAssembly = null)
    {
        services.Configure<KafkaSettings>(configuration.GetSection(KafkaSettings.SectionName));

        services.AddMassTransit(x =>
        {
            x.SetKebabCaseEndpointNameFormatter();

            x.AddRider(rider =>
            {
                if (consumersAssembly != null)
                {
                    rider.AddConsumers(consumersAssembly);
                }

                rider.UsingKafka((context, k) =>
                {
                    var kafkaSettings = context.GetRequiredService<IOptions<KafkaSettings>>().Value;
                    k.Host(kafkaSettings.Host);
                });
            });

            // Using InMemory as the dummy primary transport since Kafka is a Rider
            x.UsingInMemory((context, cfg) =>
            {
                cfg.ConfigureEndpoints(context);
            });
        });

        return services;
    }
}
