using AuthenticationService.Application.Interfaces;
using AuthenticationService.Domain.Entities;
using AuthenticationService.Infrastructure.DatabaseConfiguration;

namespace AuthenticationService.Infrastructure.Repositories;

public class UserPermissionRepository : Repository<UserPermission>, IUserPermissionRepository
{
    public UserPermissionRepository(AuthenticationServiceDbContext dbContext) : base(dbContext)
    {
    }
}
