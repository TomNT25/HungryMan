using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Xunit;
using FluentAssertions;
using AuthenticationService.Infrastructure.DatabaseConfiguration;
using AuthenticationService.Domain.Entities;
using Moq;

namespace AuthenticationService.UnitTests.Infrastructure
{
    public class AuthenticationServiceDbContextTests
    {
        private DbContextOptions<AuthenticationServiceDbContext> GetInMemoryOptions()
        {
            return new DbContextOptionsBuilder<AuthenticationServiceDbContext>()
                .UseInMemoryDatabase(databaseName: $"AuthDb_{System.Guid.NewGuid()}")
                .Options;
        }

        [Fact]
        public async Task Can_Instantiate_And_Save_User()
        {
            // Arrange
            var options = GetInMemoryOptions();
            var testUser = new User
            {
                Id = 1,
                Username = "testuser",
                Email = "test@example.com",
                PasswordHash = "hash123",
                FirstName = "Test",
                LastName = "User",
                IsActive = true
            };

            // Act
            using (var context = new AuthenticationServiceDbContext(options))
            {
                context.Users.Add(testUser);
                await context.SaveChangesAsync();
            }

            // Assert
            using (var context = new AuthenticationServiceDbContext(options))
            {
                var userInDb = await context.Users.FirstOrDefaultAsync(u => u.Username == "testuser");
                userInDb.Should().NotBeNull();
                userInDb!.Email.Should().Be("test@example.com");
            }
        }
    }
}
