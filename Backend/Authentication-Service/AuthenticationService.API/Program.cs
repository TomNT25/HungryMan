using Asp.Versioning;
using AuthenticationService.Application;
using AuthenticationService.Infrastructure;
using AuthenticationService.Infrastructure.DatabaseConfiguration;
using AuthenticationService.API.Middlewares;
using AuthenticationService.API;
using Serilog;

var builder = WebApplication.CreateBuilder(args);

// Configure Serilog
builder.Host.UseSerilog((context, services, configuration) =>
{
    configuration.ReadFrom.Configuration(context.Configuration);
});

// Clean Architecture Dependency Injection
builder.Services.AddApplicationServices();
builder.Services.AddInfrastructureServices(builder.Configuration);
builder.Services.AddApiServices();

var app = builder.Build();

app.UseHttpsRedirection();

app.UseMiddleware<TraceIdMiddleware>();

app.UseSwagger();
app.UseSwaggerUI();

app.MapHealthChecks("/health");

app.MapControllers();

app.Run();