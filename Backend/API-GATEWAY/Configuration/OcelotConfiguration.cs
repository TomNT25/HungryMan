using System;
using System.IO;
using System.Text;
using System.Text.RegularExpressions;
using Microsoft.Extensions.Configuration;

namespace API_GATEWAY.Configuration;

public static class OcelotConfiguration
{
    public static IConfigurationBuilder AddOcelotWithPlaceholders(this IConfigurationBuilder builder, string relativePath, IConfiguration baseConfig)
    {
        var filePath = Path.Combine(Directory.GetCurrentDirectory(), relativePath);
        if (!File.Exists(filePath))
        {
            throw new FileNotFoundException($"Ocelot configuration file not found at: {filePath}");
        }

        var jsonContent = File.ReadAllText(filePath);

        var replacedJson = Regex.Replace(jsonContent, @"""?\{\{([^}]+)\}\}""?", match =>
        {
            var key = match.Groups[1].Value.Trim();
            var value = baseConfig[key];

            if (value == null)
            {
                var envKey = key.Replace(":", "__");
                value = Environment.GetEnvironmentVariable(envKey);
            }

            if (value == null)
            {
                throw new InvalidOperationException($"Configuration key '{key}' was not found in configuration or environment variables.");
            }

            var hasQuotes = match.Value.StartsWith("\"") && match.Value.EndsWith("\"");

            if (hasQuotes)
            {
                if (int.TryParse(value, out _))
                {
                    return value;
                }
                return $"\"{value}\"";
            }

            return value;
        });

        var stream = new MemoryStream(Encoding.UTF8.GetBytes(replacedJson));
        return builder.AddJsonStream(stream);
    }
}
