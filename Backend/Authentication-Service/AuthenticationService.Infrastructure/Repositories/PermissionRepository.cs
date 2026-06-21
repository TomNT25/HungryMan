using AuthenticationService.Application.Interfaces;
using AuthenticationService.Domain.Entities;
using AuthenticationService.Infrastructure.DatabaseConfiguration;

namespace AuthenticationService.Infrastructure.Repositories;

public class PermissionRepository : Repository<Permission>, IPermissionRepository
{
    public PermissionRepository(AuthenticationServiceDbContext dbContext) : base(dbContext)
    {
    }
}
