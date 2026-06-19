using Microsoft.EntityFrameworkCore;
using Authentication_Service.Models;

namespace Authentication_Service.DatabaseConfiguration;

public class AuthenticationServiceDbContext : DbContext
{
    public AuthenticationServiceDbContext(DbContextOptions<AuthenticationServiceDbContext> options)
        : base(options)
    {
    }

    public DbSet<User> Users { get; set; }
    public DbSet<Role> Roles { get; set; }
    public DbSet<Permission> Permissions { get; set; }
    public DbSet<UserRole> UserRoles { get; set; }
    public DbSet<UserPermission> UserPermissions { get; set; }
    public DbSet<RolePermission> RolePermissions { get; set; }
    public DbSet<UserToken> UserTokens { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        // Map tables
        modelBuilder.Entity<User>().ToTable("users");
        modelBuilder.Entity<Role>().ToTable("roles");
        modelBuilder.Entity<Permission>().ToTable("permissions");
        modelBuilder.Entity<UserRole>().ToTable("user_roles");
        modelBuilder.Entity<UserPermission>().ToTable("user_permissions");
        modelBuilder.Entity<RolePermission>().ToTable("role_permissions");
        modelBuilder.Entity<UserToken>().ToTable("user_tokens");

        // Primary Keys & Column mappings
        modelBuilder.Entity<User>(entity =>
        {
            entity.HasKey(e => e.Id);
            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.Code).HasColumnName("code");
            entity.Property(e => e.Username).HasColumnName("username").IsRequired().HasMaxLength(50);
            entity.Property(e => e.Email).HasColumnName("email").IsRequired().HasMaxLength(100);
            entity.Property(e => e.PasswordHash).HasColumnName("password_hash").IsRequired().HasMaxLength(255);
            entity.Property(e => e.FirstName).HasColumnName("first_name");
            entity.Property(e => e.LastName).HasColumnName("last_name");
            entity.Property(e => e.PhoneNumber).HasColumnName("phone_number");
            entity.Property(e => e.AvatarUrl).HasColumnName("avatar_url");
            entity.Property(e => e.AvatarMediaFileId).HasColumnName("avatar_media_file_id");
            entity.Property(e => e.Gender).HasColumnName("gender");
            entity.Property(e => e.BirthDate).HasColumnName("birth_date");
            entity.Property(e => e.Address).HasColumnName("address");
            entity.Property(e => e.Provider).HasColumnName("provider");
            entity.Property(e => e.IsActive).HasColumnName("is_active");
            entity.Property(e => e.IsEmailVerified).HasColumnName("is_email_verified");
            entity.Property(e => e.EmailVerifiedAt).HasColumnName("email_verified_at");
            entity.Property(e => e.LastLoginAt).HasColumnName("last_login_at");
            entity.Property(e => e.CreatedAt).HasColumnName("created_at");
            entity.Property(e => e.UpdatedAt).HasColumnName("updated_at");
            entity.Property(e => e.CreatedBy).HasColumnName("created_by");
            entity.Property(e => e.UpdatedBy).HasColumnName("updated_by");
        });

        modelBuilder.Entity<Role>(entity =>
        {
            entity.HasKey(e => e.Id);
            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.Name).HasColumnName("name").IsRequired().HasMaxLength(50);
            entity.Property(e => e.Description).HasColumnName("description").HasMaxLength(255);
            entity.Property(e => e.IsActive).HasColumnName("is_active");
            entity.Property(e => e.IsSystemRole).HasColumnName("is_system_role");
            entity.Property(e => e.CreatedAt).HasColumnName("created_at");
            entity.Property(e => e.UpdatedAt).HasColumnName("updated_at");
            entity.Property(e => e.CreatedBy).HasColumnName("created_by");
            entity.Property(e => e.UpdatedBy).HasColumnName("updated_by");
        });

        modelBuilder.Entity<Permission>(entity =>
        {
            entity.HasKey(e => e.Id);
            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.Code).HasColumnName("code");
            entity.Property(e => e.Name).HasColumnName("name").IsRequired().HasMaxLength(100);
            entity.Property(e => e.Description).HasColumnName("description").HasMaxLength(255);
            entity.Property(e => e.Resource).HasColumnName("resource").IsRequired().HasMaxLength(50);
            entity.Property(e => e.Action).HasColumnName("action").IsRequired().HasMaxLength(50);
            entity.Property(e => e.IsActive).HasColumnName("is_active");
            entity.Property(e => e.CreatedAt).HasColumnName("created_at");
            entity.Property(e => e.UpdatedAt).HasColumnName("updated_at");
            entity.Property(e => e.CreatedBy).HasColumnName("created_by");
            entity.Property(e => e.UpdatedBy).HasColumnName("updated_by");
        });

        modelBuilder.Entity<UserRole>(entity =>
        {
            entity.HasKey(e => e.Id);
            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.Code).HasColumnName("code");
            entity.Property(e => e.UserId).HasColumnName("user_id");
            entity.Property(e => e.RoleId).HasColumnName("role_id");
            entity.Property(e => e.AssignedAt).HasColumnName("assigned_at");
            entity.Property(e => e.AssignedBy).HasColumnName("assigned_by");
            entity.Property(e => e.IsActive).HasColumnName("is_active");

            entity.HasOne(e => e.User)
                .WithMany(u => u.UserRoles)
                .HasForeignKey(e => e.UserId)
                .OnDelete(DeleteBehavior.Cascade);

            entity.HasOne(e => e.Role)
                .WithMany(r => r.UserRoles)
                .HasForeignKey(e => e.RoleId)
                .OnDelete(DeleteBehavior.Cascade);
        });

        modelBuilder.Entity<UserPermission>(entity =>
        {
            entity.HasKey(e => e.Id);
            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.Code).HasColumnName("code");
            entity.Property(e => e.UserId).HasColumnName("user_id");
            entity.Property(e => e.PermissionId).HasColumnName("permission_id");
            entity.Property(e => e.AssignedAt).HasColumnName("assigned_at");
            entity.Property(e => e.AssignedBy).HasColumnName("assigned_by");
            entity.Property(e => e.IsActive).HasColumnName("is_active");

            entity.HasOne(e => e.User)
                .WithMany(u => u.UserPermissions)
                .HasForeignKey(e => e.UserId)
                .OnDelete(DeleteBehavior.Cascade);

            entity.HasOne(e => e.Permission)
                .WithMany(p => p.UserPermissions)
                .HasForeignKey(e => e.PermissionId)
                .OnDelete(DeleteBehavior.Cascade);
        });

        modelBuilder.Entity<RolePermission>(entity =>
        {
            entity.HasKey(e => e.Id);
            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.Code).HasColumnName("code");
            entity.Property(e => e.RoleId).HasColumnName("role_id");
            entity.Property(e => e.PermissionId).HasColumnName("permission_id");
            entity.Property(e => e.AssignedAt).HasColumnName("assigned_at");
            entity.Property(e => e.AssignedBy).HasColumnName("assigned_by");
            entity.Property(e => e.IsActive).HasColumnName("is_active");

            entity.HasOne(e => e.Role)
                .WithMany(r => r.RolePermissions)
                .HasForeignKey(e => e.RoleId)
                .OnDelete(DeleteBehavior.Cascade);

            entity.HasOne(e => e.Permission)
                .WithMany(p => p.RolePermissions)
                .HasForeignKey(e => e.PermissionId)
                .OnDelete(DeleteBehavior.Cascade);
        });

        modelBuilder.Entity<UserToken>(entity =>
        {
            entity.HasKey(e => e.Id);
            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.Code).HasColumnName("code");
            entity.Property(e => e.UserId).HasColumnName("user_id");
            entity.Property(e => e.AccessToken).HasColumnName("access_token").IsRequired();
            entity.Property(e => e.RefreshToken).HasColumnName("refresh_token").IsRequired();
            entity.Property(e => e.IssuedAt).HasColumnName("issued_at");
            entity.Property(e => e.ExpiresAt).HasColumnName("expires_at");
            entity.Property(e => e.RevokedAt).HasColumnName("revoked_at");
            entity.Property(e => e.ReplacedByToken).HasColumnName("replaced_by_token");
            entity.Property(e => e.IsActive).HasColumnName("is_active");
            entity.Property(e => e.Jti).HasColumnName("jti");

            entity.HasOne(e => e.User)
                .WithMany(u => u.UserTokens)
                .HasForeignKey(e => e.UserId)
                .OnDelete(DeleteBehavior.Cascade);
        });
    }
}
