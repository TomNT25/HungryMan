# Graph Report - HungryMan  (2026-09-02)

## Corpus Check
- 181 files · ~28,257 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 869 nodes · 1377 edges · 58 communities (52 shown, 6 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 13 edges (avg confidence: 0.8)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `77785e74`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- IRepository
- API-GATEWAY
- dotnet-install.sh
- Product
- AuthenticationService.Domain.Entities
- devDependencies
- compilerOptions
- .SavingChangesAsync
- User
- App.tsx
- TraceIdMiddleware
- GlobalExceptionMiddleware
- .Handle
- http
- http
- InitialCreate
- http
- http
- ⚛️ Comprehensive React & Frontend Architecture Guide
- .AddKafkaBroker
- presentation/context/CartContext.tsx
- LoginValidatorTests
- presentation/context/AuthContext.tsx
- AuthenticationServiceDbContextTests.cs
- AuthenticationService.API/Program.cs
- Product-Service/Program.cs
- build.js
- AuthenticationService.API
- AuthenticationServiceDbContext
- AuthenticationService.UnitTests
- Shared.csproj
- MessageQueue-Shared.csproj
- AuthenticationService.Application
- AuthenticationService.Infrastructure
- HungryMan - React + TypeScript Clean Architecture Storefront
- AuthenticationService.Application/DependencyInjection.cs
- LoggingDbCommandInterceptor
- Permission
- Role
- LoginHandler
- Repository
- LoggingDbTransactionInterceptor
- UserToken
- Backend.slnx
- compilerOptions
- PostgreSQL Database Scripts
- rules/graphify.md
- workflows/graphify.md
- .Login
- Shared.Helpers.Interfaces
- IJwtService
- Clean Architecture & Technical Method Guide
- plugins
- .Handle
- tsconfig.json
- JwtService
- RolePermission

## God Nodes (most connected - your core abstractions)
1. `AuthenticationService.Domain.Entities` - 26 edges
2. `say_verbose()` - 25 edges
3. `AuthenticationService.Application.Interfaces` - 21 edges
4. `Product` - 21 edges
5. `Repository` - 18 edges
6. `compilerOptions` - 18 edges
7. `AuthenticationService.Infrastructure.DatabaseConfiguration` - 17 edges
8. `CartItem` - 17 edges
9. `say_err()` - 16 edges
10. `IRepository` - 16 edges

## Surprising Connections (you probably didn't know these)
- `LoginHandler` --references--> `IUserRepository`  [EXTRACTED]
  Backend/Authentication-Service/AuthenticationService.Application/Features/v1/Login/LoginHandler.cs → Backend/Authentication-Service/AuthenticationService.Application/Interfaces/IUserRepository.cs
- `LoginHandler` --references--> `IJwtService`  [EXTRACTED]
  Backend/Authentication-Service/AuthenticationService.Application/Features/v1/Login/LoginHandler.cs → Backend/Shared/Helpers/Interfaces/IJwtService.cs
- `LoginHandler` --references--> `IPasswordHasher`  [EXTRACTED]
  Backend/Authentication-Service/AuthenticationService.Application/Features/v1/Login/LoginHandler.cs → Backend/Shared/Helpers/Interfaces/IPasswordHasher.cs
- `LoginHandlerTests` --references--> `LoginHandler`  [EXTRACTED]
  Backend/Authentication-Service/AuthenticationService.UnitTests/Application/Features/v1/Login/LoginHandlerTests.cs → Backend/Authentication-Service/AuthenticationService.Application/Features/v1/Login/LoginHandler.cs
- `LoginValidatorTests` --references--> `LoginValidator`  [EXTRACTED]
  Backend/Authentication-Service/AuthenticationService.UnitTests/Application/Features/v1/Login/LoginValidatorTests.cs → Backend/Authentication-Service/AuthenticationService.Application/Features/v1/Login/LoginValidator.cs

## Import Cycles
- None detected.

## Communities (58 total, 6 thin omitted)

### Community 0 - "IRepository"
Cohesion: 0.28
Nodes (5): IRepository, CancellationToken, IQueryable, List, Task

### Community 1 - "API-GATEWAY"
Cohesion: 0.17
Nodes (12): API-GATEWAY, net10.0, Microsoft.AspNetCore.OpenApi (10.0.9), Serilog.AspNetCore (10.0.0), Serilog.Enrichers.Environment (3.0.1), Serilog.Enrichers.Thread (4.0.0), System.IdentityModel.Tokens.Jwt (8.0.1), Microsoft.NET.Sdk.Web (+4 more)

### Community 2 - "dotnet-install.sh"
Cohesion: 0.09
Nodes (43): calculate_vars(), check_min_reqs(), combine_paths(), copy_files_or_dirs_from_list(), download(), downloadcurl(), downloadwget(), extract_dotnet_package() (+35 more)

### Community 3 - "Product"
Cohesion: 0.15
Nodes (12): Category, Product, IProductRepository, GetCatalogUseCase, BaseAPIRequest, BaseAPIResponse, HttpClient, MOCK_CATEGORIES (+4 more)

### Community 4 - "AuthenticationService.Domain.Entities"
Cohesion: 0.18
Nodes (6): DatabaseOptions, AuthenticationService.Domain.Entities, AuthenticationService.Application.Interfaces, AuthenticationService.UnitTests.Application.Features.v1.Login, AuthenticationService.Infrastructure.DatabaseConfiguration, AuthenticationService.Infrastructure.Repositories

### Community 5 - "devDependencies"
Cohesion: 0.06
Nodes (33): dependencies, lucide-react, react, react-dom, react-router-dom, devDependencies, oxlint, @types/node (+25 more)

### Community 6 - "compilerOptions"
Cohesion: 0.08
Nodes (23): compilerOptions, allowArbitraryExtensions, allowImportingTsExtensions, erasableSyntaxOnly, jsx, lib, module, moduleDetection (+15 more)

### Community 7 - ".SavingChangesAsync"
Cohesion: 0.09
Nodes (18): AuthenticationServiceDbConfiguration, IConfiguration, IServiceCollection, AuditableEntitySaveChangesInterceptor, CancellationToken, DbContext, InterceptionResult, ValueTask (+10 more)

### Community 8 - "User"
Cohesion: 0.13
Nodes (17): GetUserByEmailQuery, GetUserByEmailQueryHandler, CancellationToken, Task, IUserRepository, CancellationToken, Task, User (+9 more)

### Community 9 - "App.tsx"
Cohesion: 0.06
Nodes (24): App(), AppContent(), ProtectedRoute(), Hero(), useHero(), UseHeroProps, Navbar(), useNavbar() (+16 more)

### Community 10 - "TraceIdMiddleware"
Cohesion: 0.10
Nodes (14): HealthConfiguration, IConfiguration, IServiceCollection, OcelotConfiguration, IConfiguration, TraceIdMiddleware, HttpContext, ILogger (+6 more)

### Community 11 - "GlobalExceptionMiddleware"
Cohesion: 0.06
Nodes (24): GlobalExceptionMiddleware, HttpContext, ILogger, RequestDelegate, Task, TraceIdMiddleware, HttpContext, ILogger (+16 more)

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

### Community 18 - "⚛️ Comprehensive React & Frontend Architecture Guide"
Cohesion: 0.09
Nodes (22): 1.1 Declarative vs. Imperative Programming, 1.2 Virtual DOM & Reconciliation, 1.3 JSX / TSX (JavaScript/TypeScript XML), 🏛️ 1. Core Fundamentals of React, 2.1 Components & Props, 2.2 Component State (`useState`), 2.3 Side Effects (`useEffect`), 2.4 Lists & Keys (+14 more)

### Community 19 - ".AddKafkaBroker"
Cohesion: 0.18
Nodes (9): Assembly, IConfiguration, IServiceCollection, DependencyInjection, string, KafkaSettings, string, RabbitMqSettings (+1 more)

### Community 20 - "presentation/context/CartContext.tsx"
Cohesion: 0.17
Nodes (7): CartItem, CartSummary, ICartRepository, ManageCartUseCase, SessionCartRepository, CartContext, CartContextType

### Community 22 - "presentation/context/AuthContext.tsx"
Cohesion: 0.16
Nodes (10): LoginRequest, LoginResponseDTO, JwtClaims, UserProfile, IAuthRepository, LoginUseCase, ApiAuthRepository, parseJwt() (+2 more)

### Community 23 - "AuthenticationServiceDbContextTests.cs"
Cohesion: 0.29
Nodes (5): AuthenticationServiceDbContextTests, Fact, Task, AuthenticationService.UnitTests.Infrastructure, DbContextOptions

### Community 24 - "AuthenticationService.API/Program.cs"
Cohesion: 0.17
Nodes (7): DependencyInjection, IServiceCollection, DependencyInjection, IConfiguration, IServiceCollection, AuthenticationService.Infrastructure, AuthenticationService.API

### Community 27 - "AuthenticationService.API"
Cohesion: 0.17
Nodes (12): AuthenticationService.API, net10.0, Microsoft.AspNetCore.OpenApi (10.0.9), Serilog.AspNetCore (10.0.0), Serilog.Enrichers.Environment (3.0.1), Serilog.Enrichers.Thread (4.0.0), Microsoft.NET.Sdk.Web, Asp.Versioning.Mvc (10.0.0) (+4 more)

### Community 28 - "AuthenticationServiceDbContext"
Cohesion: 0.25
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

### Community 34 - "HungryMan - React + TypeScript Clean Architecture Storefront"
Cohesion: 0.25
Nodes (7): 1. Install Dependencies, 2. Start Development Server, 3. Build for Production, 📖 Architecture & Learning Guides, HungryMan - React + TypeScript Clean Architecture Storefront, 🔑 Offline Developer Credentials, 🚀 Quick Start

### Community 35 - "AuthenticationService.Application/DependencyInjection.cs"
Cohesion: 0.40
Nodes (3): DependencyInjection, IServiceCollection, AuthenticationService.Application

### Community 36 - "LoggingDbCommandInterceptor"
Cohesion: 0.21
Nodes (11): LoggingDbCommandInterceptor, CancellationToken, ILogger, InterceptionResult, Task, ValueTask, CommandErrorEventData, CommandEventData (+3 more)

### Community 37 - "Permission"
Cohesion: 0.22
Nodes (9): IPermissionRepository, IUserPermissionRepository, Permission, DateTime, ICollection, UserPermission, DateTime, PermissionRepository (+1 more)

### Community 38 - "Role"
Cohesion: 0.22
Nodes (9): IRoleRepository, IUserRoleRepository, Role, DateTime, ICollection, UserRole, DateTime, RoleRepository (+1 more)

### Community 39 - "LoginHandler"
Cohesion: 0.21
Nodes (8): AbstractValidator, LoginHandler, IConfiguration, LoginRequestDTO, LoginResponseDTO, LoginValidator, AuthenticationService.Application.Features.v1.Login, IRequestHandler

### Community 40 - "Repository"
Cohesion: 0.28
Nodes (6): Repository, CancellationToken, DbSet, IQueryable, List, Task

### Community 41 - "LoggingDbTransactionInterceptor"
Cohesion: 0.29
Nodes (7): LoggingDbTransactionInterceptor, CancellationToken, ILogger, Task, DbTransaction, DbTransactionInterceptor, TransactionEndEventData

### Community 42 - "UserToken"
Cohesion: 0.50
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

### Community 48 - ".Login"
Cohesion: 0.18
Nodes (9): ActionResult, AuthController, ILogger, Task, ControllerBase, AuthenticationService.API.Controllers.v1, HttpPost, ISender (+1 more)

### Community 49 - "Shared.Helpers.Interfaces"
Cohesion: 0.19
Nodes (5): PasswordHasher, IPasswordHasher, Shared.Helpers.Interfaces, Shared.Entities, Shared.Helpers.Implements

### Community 50 - "IJwtService"
Cohesion: 0.18
Nodes (5): IUser, IEnumerable, ClaimsPrincipal, IEnumerable, IJwtService

### Community 51 - "Clean Architecture & Technical Method Guide"
Cohesion: 0.20
Nodes (9): 🏛️ 1. Architecture Philosophy & Design Methodology, 📁 2. Directory Structure & Component Triplet Layout, 🛠️ 3. Technology Stack & Technical Methods, 🔄 4. Data Flow & Layer Interaction, 💎 5. Design Patterns & Best Practices, ⚡ 6. Building & Running Locally, Clean Architecture & Technical Method Guide, Data Flow Sequence: Component Triplet & Use Case (+1 more)

### Community 52 - "plugins"
Cohesion: 0.22
Nodes (8): plugins, rules, react/only-export-components, react/rules-of-hooks, $schema, oxc, typescript, warn

### Community 53 - ".Handle"
Cohesion: 0.33
Nodes (6): CancellationToken, Task, LoginHandlerTests, Fact, Mock, Task

### Community 56 - "JwtService"
Cohesion: 0.25
Nodes (5): ClaimsPrincipal, IConfiguration, int, string, JwtService

### Community 58 - "RolePermission"
Cohesion: 0.50
Nodes (4): IRolePermissionRepository, RolePermission, DateTime, RolePermissionRepository

## Knowledge Gaps
- **202 isolated node(s):** `net10.0`, `AspNetCore.HealthChecks.Uris (9.0.0)`, `Microsoft.AspNetCore.OpenApi (10.0.9)`, `Ocelot (24.1.0)`, `Serilog.AspNetCore (10.0.0)` (+197 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **6 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `AuthenticationService.Infrastructure.DatabaseConfiguration` connect `AuthenticationService.Domain.Entities` to `.SavingChangesAsync`, `InitialCreate`, `AuthenticationServiceDbContextTests.cs`, `AuthenticationService.API/Program.cs`, `AuthenticationServiceDbContext`?**
  _High betweenness centrality (0.072) - this node is a cross-community bridge._
- **Why does `AuthenticationService.Infrastructure.Interceptors` connect `.SavingChangesAsync` to `LoggingDbTransactionInterceptor`?**
  _High betweenness centrality (0.043) - this node is a cross-community bridge._
- **Why does `AuthenticationService.Application.Interfaces` connect `AuthenticationService.Domain.Entities` to `User`, `IRepository`, `AuthenticationService.API/Program.cs`, `LoginHandler`?**
  _High betweenness centrality (0.032) - this node is a cross-community bridge._
- **What connects `net10.0`, `AspNetCore.HealthChecks.Uris (9.0.0)`, `Microsoft.AspNetCore.OpenApi (10.0.9)` to the rest of the system?**
  _202 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `dotnet-install.sh` be split into smaller, more focused modules?**
  _Cohesion score 0.08521303258145363 - nodes in this community are weakly interconnected._
- **Should `Product` be split into smaller, more focused modules?**
  _Cohesion score 0.14789915966386555 - nodes in this community are weakly interconnected._
- **Should `devDependencies` be split into smaller, more focused modules?**
  _Cohesion score 0.058823529411764705 - nodes in this community are weakly interconnected._