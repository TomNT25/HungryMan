using MediatR;

namespace AuthenticationService.Application.Features.v1.Login;

public record LoginRequestDTO : IRequest<LoginResponseDTO>
{
    public string Email { get; set; } = string.Empty;
    public string Password { get; set; } = string.Empty;
}
