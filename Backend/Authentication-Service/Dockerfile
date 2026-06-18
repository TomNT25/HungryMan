# Base image for runtime
FROM mcr.microsoft.com/dotnet/aspnet:10.0 AS base
WORKDIR /app
EXPOSE 8080
EXPOSE 8081

# SDK image for building
FROM mcr.microsoft.com/dotnet/sdk:10.0 AS build
ARG BUILD_CONFIGURATION=Release
WORKDIR /src

# Copy project file and restore
COPY ["Authentication-Service.csproj", "."]
RUN dotnet restore "./Authentication-Service.csproj"

# Copy all source files and build
COPY . .
RUN dotnet build "./Authentication-Service.csproj" -c $BUILD_CONFIGURATION -o /app/build

# Publish release
FROM build AS publish
ARG BUILD_CONFIGURATION=Release
RUN dotnet publish "./Authentication-Service.csproj" -c $BUILD_CONFIGURATION -o /app/publish /p:UseAppHost=false

# Final image
FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "Authentication-Service.dll"]
