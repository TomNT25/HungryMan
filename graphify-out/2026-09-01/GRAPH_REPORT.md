# Graph Report - HungryMan  (2026-08-19)

## Corpus Check
- 134 files · ~26,481 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 723 nodes · 1065 edges · 52 communities (46 shown, 6 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 13 edges (avg confidence: 0.8)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `aa11457b`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- Repository
- API-GATEWAY
- dotnet-install.sh
- .SavingChangesAsync
- AuthenticationService.Domain.Entities
- devDependencies
- compilerOptions
- LoggingDbTransactionInterceptor
- User
- .Login
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
- .AddInfrastructureServices
- LoginValidatorTests
- App.tsx
- AuthenticationServiceDbContextTests.cs
- AuthenticationService.API/DependencyInjection.cs
- Product-Service/Program.cs
- build.js
- AuthenticationService.API
- AuthenticationServiceDbContext
- AuthenticationService.UnitTests
- Shared.csproj
- MessageQueue-Shared.csproj
- AuthenticationService.Application
- AuthenticationService.Infrastructure
- React + TypeScript + Vite
- AuthenticationService.API/Program.cs
- AuthenticationService.Application.Features.v1.Login
- Permission
- Role
- UserPermission
- UserRole
- UserToken
- Backend.slnx
- compilerOptions
- PostgreSQL Database Scripts
- rules/graphify.md
- workflows/graphify.md
- DatabaseOptions.cs
- .Handle
- plugins
- tsconfig.json

## God Nodes (most connected - your core abstractions)
1. `AuthenticationService.Domain.Entities` - 26 edges
2. `say_verbose()` - 25 edges
3. `AuthenticationService.Application.Interfaces` - 21 edges
4. `Repository` - 18 edges
5. `compilerOptions` - 18 edges
6. `AuthenticationService.Infrastructure.DatabaseConfiguration` - 17 edges
7. `say_err()` - 16 edges
8. `IRepository` - 16 edges
9. `AuthenticationService.API` - 15 edges
10. `User` - 15 edges

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

## Communities (52 total, 6 thin omitted)

### Community 0 - "Repository"
Cohesion: 0.14
Nodes (11): IRepository, CancellationToken, IQueryable, List, Task, Repository, CancellationToken, DbSet (+3 more)

### Community 1 - "API-GATEWAY"
Cohesion: 0.17
Nodes (12): API-GATEWAY, net10.0, Microsoft.AspNetCore.OpenApi (10.0.9), Serilog.AspNetCore (10.0.0), Serilog.Enrichers.Environment (3.0.1), Serilog.Enrichers.Thread (4.0.0), System.IdentityModel.Tokens.Jwt (8.0.1), Microsoft.NET.Sdk.Web (+4 more)

### Community 2 - "dotnet-install.sh"
Cohesion: 0.09
Nodes (43): calculate_vars(), check_min_reqs(), combine_paths(), copy_files_or_dirs_from_list(), download(), downloadcurl(), downloadwget(), extract_dotnet_package() (+35 more)

### Community 3 - ".SavingChangesAsync"
Cohesion: 0.25
Nodes (7): AuditableEntitySaveChangesInterceptor, CancellationToken, DbContext, InterceptionResult, ValueTask, DbContextEventData, SaveChangesInterceptor

### Community 4 - "AuthenticationService.Domain.Entities"
Cohesion: 0.38
Nodes (4): AuthenticationService.Domain.Entities, AuthenticationService.Application.Interfaces, AuthenticationService.Infrastructure.DatabaseConfiguration, AuthenticationService.Infrastructure.Repositories

### Community 5 - "devDependencies"
Cohesion: 0.06
Nodes (33): dependencies, lucide-react, react, react-dom, react-router-dom, devDependencies, oxlint, @types/node (+25 more)

### Community 6 - "compilerOptions"
Cohesion: 0.08
Nodes (23): compilerOptions, allowArbitraryExtensions, allowImportingTsExtensions, erasableSyntaxOnly, jsx, lib, module, moduleDetection (+15 more)

### Community 7 - "LoggingDbTransactionInterceptor"
Cohesion: 0.09
Nodes (18): AuthenticationServiceDbConfiguration, IConfiguration, IServiceCollection, LoggingDbConnectionInterceptor, CancellationToken, ILogger, Task, LoggingDbTransactionInterceptor (+10 more)

### Community 8 - "User"
Cohesion: 0.13
Nodes (17): GetUserByEmailQuery, GetUserByEmailQueryHandler, CancellationToken, Task, IUserRepository, CancellationToken, Task, User (+9 more)

### Community 9 - ".Login"
Cohesion: 0.08
Nodes (19): ActionResult, AuthController, ILogger, Task, DateTime, BaseAPIRequest, DateTime, List (+11 more)

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

### Community 20 - ".AddInfrastructureServices"
Cohesion: 0.50
Nodes (3): DependencyInjection, IConfiguration, IServiceCollection

### Community 21 - "LoginValidatorTests"
Cohesion: 0.29
Nodes (4): AbstractValidator, LoginValidator, LoginValidatorTests, Fact

### Community 22 - "App.tsx"
Cohesion: 0.10
Nodes (32): App(), AppContent(), ProtectedRoute(), Hero(), HeroProps, Navbar(), ProductCard(), ProductCardProps (+24 more)

### Community 23 - "AuthenticationServiceDbContextTests.cs"
Cohesion: 0.29
Nodes (5): AuthenticationServiceDbContextTests, Fact, Task, AuthenticationService.UnitTests.Infrastructure, DbContextOptions

### Community 24 - "AuthenticationService.API/DependencyInjection.cs"
Cohesion: 0.40
Nodes (3): DependencyInjection, IServiceCollection, AuthenticationService.API

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

### Community 34 - "React + TypeScript + Vite"
Cohesion: 0.50
Nodes (3): Expanding the Oxlint configuration, React Compiler, React + TypeScript + Vite

### Community 35 - "AuthenticationService.API/Program.cs"
Cohesion: 0.29
Nodes (4): DependencyInjection, IServiceCollection, AuthenticationService.Infrastructure, AuthenticationService.Application

### Community 36 - "AuthenticationService.Application.Features.v1.Login"
Cohesion: 0.43
Nodes (3): Shared.Helpers.Interfaces, AuthenticationService.Application.Features.v1.Login, AuthenticationService.UnitTests.Application.Features.v1.Login

### Community 37 - "Permission"
Cohesion: 0.18
Nodes (9): IPermissionRepository, IRolePermissionRepository, Permission, DateTime, ICollection, RolePermission, DateTime, PermissionRepository (+1 more)

### Community 38 - "Role"
Cohesion: 0.33
Nodes (5): IRoleRepository, Role, DateTime, ICollection, RoleRepository

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

### Community 44 - "compilerOptions"
Cohesion: 0.10
Nodes (19): compilerOptions, allowImportingTsExtensions, erasableSyntaxOnly, lib, module, moduleDetection, noEmit, noFallthroughCasesInSwitch (+11 more)

### Community 45 - "PostgreSQL Database Scripts"
Cohesion: 0.50
Nodes (3): Directory Structure, PostgreSQL Database Scripts, Running Scripts

### Community 49 - ".Handle"
Cohesion: 0.05
Nodes (28): LoginHandler, CancellationToken, IConfiguration, Task, LoginRequestDTO, LoginResponseDTO, TestRequest, LoginHandlerTests (+20 more)

### Community 52 - "plugins"
Cohesion: 0.22
Nodes (8): plugins, rules, react/only-export-components, react/rules-of-hooks, $schema, oxc, typescript, warn

## Knowledge Gaps
- **182 isolated node(s):** `net10.0`, `AspNetCore.HealthChecks.Uris (9.0.0)`, `Microsoft.AspNetCore.OpenApi (10.0.9)`, `Ocelot (24.1.0)`, `Serilog.AspNetCore (10.0.0)` (+177 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **6 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `AuthenticationService.Infrastructure.DatabaseConfiguration` connect `AuthenticationService.Domain.Entities` to `AuthenticationService.API/Program.cs`, `LoggingDbTransactionInterceptor`, `InitialCreate`, `DatabaseOptions.cs`, `AuthenticationServiceDbContextTests.cs`, `AuthenticationServiceDbContext`?**
  _High betweenness centrality (0.104) - this node is a cross-community bridge._
- **Why does `AuthenticationService.Infrastructure.Interceptors` connect `LoggingDbTransactionInterceptor` to `.SavingChangesAsync`?**
  _High betweenness centrality (0.062) - this node is a cross-community bridge._
- **Why does `AuthenticationService.Application.Interfaces` connect `AuthenticationService.Domain.Entities` to `Repository`, `AuthenticationService.Application.Features.v1.Login`, `Permission`, `Role`, `User`, `UserPermission`, `UserRole`, `UserToken`?**
  _High betweenness centrality (0.046) - this node is a cross-community bridge._
- **What connects `net10.0`, `AspNetCore.HealthChecks.Uris (9.0.0)`, `Microsoft.AspNetCore.OpenApi (10.0.9)` to the rest of the system?**
  _182 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Repository` be split into smaller, more focused modules?**
  _Cohesion score 0.13846153846153847 - nodes in this community are weakly interconnected._
- **Should `dotnet-install.sh` be split into smaller, more focused modules?**
  _Cohesion score 0.08521303258145363 - nodes in this community are weakly interconnected._
- **Should `devDependencies` be split into smaller, more focused modules?**
  _Cohesion score 0.058823529411764705 - nodes in this community are weakly interconnected._