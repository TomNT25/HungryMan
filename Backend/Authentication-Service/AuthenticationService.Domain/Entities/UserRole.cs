namespace AuthenticationService.Domain.Entities;

/// <summary>
/// UserRole junction entity for many-to-many relationship between User and Role
/// </summary>
public class UserRole
{
    public int Id { get; set; }
    public string? Code { get; set; }
    public int UserId { get; set; }
    public int RoleId { get; set; }
    public DateTime AssignedAt { get; set; } = DateTime.UtcNow;
    public int? AssignedBy { get; set; }
    public bool IsActive { get; set; } = true;

    public virtual User User { get; set; } = null!;
    public virtual Role Role { get; set; } = null!;
}
