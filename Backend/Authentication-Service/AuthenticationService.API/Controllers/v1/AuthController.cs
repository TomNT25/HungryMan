using Microsoft.AspNetCore.Mvc;
using Asp.Versioning;
using Shared.Models;
using MediatR;
using Microsoft.Extensions.Logging;
using AuthenticationService.Application.Features.v1.Login;

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
      var result = await _mediator.Send(request.Data);
      return Ok(BaseAPIResponse<LoginResponseDTO>.Success(result, "Login successful"));
   }
}
