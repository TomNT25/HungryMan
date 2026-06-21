using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using AuthenticationService.Infrastructure.Interceptors;

namespace AuthenticationService.Infrastructure.DatabaseConfiguration;

public static class AuthenticationServiceDbConfiguration
{
    public static IServiceCollection AddDatabaseConfiguration(this IServiceCollection services, IConfiguration configuration)
    {
        var dbOptions = new DatabaseOptions();
        configuration.GetSection("Database").Bind(dbOptions);

        // Register EF Core Interceptors
        services.AddSingleton<AuditableEntitySaveChangesInterceptor>();
        services.AddSingleton<LoggingDbCommandInterceptor>();
        services.AddSingleton<LoggingDbConnectionInterceptor>();
        services.AddSingleton<LoggingDbTransactionInterceptor>();

        services.AddDbContextPool<AuthenticationServiceDbContext>((serviceProvider, options) =>
        {
            options.UseNpgsql(dbOptions.ConnectionString, npgsqlOptions =>
            {
                npgsqlOptions.CommandTimeout(dbOptions.CommandTimeout);
                npgsqlOptions.EnableRetryOnFailure(
                    maxRetryCount: dbOptions.MaxRetryCount,
                    maxRetryDelay: TimeSpan.FromSeconds(dbOptions.MaxRetryDelay),
                    errorCodesToAdd: null);

                if (dbOptions.EnableQuerySplitting)
                {
                    npgsqlOptions.UseQuerySplittingBehavior(QuerySplittingBehavior.SplitQuery);
                }
            });

            if (dbOptions.EnableSensitiveDataLogging)
            {
                options.EnableSensitiveDataLogging();
            }

            options.AddInterceptors(
                serviceProvider.GetRequiredService<AuditableEntitySaveChangesInterceptor>(),
                serviceProvider.GetRequiredService<LoggingDbCommandInterceptor>(),
                serviceProvider.GetRequiredService<LoggingDbConnectionInterceptor>(),
                serviceProvider.GetRequiredService<LoggingDbTransactionInterceptor>()
            );
        }, dbOptions.PoolSize);

        return services;
    }
}
