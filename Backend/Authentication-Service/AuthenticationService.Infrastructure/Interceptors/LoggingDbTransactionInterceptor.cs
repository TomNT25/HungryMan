using System.Data.Common;
using Microsoft.EntityFrameworkCore.Diagnostics;
using Microsoft.Extensions.Logging;

namespace AuthenticationService.Infrastructure.Interceptors;

public class LoggingDbTransactionInterceptor : DbTransactionInterceptor
{
    private readonly ILogger<LoggingDbTransactionInterceptor> _logger;

    public LoggingDbTransactionInterceptor(ILogger<LoggingDbTransactionInterceptor> logger)
    {
        _logger = logger;
    }

    public override void TransactionCommitted(DbTransaction transaction, TransactionEndEventData eventData)
    {
        _logger.LogInformation("Database transaction committed. Duration: {Duration}ms", eventData.Duration.TotalMilliseconds);
        base.TransactionCommitted(transaction, eventData);
    }

    public override Task TransactionCommittedAsync(DbTransaction transaction, TransactionEndEventData eventData, CancellationToken cancellationToken = default)
    {
        _logger.LogInformation("Database transaction committed async. Duration: {Duration}ms", eventData.Duration.TotalMilliseconds);
        return base.TransactionCommittedAsync(transaction, eventData, cancellationToken);
    }

    public override void TransactionRolledBack(DbTransaction transaction, TransactionEndEventData eventData)
    {
        _logger.LogWarning("Database transaction rolled back. Duration: {Duration}ms", eventData.Duration.TotalMilliseconds);
        base.TransactionRolledBack(transaction, eventData);
    }

    public override Task TransactionRolledBackAsync(DbTransaction transaction, TransactionEndEventData eventData, CancellationToken cancellationToken = default)
    {
        _logger.LogWarning("Database transaction rolled back async. Duration: {Duration}ms", eventData.Duration.TotalMilliseconds);
        return base.TransactionRolledBackAsync(transaction, eventData, cancellationToken);
    }
}
