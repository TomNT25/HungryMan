using AuthenticationService.Application.Interfaces;
using AuthenticationService.Domain.Entities;
using AuthenticationService.Infrastructure.DatabaseConfiguration;

namespace AuthenticationService.Infrastructure.Repositories;

public class RoleRepository : Repository<Role>, IRoleRepository
{
    public RoleRepository(AuthenticationServiceDbContext dbContext) : base(dbContext)
    {
    }
}
