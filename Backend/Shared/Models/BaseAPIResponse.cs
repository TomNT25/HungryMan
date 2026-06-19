using System;
using System.Collections.Generic;

namespace Shared.Models;

public class BaseAPIResponse<T>
{
    public bool IsSuccess { get; set; }
    public int StatusCode { get; set; }
    public string? Message { get; set; }
    public T? Data { get; set; }
    public List<string> Errors { get; set; } = new();
    public DateTime Timestamp { get; set; } = DateTime.UtcNow;

    public static BaseAPIResponse<T> Success(T data, string? message = null, int statusCode = 200)
    {
        return new BaseAPIResponse<T>
        {
            IsSuccess = true,
            StatusCode = statusCode,
            Message = message,
            Data = data
        };
    }

    public static BaseAPIResponse<T> Failure(string message, int statusCode = 400, List<string>? errors = null)
    {
        return new BaseAPIResponse<T>
        {
            IsSuccess = false,
            StatusCode = statusCode,
            Message = message,
            Errors = errors ?? new List<string>()
        };
    }
}
