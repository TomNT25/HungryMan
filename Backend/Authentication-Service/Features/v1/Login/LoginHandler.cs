using MediatR;
using FluentValidation;
using Shared.Helpers.Interfaces;

namespace Authentication_Service.Features.v1.Login;

public class LoginHandler : IRequestHandler<LoginRequestDTO, LoginResponseDTO>
{
    private readonly IMediator _mediator;
    private readonly IValidator<LoginRequestDTO> _validator;
    private readonly IJwtService _jwtService;
    private readonly IPasswordHasher _passwordHasher;

    public LoginHandler(IMediator mediator, IValidator<LoginRequestDTO> validator, IJwtService jwtService, IPasswordHasher passwordHasher)
    {
        _mediator = mediator;
        _validator = validator;
        _jwtService = jwtService;
        _passwordHasher = passwordHasher;
    }

    public async Task<LoginResponseDTO> Handle(LoginRequestDTO request, CancellationToken cancellationToken)
    {
        var validationResult = await _validator.ValidateAsync(request, cancellationToken);
        if (!validationResult.IsValid)
        {
            throw new ValidationException(validationResult.Errors);
        }

        var user = await _mediator.Send(new GetUserByEmailQuery(request.Email), cancellationToken);
        if (user == null)
        {
            throw new UnauthorizedAccessException("User not found");
        }

        var passwordMatch = _passwordHasher.VerifyHashedPassword(user.PasswordHash, request.Password);
        if (!passwordMatch)
        {
            throw new UnauthorizedAccessException("Invalid password");
        }

        var roles = user.UserRoles.Select(ur => ur.Role.Name).ToList();
        var accessToken = _jwtService.GenerateAccessToken(user, roles);
        var refreshToken = _jwtService.GenerateRefreshToken();

        return new LoginResponseDTO
        {
            AccessToken = accessToken,
            RefreshToken = refreshToken,
            ExpiresIn = 60
        };
    }
}