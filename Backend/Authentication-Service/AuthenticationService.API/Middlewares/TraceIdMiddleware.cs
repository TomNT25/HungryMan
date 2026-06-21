using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using Serilog.Context;

namespace AuthenticationService.API.Middlewares;

public class TraceIdMiddleware
{
    private readonly RequestDelegate _next;
    private readonly ILogger<TraceIdMiddleware> _logger;
    private const string TraceIdHeader = "X-Trace-Id";

    public TraceIdMiddleware(RequestDelegate next, ILogger<TraceIdMiddleware> logger)
    {
        _next = next;
        _logger = logger;
    }

    public async Task InvokeAsync(HttpContext context)
    {
        var traceId = context.Request.Headers[TraceIdHeader].FirstOrDefault() ?? Guid.NewGuid().ToString();
        using (LogContext.PushProperty("TraceId", traceId))
        {
            _logger.LogInformation("Injected TraceId {TraceId} into current Serilog scope", traceId);
            await _next(context);
        }
    }
}
