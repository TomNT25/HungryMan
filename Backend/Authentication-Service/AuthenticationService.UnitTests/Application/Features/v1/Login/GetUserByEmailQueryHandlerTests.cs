using System.Threading;
using System.Threading.Tasks;
using AuthenticationService.Application.Features.v1.Login;
using AuthenticationService.Application.Interfaces;
using AuthenticationService.Domain.Entities;
using FluentAssertions;
using Moq;
using Xunit;

namespace AuthenticationService.UnitTests.Application.Features.v1.Login;

public class GetUserByEmailQueryHandlerTests
{
    private readonly Mock<IUserRepository> _userRepositoryMock;
    private readonly GetUserByEmailQueryHandler _handler;

    public GetUserByEmailQueryHandlerTests()
    {
        _userRepositoryMock = new Mock<IUserRepository>();
        _handler = new GetUserByEmailQueryHandler(_userRepositoryMock.Object);
    }

    [Fact]
    public async Task Handle_UserExists_ReturnsUser()
    {
        // Arrange
        var email = "test@example.com";
        var user = new User { Id = 1, Email = email, Username = "testuser" };
        _userRepositoryMock
            .Setup(x => x.GetByEmailAsync(email, It.IsAny<CancellationToken>()))
            .ReturnsAsync(user);

        var query = new GetUserByEmailQuery(email);

        // Act
        var result = await _handler.Handle(query, CancellationToken.None);

        // Assert
        result.Should().NotBeNull();
        result!.Email.Should().Be(email);
        result.Username.Should().Be("testuser");
        _userRepositoryMock.Verify(x => x.GetByEmailAsync(email, It.IsAny<CancellationToken>()), Times.Once);
    }

    [Fact]
    public async Task Handle_UserDoesNotExist_ReturnsNull()
    {
        // Arrange
        var email = "notfound@example.com";
        _userRepositoryMock
            .Setup(x => x.GetByEmailAsync(email, It.IsAny<CancellationToken>()))
            .ReturnsAsync((User?)null);

        var query = new GetUserByEmailQuery(email);

        // Act
        var result = await _handler.Handle(query, CancellationToken.None);

        // Assert
        result.Should().BeNull();
        _userRepositoryMock.Verify(x => x.GetByEmailAsync(email, It.IsAny<CancellationToken>()), Times.Once);
    }
}
