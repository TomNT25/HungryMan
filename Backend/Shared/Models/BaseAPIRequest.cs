using System;

namespace Shared.Models;

public class BaseAPIRequest<T>
{
    public T Data { get; set; } = default!;
    public string RequestId { get; set; } = Guid.NewGuid().ToString();
    public DateTime Timestamp { get; set; } = DateTime.UtcNow;
}