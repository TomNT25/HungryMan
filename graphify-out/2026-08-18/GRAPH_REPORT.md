# Graph Report - HungryMan  (2026-08-04)

## Corpus Check
- 129 files · ~20,890 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 680 nodes · 977 edges · 49 communities (45 shown, 4 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 13 edges (avg confidence: 0.8)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `0a2ee518`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- IRepository
- API-GATEWAY
- dotnet-install.sh
- .Handle
- AuthenticationService.Domain.Entities
- dependencies
- Frontend
- .SavingChangesAsync
- User
- BaseAPIResponse
- TraceIdMiddleware
- GlobalExceptionMiddleware
- .Handle
- http
- http
- InitialCreate
- http
- http
- LoggingDbCommandInterceptor
- .AddKafkaBroker
- LoggingDbTransactionInterceptor
- LoginValidatorTests
- App
- AuthenticationServiceDbContextTests.cs
- AuthenticationService.API/DependencyInjection.cs
- Product-Service/Program.cs
- Repository
- AuthenticationService.API
- AuthenticationServiceDbContext
- AuthenticationService.UnitTests
- Shared.csproj
- MessageQueue-Shared.csproj
- AuthenticationService.Application
- AuthenticationService.Infrastructure
- Frontend
- AuthenticationService.API/Program.cs
- AuthenticationService.Application.Features.v1.Login
- Permission
- Role
- RolePermission
- UserPermission
- UserRole
- UserToken
- Backend.slnx
- .AddInfrastructureServices
- PostgreSQL Database Scripts
- rules/graphify.md
- workflows/graphify.md
- DatabaseOptions.cs

## God Nodes (most connected - your core abstractions)
1. `AuthenticationService.Domain.Entities` - 26 edges
2. `say_verbose()` - 25 edges
3. `AuthenticationService.Application.Interfaces` - 21 edges
4. `Repository` - 18 edges
5. `AuthenticationService.Infrastructure.DatabaseConfiguration` - 17 edges
6. `say_err()` - 16 edges
7. `IRepository` - 16 edges
8. `AuthenticationService.API` - 15 edges
9. `User` - 15 edges
10. `AuthenticationServiceDbContext` - 15 edges

## Surprising Connections (you probably didn't know these)
- `LoginHandler` --references--> `IUserRepository`  [EXTRACTED]
  Backend/Authentication-Service/AuthenticationService.Application/Features/v1/Login/LoginHandler.cs → Backend/Authentication-Service/AuthenticationService.Application/Interfaces/IUserRepository.cs
- `LoginValidator` --references--> `LoginRequestDTO`  [EXTRACTED]
  Backend/Authentication-Service/AuthenticationService.Application/Features/v1/Login/LoginValidator.cs → Backend/Authentication-Service/AuthenticationService.Application/Features/v1/Login/LoginRequestDTO.cs
- `IPermissionRepository` --implements--> `IRepository`  [EXTRACTED]
  Backend/Authentication-Service/AuthenticationService.Application/Interfaces/IPermissionRepository.cs → Backend/Authentication-Service/AuthenticationService.Application/Interfaces/IRepository.cs
- `IRolePermissionRepository` --implements--> `IRepository`  [EXTRACTED]
  Backend/Authentication-Service/AuthenticationService.Application/Interfaces/IRolePermissionRepository.cs → Backend/Authentication-Service/AuthenticationService.Application/Interfaces/IRepository.cs
- `IRoleRepository` --implements--> `IRepository`  [EXTRACTED]
  Backend/Authentication-Service/AuthenticationService.Application/Interfaces/IRoleRepository.cs → Backend/Authentication-Service/AuthenticationService.Application/Interfaces/IRepository.cs

## Import Cycles
- None detected.

## Communities (49 total, 4 thin omitted)

### Community 0 - "IRepository"
Cohesion: 0.28
Nodes (5): IRepository, CancellationToken, IQueryable, List, Task

### Community 1 - "API-GATEWAY"
Cohesion: 0.17
Nodes (12): API-GATEWAY, net10.0, Microsoft.AspNetCore.OpenApi (10.0.9), Serilog.AspNetCore (10.0.0), Serilog.Enrichers.Environment (3.0.1), Serilog.Enrichers.Thread (4.0.0), System.IdentityModel.Tokens.Jwt (8.0.1), Microsoft.NET.Sdk.Web (+4 more)

### Community 2 - "dotnet-install.sh"
Cohesion: 0.09
Nodes (43): calculate_vars(), check_min_reqs(), combine_paths(), copy_files_or_dirs_from_list(), download(), downloadcurl(), downloadwget(), extract_dotnet_package() (+35 more)

### Community 3 - ".Handle"
Cohesion: 0.05
Nodes (29): ActionResult, Task, LoginHandler, CancellationToken, IConfiguration, Task, LoginRequestDTO, LoginResponseDTO (+21 more)

### Community 4 - "AuthenticationService.Domain.Entities"
Cohesion: 0.38
Nodes (4): AuthenticationService.Domain.Entities, AuthenticationService.Application.Interfaces, AuthenticationService.Infrastructure.DatabaseConfiguration, AuthenticationService.Infrastructure.Repositories

### Community 5 - "dependencies"
Cohesion: 0.05
Nodes (42): @angular/build, @angular/cli, @angular/common, @angular/compiler, @angular/compiler-cli, @angular/core, @angular/forms, @angular/platform-browser (+34 more)

### Community 6 - "Frontend"
Cohesion: 0.05
Nodes (38): build, serve, test, builder, configurations, defaultConfiguration, options, cli (+30 more)

### Community 7 - ".SavingChangesAsync"
Cohesion: 0.09
Nodes (18): AuthenticationServiceDbConfiguration, IConfiguration, IServiceCollection, AuditableEntitySaveChangesInterceptor, CancellationToken, DbContext, InterceptionResult, ValueTask (+10 more)

### Community 8 - "User"
Cohesion: 0.13
Nodes (17): GetUserByEmailQuery, GetUserByEmailQueryHandler, CancellationToken, Task, IUserRepository, CancellationToken, Task, User (+9 more)

### Community 9 - "BaseAPIResponse"
Cohesion: 0.10
Nodes (15): AuthController, ILogger, DateTime, BaseAPIRequest, DateTime, List, BaseAPIResponse, int (+7 more)

### Community 10 - "TraceIdMiddleware"
Cohesion: 0.10
Nodes (14): HealthConfiguration, IConfiguration, IServiceCollection, OcelotConfiguration, IConfiguration, TraceIdMiddleware, HttpContext, ILogger (+6 more)

### Community 11 - "GlobalExceptionMiddleware"
Cohesion: 0.12
Nodes (14): GlobalExceptionMiddleware, HttpContext, ILogger, RequestDelegate, Task, TraceIdMiddleware, HttpContext, ILogger (+6 more)

### Community 12 - ".Handle"
Cohesion: 0.13
Nodes (15): ValidationBehavior, CancellationToken, IEnumerable, Task, TestRequest, TestResponse, ValidationBehaviorTests, Fact (+7 more)

### Community 13 - "http"
Cohesion: 0.13
Nodes (15): ASPNETCORE_ENVIRONMENT, applicationUrl, commandName, dotnetRunMessages, environmentVariables, launchBrowser, applicationUrl, commandName (+7 more)

### Community 14 - "http"
Cohesion: 0.13
Nodes (15): ASPNETCORE_ENVIRONMENT, applicationUrl, commandName, dotnetRunMessages, environmentVariables, launchBrowser, applicationUrl, commandName (+7 more)

### Community 15 - "InitialCreate"
Cohesion: 0.13
Nodes (9): InitialCreate, InitialCreate, ModelBuilder, AuthenticationServiceDbContextModelSnapshot, ModelBuilder, AuthenticationService.Infrastructure.DatabaseConfiguration.Migrations, Migration, MigrationBuilder (+1 more)

### Community 16 - "http"
Cohesion: 0.13
Nodes (15): ASPNETCORE_ENVIRONMENT, applicationUrl, commandName, dotnetRunMessages, environmentVariables, launchBrowser, applicationUrl, commandName (+7 more)

### Community 17 - "http"
Cohesion: 0.13
Nodes (15): ASPNETCORE_ENVIRONMENT, applicationUrl, commandName, dotnetRunMessages, environmentVariables, launchBrowser, applicationUrl, commandName (+7 more)

### Community 18 - "LoggingDbCommandInterceptor"
Cohesion: 0.19
Nodes (11): LoggingDbCommandInterceptor, CancellationToken, ILogger, InterceptionResult, Task, ValueTask, CommandErrorEventData, CommandEventData (+3 more)

### Community 19 - ".AddKafkaBroker"
Cohesion: 0.18
Nodes (9): Assembly, IConfiguration, IServiceCollection, DependencyInjection, string, KafkaSettings, string, RabbitMqSettings (+1 more)

### Community 20 - "LoggingDbTransactionInterceptor"
Cohesion: 0.33
Nodes (7): LoggingDbTransactionInterceptor, CancellationToken, ILogger, Task, DbTransaction, DbTransactionInterceptor, TransactionEndEventData

### Community 21 - "LoginValidatorTests"
Cohesion: 0.29
Nodes (4): AbstractValidator, LoginValidator, LoginValidatorTests, Fact

### Community 22 - "App"
Cohesion: 0.33
Nodes (4): Component, App, appConfig, routes

### Community 23 - "AuthenticationServiceDbContextTests.cs"
Cohesion: 0.29
Nodes (5): AuthenticationServiceDbContextTests, Fact, Task, AuthenticationService.UnitTests.Infrastructure, DbContextOptions

### Community 24 - "AuthenticationService.API/DependencyInjection.cs"
Cohesion: 0.40
Nodes (3): DependencyInjection, IServiceCollection, AuthenticationService.API

### Community 26 - "Repository"
Cohesion: 0.28
Nodes (6): Repository, CancellationToken, DbSet, IQueryable, List, Task

### Community 27 - "AuthenticationService.API"
Cohesion: 0.17
Nodes (12): AuthenticationService.API, net10.0, Microsoft.AspNetCore.OpenApi (10.0.9), Serilog.AspNetCore (10.0.0), Serilog.Enrichers.Environment (3.0.1), Serilog.Enrichers.Thread (4.0.0), Microsoft.NET.Sdk.Web, Asp.Versioning.Mvc (10.0.0) (+4 more)

### Community 28 - "AuthenticationServiceDbContext"
Cohesion: 0.22
Nodes (6): AuthenticationServiceDbContext, DbSet, ModelBuilder, AuthenticationServiceDbContextFactory, DbContext, IDesignTimeDbContextFactory

### Community 29 - "AuthenticationService.UnitTests"
Cohesion: 0.20
Nodes (10): AuthenticationService.UnitTests, net10.0, Microsoft.NET.Sdk, coverlet.collector (6.0.4), FluentAssertions (8.10.0), Microsoft.EntityFrameworkCore.InMemory (10.0.9), Microsoft.NET.Test.Sdk (17.14.1), Moq (4.20.72) (+2 more)

### Community 30 - "Shared.csproj"
Cohesion: 0.22
Nodes (8): AuthenticationService.Domain, net10.0, Microsoft.NET.Sdk, net10.0, System.IdentityModel.Tokens.Jwt (8.19.1), Microsoft.NET.Sdk, BCrypt.Net-Next (4.2.0), Microsoft.Extensions.Configuration.Abstractions (10.0.9)

### Community 31 - "MessageQueue-Shared.csproj"
Cohesion: 0.22
Nodes (8): net10.0, Microsoft.NET.Sdk, MassTransit (9.1.2), MassTransit.Kafka (9.1.2), MassTransit.RabbitMQ (9.1.2), Microsoft.Extensions.Configuration (10.0.9), Microsoft.Extensions.DependencyInjection (10.0.9), Microsoft.Extensions.Options.ConfigurationExtensions (10.0.9)

### Community 32 - "AuthenticationService.Application"
Cohesion: 0.25
Nodes (8): AuthenticationService.Application, net10.0, Scrutor (7.0.0), Microsoft.NET.Sdk, FluentValidation (12.1.1), FluentValidation.DependencyInjectionExtensions (12.1.1), MediatR (14.1.0), Microsoft.EntityFrameworkCore (10.0.2)

### Community 33 - "AuthenticationService.Infrastructure"
Cohesion: 0.25
Nodes (8): AuthenticationService.Infrastructure, net10.0, Scrutor (7.0.0), Microsoft.NET.Sdk, Microsoft.EntityFrameworkCore.Design (10.0.0), Microsoft.Extensions.Configuration.Binder (10.0.9), Microsoft.Extensions.Diagnostics.HealthChecks.EntityFrameworkCore (10.0.9), Npgsql.EntityFrameworkCore.PostgreSQL (10.0.2)

### Community 34 - "Frontend"
Cohesion: 0.25
Nodes (7): Additional Resources, Building, Code scaffolding, Development server, Frontend, Running end-to-end tests, Running unit tests

### Community 35 - "AuthenticationService.API/Program.cs"
Cohesion: 0.29
Nodes (4): DependencyInjection, IServiceCollection, AuthenticationService.Infrastructure, AuthenticationService.Application

### Community 36 - "AuthenticationService.Application.Features.v1.Login"
Cohesion: 0.43
Nodes (3): Shared.Helpers.Interfaces, AuthenticationService.Application.Features.v1.Login, AuthenticationService.UnitTests.Application.Features.v1.Login

### Community 37 - "Permission"
Cohesion: 0.33
Nodes (5): IPermissionRepository, Permission, DateTime, ICollection, PermissionRepository

### Community 38 - "Role"
Cohesion: 0.33
Nodes (5): IRoleRepository, Role, DateTime, ICollection, RoleRepository

### Community 39 - "RolePermission"
Cohesion: 0.40
Nodes (4): IRolePermissionRepository, RolePermission, DateTime, RolePermissionRepository

### Community 40 - "UserPermission"
Cohesion: 0.40
Nodes (4): IUserPermissionRepository, UserPermission, DateTime, UserPermissionRepository

### Community 41 - "UserRole"
Cohesion: 0.40
Nodes (4): IUserRoleRepository, UserRole, DateTime, UserRoleRepository

### Community 42 - "UserToken"
Cohesion: 0.40
Nodes (4): IUserTokenRepository, UserToken, DateTime, UserTokenRepository

### Community 43 - "Backend.slnx"
Cohesion: 0.40
Nodes (3): net10.0, Microsoft.AspNetCore.OpenApi (10.0.9), Microsoft.NET.Sdk.Web

### Community 44 - ".AddInfrastructureServices"
Cohesion: 0.50
Nodes (3): DependencyInjection, IConfiguration, IServiceCollection

### Community 45 - "PostgreSQL Database Scripts"
Cohesion: 0.50
Nodes (3): Directory Structure, PostgreSQL Database Scripts, Running Scripts

## Knowledge Gaps
- **164 isolated node(s):** `net10.0`, `AspNetCore.HealthChecks.Uris (9.0.0)`, `Microsoft.AspNetCore.OpenApi (10.0.9)`, `Ocelot (24.1.0)`, `Serilog.AspNetCore (10.0.0)` (+159 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **4 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `AuthenticationService.Infrastructure.DatabaseConfiguration` connect `AuthenticationService.Domain.Entities` to `AuthenticationService.API/Program.cs`, `.SavingChangesAsync`, `InitialCreate`, `DatabaseOptions.cs`, `AuthenticationServiceDbContextTests.cs`, `AuthenticationServiceDbContext`?**
  _High betweenness centrality (0.117) - this node is a cross-community bridge._
- **Why does `AuthenticationService.Infrastructure.Interceptors` connect `.SavingChangesAsync` to `LoggingDbCommandInterceptor`?**
  _High betweenness centrality (0.070) - this node is a cross-community bridge._
- **Why does `AuthenticationService.Application.Interfaces` connect `AuthenticationService.Domain.Entities` to `IRepository`, `AuthenticationService.Application.Features.v1.Login`, `Permission`, `Role`, `RolePermission`, `User`, `UserPermission`, `UserRole`, `UserToken`?**
  _High betweenness centrality (0.052) - this node is a cross-community bridge._
- **What connects `net10.0`, `AspNetCore.HealthChecks.Uris (9.0.0)`, `Microsoft.AspNetCore.OpenApi (10.0.9)` to the rest of the system?**
  _164 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `dotnet-install.sh` be split into smaller, more focused modules?**
  _Cohesion score 0.08521303258145363 - nodes in this community are weakly interconnected._
- **Should `.Handle` be split into smaller, more focused modules?**
  _Cohesion score 0.05079825834542816 - nodes in this community are weakly interconnected._
- **Should `dependencies` be split into smaller, more focused modules?**
  _Cohesion score 0.046511627906976744 - nodes in this community are weakly interconnected._