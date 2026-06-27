using Microsoft.AspNetCore.Mvc;
using Asp.Versioning;
using Shared.Models;
using MediatR;
using Microsoft.Extensions.Logging;
using AuthenticationService.Application.Features.v1.Login;
using FluentValidation;

namespace AuthenticationService.API.Controllers.v1;

[ApiController]
[ApiVersion("1.0")]
[Route("api/v{version:apiVersion}/auth")]
public class AuthController : ControllerBase
{
   private readonly ILogger<AuthController> _logger;
   private readonly ISender _mediator;

   public AuthController(ISender mediator, ILogger<AuthController> logger)
   {
      _mediator = mediator;
      _logger = logger;
   }

   [HttpPost]
   [Route("login")]
   public async Task<ActionResult<BaseAPIResponse<LoginResponseDTO>>> Login([FromBody] BaseAPIRequest<LoginRequestDTO> request)
   {
      _logger.LogInformation("Login attempt for user: {Email}", request.Data.Email);
      try
      {
         var result = await _mediator.Send(request.Data);
         return Ok(BaseAPIResponse<LoginResponseDTO>.Success(result, "Login successful"));
      }
      catch (ValidationException ex)
      {
         var errors = ex.Errors.Select(e => e.ErrorMessage).ToList();
         return BadRequest(BaseAPIResponse<LoginResponseDTO>.Failure("Validation failed", errors: errors));
      }
      catch (UnauthorizedAccessException ex)
      {
         return Unauthorized(BaseAPIResponse<LoginResponseDTO>.Failure(ex.Message, statusCode: 401));
      }
      catch (Exception ex)
      {
         _logger.LogError(ex, "Unexpected error during login for user {Email}", request.Data.Email);
         return StatusCode(500, BaseAPIResponse<LoginResponseDTO>.Failure("An unexpected error occurred", statusCode: 500));
      }
   }
}
