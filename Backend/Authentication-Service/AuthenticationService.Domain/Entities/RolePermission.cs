namespace AuthenticationService.Domain.Entities;

public class RolePermission
{
    public int Id { get; set; }
    public string? Code { get; set; }
    public int RoleId { get; set; }
    public int PermissionId { get; set; }
    public DateTime AssignedAt { get; set; } = DateTime.UtcNow;
    public int? AssignedBy { get; set; }
    public bool IsActive { get; set; } = true;
    
    public virtual Role Role { get; set; } = null!;
    public virtual Permission Permission { get; set; } = null!;
}
