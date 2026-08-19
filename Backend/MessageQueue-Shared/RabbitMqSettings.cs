namespace MessageQueue_Service;

public class RabbitMqSettings
{
    public const string SectionName = "RabbitMq";
    
    public string Host { get; set; } = string.Empty;
    public string Username { get; set; } = string.Empty;
    public string Password { get; set; } = string.Empty;
    public ushort Port { get; set; } = 5672;
}
