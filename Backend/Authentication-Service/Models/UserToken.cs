namespace Authentication_Service.Models;

public class UserToken
{
    public int Id { get; set; }
    public string? Code { get; set; }
    public int UserId { get; set; }
    public string AccessToken { get; set; } = string.Empty;
    public string RefreshToken { get; set; } = string.Empty;
    public DateTime IssuedAt { get; set; } = DateTime.UtcNow;
    public DateTime ExpiresAt { get; set; } = DateTime.UtcNow.AddMinutes(30);
    public DateTime? RevokedAt { get; set; }
    public string? ReplacedByToken { get; set; }
    public bool IsActive { get; set; } = true;
    public string? Jti { get; set; }

    public virtual User User { get; set; } = null!;
}