FROM mcr.microsoft.com/dotnet/aspnet:10.0 AS base
WORKDIR /app
EXPOSE 8080
EXPOSE 8081

FROM mcr.microsoft.com/dotnet/sdk:10.0 AS build
ARG BUILD_CONFIGURATION=Release
WORKDIR /src

COPY ["Shared/Shared.csproj", "Shared/"]
COPY ["Authentication-Service/AuthenticationService.Domain/AuthenticationService.Domain.csproj", "Authentication-Service/AuthenticationService.Domain/"]
COPY ["Authentication-Service/AuthenticationService.Application/AuthenticationService.Application.csproj", "Authentication-Service/AuthenticationService.Application/"]
COPY ["Authentication-Service/AuthenticationService.Infrastructure/AuthenticationService.Infrastructure.csproj", "Authentication-Service/AuthenticationService.Infrastructure/"]
COPY ["Authentication-Service/AuthenticationService.API/AuthenticationService.API.csproj", "Authentication-Service/AuthenticationService.API/"]

RUN dotnet restore "Authentication-Service/AuthenticationService.API/AuthenticationService.API.csproj"

COPY . .
WORKDIR "/src/Authentication-Service/AuthenticationService.API"
RUN dotnet build "AuthenticationService.API.csproj" -c $BUILD_CONFIGURATION -o /app/build

FROM build AS publish
ARG BUILD_CONFIGURATION=Release
RUN dotnet publish "AuthenticationService.API.csproj" -c $BUILD_CONFIGURATION -o /app/publish /p:UseAppHost=false

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "AuthenticationService.API.dll"]
