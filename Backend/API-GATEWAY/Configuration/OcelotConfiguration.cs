using System;
using System.IO;
using System.Text;
using System.Text.Json.Nodes;
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

        var baseJson = File.ReadAllText(filePath);
        var baseNode = JsonNode.Parse(baseJson) as JsonObject ?? new JsonObject();

        if (!baseNode.ContainsKey("Routes") || baseNode["Routes"] == null)
        {
            baseNode["Routes"] = new JsonArray();
        }
        var routesArray = baseNode["Routes"] as JsonArray ?? new JsonArray();

        var directory = Path.GetDirectoryName(filePath) ?? Directory.GetCurrentDirectory();
        var ocelotFiles = Directory.GetFiles(directory, "ocelot.*.json");

        foreach (var file in ocelotFiles)
        {
            if (Path.GetFileName(file).Equals(Path.GetFileName(relativePath), StringComparison.OrdinalIgnoreCase))
            {
                continue;
            }

            var content = File.ReadAllText(file);
            var node = JsonNode.Parse(content);
            if (node != null && node["Routes"] is JsonArray routes)
            {
                foreach (var route in routes)
                {
                    if (route != null)
                    {
                        routesArray.Add(route.DeepClone());
                    }
                }
            }
        }

        var mergedJson = baseNode.ToJsonString();

        var replacedJson = Regex.Replace(mergedJson, @"""?\{\{([^}]+)\}\}""?", match =>
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
