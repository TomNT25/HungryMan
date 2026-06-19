using MediatR;

namespace Authentication_Service.Features.v1.Login;

public class LoginRequestDTO : IRequest<LoginResponseDTO>
{
    public string Email { get; set; } = string.Empty;
    public string Password { get; set; } = string.Empty;
}