using AuthenticationService.Application.Interfaces;
using AuthenticationService.Domain.Entities;
using AuthenticationService.Infrastructure.DatabaseConfiguration;

namespace AuthenticationService.Infrastructure.Repositories;

public class UserTokenRepository : Repository<UserToken>, IUserTokenRepository
{
    public UserTokenRepository(AuthenticationServiceDbContext dbContext) : base(dbContext)
    {
    }
}
