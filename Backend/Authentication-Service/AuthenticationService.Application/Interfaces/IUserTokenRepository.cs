using AuthenticationService.Domain.Entities;

namespace AuthenticationService.Application.Interfaces;

public interface IUserTokenRepository : IRepository<UserToken>
{
}
