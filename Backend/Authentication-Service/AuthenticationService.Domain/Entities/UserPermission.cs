namespace AuthenticationService.Domain.Entities;

public class UserPermission
{
    public int Id { get; set; }
    public string? Code { get; set; }
    public int UserId { get; set; }
    public int PermissionId { get; set; }
    public DateTime AssignedAt { get; set; } = DateTime.UtcNow;
    public int? AssignedBy { get; set; }
    public bool IsActive { get; set; } = true;
    
    public virtual User User { get; set; } = null!;
    public virtual Permission Permission { get; set; } = null!;
}
