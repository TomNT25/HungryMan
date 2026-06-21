using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;

namespace API_GATEWAY.Middlewares;

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
        if (!context.Request.Headers.TryGetValue(TraceIdHeader, out var traceId))
        {
            traceId = Guid.NewGuid().ToString();
            context.Request.Headers.Append(TraceIdHeader, traceId);
            _logger.LogInformation("Generated new TraceId: {TraceId}", traceId);
        }
        else
        {
            _logger.LogInformation("Received existing TraceId: {TraceId}", traceId);
        }

        context.Response.OnStarting(() =>
        {
            if (!context.Response.Headers.ContainsKey(TraceIdHeader))
            {
                context.Response.Headers.Append(TraceIdHeader, traceId);
            }
            return Task.CompletedTask;
        });

        await _next(context);
    }
}
