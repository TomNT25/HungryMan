using MediatR;
using Microsoft.EntityFrameworkCore;
using Authentication_Service.DatabaseConfiguration;
using Authentication_Service.Models;

namespace Authentication_Service.Features.v1.Login;

public record GetUserByEmailQuery(string Email) : IRequest<User?>;

public class GetUserByEmailQueryHandler : IRequestHandler<GetUserByEmailQuery, User?>
{
    private readonly AuthenticationServiceDbContext _dbContext;

    public GetUserByEmailQueryHandler(AuthenticationServiceDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    public async Task<User?> Handle(GetUserByEmailQuery request, CancellationToken cancellationToken)
    {
        return await _dbContext.Users
            .Include(u => u.UserRoles)
            .ThenInclude(ur => ur.Role)
            .FirstOrDefaultAsync(u => u.Email == request.Email, cancellationToken);
    }
}
