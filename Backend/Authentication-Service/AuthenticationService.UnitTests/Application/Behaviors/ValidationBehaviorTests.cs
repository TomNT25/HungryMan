using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using AuthenticationService.Application.Behaviors;
using FluentAssertions;
using FluentValidation;
using FluentValidation.Results;
using MediatR;
using Moq;
using Xunit;

namespace AuthenticationService.UnitTests.Application.Behaviors;

public class ValidationBehaviorTests
{
    public record TestRequest : IRequest<TestResponse>;
    public record TestResponse;

    [Fact]
    public async Task Handle_NoValidators_CallsNext()
    {
        // Arrange
        var validators = Enumerable.Empty<IValidator<TestRequest>>();
        var behavior = new ValidationBehavior<TestRequest, TestResponse>(validators);
        var request = new TestRequest();
        var nextCalled = false;
        RequestHandlerDelegate<TestResponse> next = (cancellationToken) =>
        {
            nextCalled = true;
            return Task.FromResult(new TestResponse());
        };

        // Act
        var result = await behavior.Handle(request, next, CancellationToken.None);

        // Assert
        nextCalled.Should().BeTrue();
        result.Should().NotBeNull();
    }

    [Fact]
    public async Task Handle_ValidationSucceeds_CallsNext()
    {
        // Arrange
        var validatorMock = new Mock<IValidator<TestRequest>>();
        validatorMock
            .Setup(x => x.ValidateAsync(It.IsAny<ValidationContext<TestRequest>>(), It.IsAny<CancellationToken>()))
            .ReturnsAsync(new ValidationResult());

        var validators = new[] { validatorMock.Object };
        var behavior = new ValidationBehavior<TestRequest, TestResponse>(validators);
        var request = new TestRequest();
        var nextCalled = false;
        RequestHandlerDelegate<TestResponse> next = (cancellationToken) =>
        {
            nextCalled = true;
            return Task.FromResult(new TestResponse());
        };

        // Act
        var result = await behavior.Handle(request, next, CancellationToken.None);

        // Assert
        nextCalled.Should().BeTrue();
        result.Should().NotBeNull();
    }

    [Fact]
    public async Task Handle_ValidationFails_ThrowsValidationException()
    {
        // Arrange
        var validatorMock = new Mock<IValidator<TestRequest>>();
        var validationFailure = new ValidationFailure("PropName", "Error message");
        validatorMock
            .Setup(x => x.ValidateAsync(It.IsAny<ValidationContext<TestRequest>>(), It.IsAny<CancellationToken>()))
            .ReturnsAsync(new ValidationResult(new[] { validationFailure }));

        var validators = new[] { validatorMock.Object };
        var behavior = new ValidationBehavior<TestRequest, TestResponse>(validators);
        var request = new TestRequest();
        var nextCalled = false;
        RequestHandlerDelegate<TestResponse> next = (cancellationToken) =>
        {
            nextCalled = true;
            return Task.FromResult(new TestResponse());
        };

        // Act
        Func<Task> act = async () => await behavior.Handle(request, next, CancellationToken.None);

        // Assert
        await act.Should().ThrowAsync<ValidationException>()
            .Where(ex => ex.Errors.Count() == 1 && ex.Errors.First().PropertyName == "PropName");
        nextCalled.Should().BeFalse();
    }
}
