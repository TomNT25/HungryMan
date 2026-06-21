using AuthenticationService.Application.Interfaces;
using AuthenticationService.Domain.Entities;
using AuthenticationService.Infrastructure.DatabaseConfiguration;

namespace AuthenticationService.Infrastructure.Repositories;

public class UserRoleRepository : Repository<UserRole>, IUserRoleRepository
{
    public UserRoleRepository(AuthenticationServiceDbContext dbContext) : base(dbContext)
    {
    }
}
