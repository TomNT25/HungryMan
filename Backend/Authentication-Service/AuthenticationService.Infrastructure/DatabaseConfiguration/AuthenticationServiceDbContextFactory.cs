using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;
using Microsoft.Extensions.Configuration;
using System.IO;

namespace AuthenticationService.Infrastructure.DatabaseConfiguration;

public class AuthenticationServiceDbContextFactory : IDesignTimeDbContextFactory<AuthenticationServiceDbContext>
{
    public AuthenticationServiceDbContext CreateDbContext(string[] args)
    {
        var builder = new DbContextOptionsBuilder<AuthenticationServiceDbContext>();

        var connectionString = Environment.GetEnvironmentVariable("DB_CONNECTION_STRING")
            ?? "Host=localhost;Database=hungryman_auth;Username=postgres;Password=postgres";
        builder.UseNpgsql(connectionString);

        return new AuthenticationServiceDbContext(builder.Options);
    }
}
