using MediatR;
using Microsoft.EntityFrameworkCore;
using AuthenticationService.Application.Interfaces;
using AuthenticationService.Domain.Entities;

namespace AuthenticationService.Application.Features.v1.Login;

public record GetUserByEmailQuery(string Email) : IRequest<User?>;

public class GetUserByEmailQueryHandler : IRequestHandler<GetUserByEmailQuery, User?>
{
    private readonly IUserRepository _userRepository;

    public GetUserByEmailQueryHandler(IUserRepository userRepository)
    {
        _userRepository = userRepository;
    }

    public async Task<User?> Handle(GetUserByEmailQuery request, CancellationToken cancellationToken)
    {
        return await _userRepository.GetByEmailAsync(request.Email, cancellationToken);
    }
}
