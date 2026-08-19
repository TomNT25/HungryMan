using System.Net.Mime;
using System.Text.Json;
using FluentValidation;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Shared.Models;

namespace AuthenticationService.API.Middlewares;

public class GlobalExceptionMiddleware
{
    private readonly RequestDelegate _next;
    private readonly ILogger<GlobalExceptionMiddleware> _logger;
    private readonly IHostEnvironment _env;

    public GlobalExceptionMiddleware(RequestDelegate next, ILogger<GlobalExceptionMiddleware> logger, IHostEnvironment env)
    {
        _next = next;
        _logger = logger;
        _env = env;
    }

    public async Task InvokeAsync(HttpContext context)
    {
        try
        {
            await _next(context);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "An unhandled exception occurred: {Message}", ex.Message);
            await HandleExceptionAsync(context, ex);
        }
    }

    private async Task HandleExceptionAsync(HttpContext context, Exception exception)
    {
        context.Response.ContentType = MediaTypeNames.Application.Json;

        var (statusCode, message, errors) = exception switch
        {
            ValidationException valEx => (
                StatusCodes.Status400BadRequest,
                "Validation failed",
                valEx.Errors.Select(e => e.ErrorMessage).ToList()
            ),
            UnauthorizedAccessException => (
                StatusCodes.Status401Unauthorized,
                exception.Message,
                null
            ),
            KeyNotFoundException => (
                StatusCodes.Status404NotFound,
                exception.Message,
                null
            ),
            ArgumentException or InvalidOperationException => (
                StatusCodes.Status400BadRequest,
                exception.Message,
                null
            ),
            _ => (
                StatusCodes.Status500InternalServerError,
                _env.IsDevelopment() ? exception.Message : "An unexpected error occurred.",
                null
            )
        };

        context.Response.StatusCode = statusCode;

        var response = BaseAPIResponse<object>.Failure(message, statusCode, errors);

        var options = new JsonSerializerOptions
        {
            PropertyNamingPolicy = JsonNamingPolicy.CamelCase
        };

        var json = JsonSerializer.Serialize(response, options);
        await context.Response.WriteAsync(json);
    }
}
