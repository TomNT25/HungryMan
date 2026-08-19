# Graph Report - .  (2026-07-30)

## Corpus Check
- cluster-only mode — file stats not available

## Summary
- 650 nodes · 966 edges · 26 communities (25 shown, 1 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 13 edges (avg confidence: 0.8)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `0a2ee518`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- Repository
- AuthenticationService.API
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
- `IUserPermissionRepository` --implements--> `IRepository`  [EXTRACTED]
  Backend/Authentication-Service/AuthenticationService.Application/Interfaces/IUserPermissionRepository.cs → Backend/Authentication-Service/AuthenticationService.Application/Interfaces/IRepository.cs
- `IUserRepository` --implements--> `IRepository`  [EXTRACTED]
  Backend/Authentication-Service/AuthenticationService.Application/Interfaces/IUserRepository.cs → Backend/Authentication-Service/AuthenticationService.Application/Interfaces/IRepository.cs
- `Permission` --references--> `UserPermission`  [EXTRACTED]
  Backend/Authentication-Service/AuthenticationService.Domain/Entities/Permission.cs → Backend/Authentication-Service/AuthenticationService.Domain/Entities/UserPermission.cs

## Import Cycles
- None detected.

## Communities (26 total, 1 thin omitted)

### Community 0 - "Repository"
Cohesion: 0.05
Nodes (39): IPermissionRepository, IRepository, CancellationToken, IQueryable, List, Task, IRolePermissionRepository, IRoleRepository (+31 more)

### Community 1 - "AuthenticationService.API"
Cohesion: 0.05
Nodes (57): API-GATEWAY, Microsoft.AspNetCore.OpenApi (10.0.9), Serilog.AspNetCore (10.0.0), Serilog.Enrichers.Environment (3.0.1), Serilog.Enrichers.Thread (4.0.0), System.IdentityModel.Tokens.Jwt (8.0.1), Microsoft.NET.Sdk.Web, AuthenticationService.API (+49 more)

### Community 2 - "dotnet-install.sh"
Cohesion: 0.09
Nodes (43): calculate_vars(), check_min_reqs(), combine_paths(), copy_files_or_dirs_from_list(), download(), downloadcurl(), downloadwget(), extract_dotnet_package() (+35 more)

### Community 3 - ".Handle"
Cohesion: 0.05
Nodes (29): ActionResult, Task, LoginHandler, CancellationToken, IConfiguration, string, Task, LoginRequestDTO (+21 more)

### Community 4 - "AuthenticationService.Domain.Entities"
Cohesion: 0.08
Nodes (19): DependencyInjection, IServiceCollection, IUserPermissionRepository, UserPermission, DateTime, DatabaseOptions, DependencyInjection, IConfiguration (+11 more)

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
Cohesion: 0.11
Nodes (21): GetUserByEmailQuery, GetUserByEmailQueryHandler, CancellationToken, Task, IUserRepository, CancellationToken, Task, User (+13 more)

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
Cohesion: 0.16
Nodes (12): ValidationBehavior, CancellationToken, IEnumerable, Task, TestResponse, ValidationBehaviorTests, Fact, Task (+4 more)

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
Cohesion: 0.21
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

## Knowledge Gaps
- **136 isolated node(s):** `AspNetCore.HealthChecks.Uris (9.0.0)`, `Microsoft.AspNetCore.OpenApi (10.0.9)`, `Ocelot (24.1.0)`, `Serilog.AspNetCore (10.0.0)`, `Serilog.Enrichers.Environment (3.0.1)` (+131 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **1 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `AuthenticationService.Infrastructure.DatabaseConfiguration` connect `AuthenticationService.Domain.Entities` to `Repository`, `InitialCreate`, `AuthenticationServiceDbContextTests.cs`, `.SavingChangesAsync`?**
  _High betweenness centrality (0.129) - this node is a cross-community bridge._
- **Why does `AuthenticationService.Application.Interfaces` connect `AuthenticationService.Domain.Entities` to `Repository`?**
  _High betweenness centrality (0.057) - this node is a cross-community bridge._
- **What connects `AspNetCore.HealthChecks.Uris (9.0.0)`, `Microsoft.AspNetCore.OpenApi (10.0.9)`, `Ocelot (24.1.0)` to the rest of the system?**
  _136 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Repository` be split into smaller, more focused modules?**
  _Cohesion score 0.05288207297726071 - nodes in this community are weakly interconnected._
- **Should `AuthenticationService.API` be split into smaller, more focused modules?**
  _Cohesion score 0.0514216575922565 - nodes in this community are weakly interconnected._
- **Should `dotnet-install.sh` be split into smaller, more focused modules?**
  _Cohesion score 0.08521303258145363 - nodes in this community are weakly interconnected._
- **Should `.Handle` be split into smaller, more focused modules?**
  _Cohesion score 0.05079825834542816 - nodes in this community are weakly interconnected._