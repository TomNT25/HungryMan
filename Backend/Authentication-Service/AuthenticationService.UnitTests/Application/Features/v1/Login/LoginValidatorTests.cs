using AuthenticationService.Application.Features.v1.Login;
using FluentAssertions;
using Xunit;

namespace AuthenticationService.UnitTests.Application.Features.v1.Login;

public class LoginValidatorTests
{
    private readonly LoginValidator _validator;

    public LoginValidatorTests()
    {
        _validator = new LoginValidator();
    }

    [Fact]
    public void Validate_EmptyEmail_Fails()
    {
        // Arrange
        var request = new LoginRequestDTO { Email = "", Password = "password123" };

        // Act
        var result = _validator.Validate(request);

        // Assert
        result.IsValid.Should().BeFalse();
        result.Errors.Should().ContainSingle(x => x.PropertyName == "Email" && x.ErrorMessage == "Email is required");
    }

    [Fact]
    public void Validate_InvalidEmail_Fails()
    {
        // Arrange
        var request = new LoginRequestDTO { Email = "invalid-email", Password = "password123" };

        // Act
        var result = _validator.Validate(request);

        // Assert
        result.IsValid.Should().BeFalse();
        result.Errors.Should().ContainSingle(x => x.PropertyName == "Email" && x.ErrorMessage == "Email is invalid");
    }

    [Fact]
    public void Validate_EmptyPassword_Fails()
    {
        // Arrange
        var request = new LoginRequestDTO { Email = "test@example.com", Password = "" };

        // Act
        var result = _validator.Validate(request);

        // Assert
        result.IsValid.Should().BeFalse();
        result.Errors.Should().ContainSingle(x => x.PropertyName == "Password" && x.ErrorMessage == "Password is required");
    }

    [Fact]
    public void Validate_ShortPassword_Fails()
    {
        // Arrange
        var request = new LoginRequestDTO { Email = "test@example.com", Password = "12345" };

        // Act
        var result = _validator.Validate(request);

        // Assert
        result.IsValid.Should().BeFalse();
        result.Errors.Should().ContainSingle(x => x.PropertyName == "Password" && x.ErrorMessage == "Password must be at least 6 characters long");
    }

    [Fact]
    public void Validate_ValidRequest_Succeeds()
    {
        // Arrange
        var request = new LoginRequestDTO { Email = "test@example.com", Password = "password123" };

        // Act
        var result = _validator.Validate(request);

        // Assert
        result.IsValid.Should().BeTrue();
        result.Errors.Should().BeEmpty();
    }
}
