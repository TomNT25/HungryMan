using System.Data.Common;
using Microsoft.EntityFrameworkCore.Diagnostics;
using Microsoft.Extensions.Logging;

namespace AuthenticationService.Infrastructure.Interceptors;

public class LoggingDbCommandInterceptor : DbCommandInterceptor
{
    private readonly ILogger<LoggingDbCommandInterceptor> _logger;

    public LoggingDbCommandInterceptor(ILogger<LoggingDbCommandInterceptor> logger)
    {
        _logger = logger;
    }

    public override InterceptionResult<DbDataReader> ReaderExecuting(DbCommand command, CommandEventData eventData, InterceptionResult<DbDataReader> result)
    {
        _logger.LogInformation("Executing Reader: {CommandText}", command.CommandText);
        return base.ReaderExecuting(command, eventData, result);
    }

    public override ValueTask<InterceptionResult<DbDataReader>> ReaderExecutingAsync(DbCommand command, CommandEventData eventData, InterceptionResult<DbDataReader> result, CancellationToken cancellationToken = default)
    {
        _logger.LogInformation("Executing Reader Async: {CommandText}", command.CommandText);
        return base.ReaderExecutingAsync(command, eventData, result, cancellationToken);
    }

    public override void CommandFailed(DbCommand command, CommandErrorEventData eventData)
    {
        _logger.LogError(eventData.Exception, "Command Failed: {CommandText}", command.CommandText);
        base.CommandFailed(command, eventData);
    }

    public override Task CommandFailedAsync(DbCommand command, CommandErrorEventData eventData, CancellationToken cancellationToken = default)
    {
        _logger.LogError(eventData.Exception, "Command Failed Async: {CommandText}", command.CommandText);
        return base.CommandFailedAsync(command, eventData, cancellationToken);
    }
}
