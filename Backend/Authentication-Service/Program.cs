using Microsoft.EntityFrameworkCore;
using Authentication_Service.DatabaseConfiguration;
using Shared.Helpers.Interfaces;
using Shared.Helpers.Implements;
using FluentValidation;
using Asp.Versioning;
using Authentication_Service;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddDbContext<AuthenticationServiceDbContext>(options =>
    options.UseNpgsql(builder.Configuration["Database:ConnectionString"]));

builder.Services.AddApplicationServices();

builder.Services.AddMediatR(cfg => cfg.RegisterServicesFromAssembly(typeof(Program).Assembly));

builder.Services.AddValidatorsFromAssembly(typeof(Program).Assembly);

builder.Services.AddApiVersioning(options =>
{
    options.DefaultApiVersion = new ApiVersion(1, 0);
    options.AssumeDefaultVersionWhenUnspecified = true;
    options.ReportApiVersions = true;
}).AddMvc();

builder.Services.AddControllers();
builder.Services.AddSwaggerGen();

var app = builder.Build();

app.UseHttpsRedirection();

app.UseSwagger();
app.UseSwaggerUI();
app.MapControllers();

app.Run();