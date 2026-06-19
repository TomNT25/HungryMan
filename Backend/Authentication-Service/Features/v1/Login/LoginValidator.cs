using FluentValidation;

namespace Authentication_Service.Features.v1.Login;

public class LoginValidator : AbstractValidator<LoginRequestDTO>
{
    public LoginValidator()
    {
        RuleFor(x => x.Email)
        .NotNull().WithMessage("Email is required")
        .NotEmpty().WithMessage("Email is required")
        .EmailAddress().WithMessage("Email is invalid");
        
        RuleFor(x => x.Password)
        .NotNull().WithMessage("Password is required")
        .NotEmpty().WithMessage("Password is required")
        .MinimumLength(6).WithMessage("Password must be at least 6 characters long");
    }
}