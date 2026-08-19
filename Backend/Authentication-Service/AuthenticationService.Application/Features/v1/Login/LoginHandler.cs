using MediatR;
using Shared.Helpers.Interfaces;
using AuthenticationService.Application.Interfaces;
using Microsoft.Extensions.Configuration;

namespace AuthenticationService.Application.Features.v1.Login;

public class LoginHandler : IRequestHandler<LoginRequestDTO, LoginResponseDTO>
{
    private readonly IUserRepository _userRepository;
    private readonly IJwtService _jwtService;
    private readonly IPasswordHasher _passwordHasher;
    private readonly IConfiguration _configuration;

    public LoginHandler(
        IUserRepository userRepository,
        IJwtService jwtService,
        IPasswordHasher passwordHasher,
        IConfiguration configuration)
    {
        _userRepository = userRepository;
        _jwtService = jwtService;
        _passwordHasher = passwordHasher;
        _configuration = configuration;
    }

    public async Task<LoginResponseDTO> Handle(LoginRequestDTO request, CancellationToken cancellationToken)
    {
        var user = await _userRepository.GetByEmailAsync(request.Email, cancellationToken);
        if (user == null)
        {
            throw new UnauthorizedAccessException("Invalid email or password");
        }

        var passwordMatch = _passwordHasher.VerifyHashedPassword(user.PasswordHash, request.Password);
        if (!passwordMatch)
        {
            throw new UnauthorizedAccessException("Invalid email or password");
        }

        var roles = user.UserRoles.Select(ur => ur.Role.Name).ToList();
        var accessToken = _jwtService.GenerateAccessToken(user, roles);
        var refreshToken = _jwtService.GenerateRefreshToken();
        var tokenExpireMinutes = int.Parse(_configuration["Jwt:TokenExpireMinutes"] ?? "60");

        return new LoginResponseDTO
        {
            AccessToken = accessToken,
            RefreshToken = refreshToken,
            ExpiresIn = tokenExpireMinutes
        };
    }
}
