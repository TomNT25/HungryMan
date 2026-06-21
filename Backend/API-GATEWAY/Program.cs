using Ocelot.DependencyInjection;
using Ocelot.Middleware;
using API_GATEWAY.Middlewares;
using API_GATEWAY.Configuration;
using Serilog;

var builder = WebApplication.CreateBuilder(args);

// Configure Serilog
builder.Host.UseSerilog((context, services, configuration) =>
{
    configuration.ReadFrom.Configuration(context.Configuration);
});

builder.Configuration.AddJsonFile("ocelot.json", optional: false, reloadOnChange: true);
builder.Services.AddOcelot(builder.Configuration);

builder.Services.AddDownstreamHealthChecks(builder.Configuration);

var app = builder.Build();

app.UseHttpsRedirection();
app.UseMiddleware<TraceIdMiddleware>();

app.UseRouting();
app.UseEndpoints(endpoints =>
{
    endpoints.MapHealthChecks("/health");
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
