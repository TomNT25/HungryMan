namespace Authentication_Service.Models;

public class User : Shared.Entities.IUser
{
    public int Id { get; set; }
    public string? Code { get; set; }
    public string Username { get; set; } = string.Empty;
    public string Email { get; set; } = string.Empty;
    public string PasswordHash { get; set; } = string.Empty;
    public string? FirstName { get; set; }
    public string? LastName { get; set; }
    public string? PhoneNumber { get; set; }
    public string? AvatarUrl { get; set; }
    public int? AvatarMediaFileId { get; set; }
    public string? Gender { get; set; }
    public DateTime? BirthDate { get; set; }
    public string? Address { get; set; }
    public string Provider { get; set; } = "system";
    public bool IsActive { get; set; } = true;
    public bool IsEmailVerified { get; set; } = false;
    public DateTime? EmailVerifiedAt { get; set; }
    public DateTime? LastLoginAt { get; set; }
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    public DateTime? UpdatedAt { get; set; }
    public int? CreatedBy { get; set; }
    public int? UpdatedBy { get; set; }

    public virtual ICollection<UserRole> UserRoles { get; set; } = new List<UserRole>();
    public virtual ICollection<UserPermission> UserPermissions { get; set; } = new List<UserPermission>();
    public virtual ICollection<UserToken> UserTokens { get; set; } = new List<UserToken>();
}
