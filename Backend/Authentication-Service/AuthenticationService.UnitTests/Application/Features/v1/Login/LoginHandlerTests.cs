using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using AuthenticationService.Application.Features.v1.Login;
using AuthenticationService.Application.Interfaces;
using AuthenticationService.Domain.Entities;
using FluentAssertions;
using Microsoft.Extensions.Configuration;
using Moq;
using Shared.Helpers.Interfaces;
using Xunit;

namespace AuthenticationService.UnitTests.Application.Features.v1.Login;

public class LoginHandlerTests
{
    private readonly Mock<IUserRepository> _userRepositoryMock;
    private readonly Mock<IJwtService> _jwtServiceMock;
    private readonly Mock<IPasswordHasher> _passwordHasherMock;
    private readonly Mock<IConfiguration> _configurationMock;
    private readonly LoginHandler _handler;

    public LoginHandlerTests()
    {
        _userRepositoryMock = new Mock<IUserRepository>();
        _jwtServiceMock = new Mock<IJwtService>();
        _passwordHasherMock = new Mock<IPasswordHasher>();
        _configurationMock = new Mock<IConfiguration>();

        _handler = new LoginHandler(
            _userRepositoryMock.Object,
            _jwtServiceMock.Object,
            _passwordHasherMock.Object,
            _configurationMock.Object
        );
    }

    [Fact]
    public async Task Handle_UserDoesNotExist_VerifiesDummyHashAndThrowsUnauthorizedAccessException()
    {
        // Arrange
        var request = new LoginRequestDTO { Email = "notfound@example.com", Password = "password123" };
        _userRepositoryMock
            .Setup(x => x.GetByEmailAsync(request.Email, It.IsAny<CancellationToken>()))
            .ReturnsAsync((User?)null);

        // Act
        Func<Task> act = async () => await _handler.Handle(request, CancellationToken.None);

        // Assert
        await act.Should().ThrowAsync<UnauthorizedAccessException>().WithMessage("Invalid email or password");
        _passwordHasherMock.Verify(x => x.VerifyHashedPassword(
            "$2a$12$LvybtUXRtAjaLDb1Ry.qxe2A9F6n9OpxD7gV4l1V2N3O4P5Q6R7S8", 
            request.Password
        ), Times.Once);
    }

    [Fact]
    public async Task Handle_PasswordIncorrect_ThrowsUnauthorizedAccessException()
    {
        // Arrange
        var request = new LoginRequestDTO { Email = "test@example.com", Password = "wrongpassword" };
        var user = new User
        {
            Id = 1,
            Email = request.Email,
            PasswordHash = "correctHash"
        };
        _userRepositoryMock
            .Setup(x => x.GetByEmailAsync(request.Email, It.IsAny<CancellationToken>()))
            .ReturnsAsync(user);

        _passwordHasherMock
            .Setup(x => x.VerifyHashedPassword(user.PasswordHash, request.Password))
            .Returns(false);

        // Act
        Func<Task> act = async () => await _handler.Handle(request, CancellationToken.None);

        // Assert
        await act.Should().ThrowAsync<UnauthorizedAccessException>().WithMessage("Invalid email or password");
        _passwordHasherMock.Verify(x => x.VerifyHashedPassword(user.PasswordHash, request.Password), Times.Once);
    }

    [Fact]
    public async Task Handle_ValidCredentials_ReturnsLoginResponseDtoWithTokensAndExpiresIn()
    {
        // Arrange
        var request = new LoginRequestDTO { Email = "test@example.com", Password = "correctPassword" };
        var role = new Role { Name = "Admin" };
        var userRole = new UserRole { Role = role };
        var user = new User
        {
            Id = 1,
            Email = request.Email,
            PasswordHash = "correctHash",
            UserRoles = new List<UserRole> { userRole }
        };

        _userRepositoryMock
            .Setup(x => x.GetByEmailAsync(request.Email, It.IsAny<CancellationToken>()))
            .ReturnsAsync(user);

        _passwordHasherMock
            .Setup(x => x.VerifyHashedPassword(user.PasswordHash, request.Password))
            .Returns(true);

        _jwtServiceMock
            .Setup(x => x.GenerateAccessToken(user, It.Is<IEnumerable<string>>(roles => roles.Contains("Admin"))))
            .Returns("accessToken123");

        _jwtServiceMock
            .Setup(x => x.GenerateRefreshToken())
            .Returns("refreshToken123");

        _configurationMock
            .Setup(x => x["Jwt:TokenExpireMinutes"])
            .Returns("120");

        // Act
        var result = await _handler.Handle(request, CancellationToken.None);

        // Assert
        result.Should().NotBeNull();
        result.AccessToken.Should().Be("accessToken123");
        result.RefreshToken.Should().Be("refreshToken123");
        result.ExpiresIn.Should().Be(120);
    }
}
