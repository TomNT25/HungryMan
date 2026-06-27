FROM mcr.microsoft.com/dotnet/aspnet:10.0 AS base
WORKDIR /app
EXPOSE 5132

FROM mcr.microsoft.com/dotnet/sdk:10.0 AS build
ARG BUILD_CONFIGURATION=Release
WORKDIR /src

# Copy project files and restore
COPY ["Shared/Shared.csproj", "Shared/"]
COPY ["API-GATEWAY/API-GATEWAY.csproj", "API-GATEWAY/"]
RUN dotnet restore "API-GATEWAY/API-GATEWAY.csproj"

# Copy source code and build
COPY . .
WORKDIR "/src/API-GATEWAY"
RUN dotnet build "API-GATEWAY.csproj" -c $BUILD_CONFIGURATION -o /app/build

FROM build AS publish
ARG BUILD_CONFIGURATION=Release
RUN dotnet publish "API-GATEWAY.csproj" -c $BUILD_CONFIGURATION -o /app/publish /p:UseAppHost=false

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "API-GATEWAY.dll"]
