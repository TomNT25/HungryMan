using Ocelot.DependencyInjection;
using Ocelot.Middleware;
using API_GATEWAY.Middlewares;
using API_GATEWAY.Configuration;
using Serilog;

var builder = WebApplication.CreateBuilder(args);

builder.Host.UseSerilog((context, services, configuration) =>
{
    configuration.ReadFrom.Configuration(context.Configuration);
});

builder.Configuration.AddOcelotWithPlaceholders("Ocelot/ocelot.json", builder.Configuration);
builder.Services.AddOcelot(builder.Configuration);

builder.Services.AddDownstreamHealthChecks(builder.Configuration);

var app = builder.Build();

app.UseHttpsRedirection();
app.UseMiddleware<TraceIdMiddleware>();

app.UseRouting();
app.UseEndpoints(endpoints =>
{
    endpoints.MapHealthChecks("/health", new Microsoft.AspNetCore.Diagnostics.HealthChecks.HealthCheckOptions
    {
        ResponseWriter = async (context, report) =>
        {
            context.Response.ContentType = "application/json";
            var result = System.Text.Json.JsonSerializer.Serialize(new
            {
                status = report.Status.ToString(),
                checks = report.Entries.Select(e => new
                {
                    service = e.Key,
                    status = e.Value.Status.ToString(),
                    error = e.Value.Exception?.Message
                })
            });
            await context.Response.WriteAsync(result);
        }
    });
});

app.Use(async (context, next) =>
{
    if (!context.Request.Headers.ContainsKey("X-Forwarded-For"))
    {
        var remoteIp = context.Connection.RemoteIpAddress?.ToString() ?? "unknown";
        context.Request.Headers["X-Forwarded-For"] = remoteIp;
    }
    await next();
});

await app.UseOcelot();

app.Run();
