using System.Security.Claims;
using Shared.Entities;

namespace Shared.Helpers.Interfaces;

public interface IJwtService
{
    string GenerateAccessToken(IUser user, IEnumerable<string> roles);
    string GenerateRefreshToken();
    ClaimsPrincipal? GetPrincipalFromToken(string token);
    bool ValidateToken(string token);
}
