namespace MessageQueue_Service;

public class KafkaSettings
{
    public const string SectionName = "Kafka";
    
    public string Host { get; set; } = string.Empty;
    public ushort Port { get; set; } = 9092;
}
