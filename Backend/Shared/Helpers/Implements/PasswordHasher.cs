using BCrypt.Net;
using Shared.Helpers.Interfaces;

namespace Shared.Helpers.Implements;

public class PasswordHasher : IPasswordHasher
{
    public string HashPassword(string password)
    {
        return BCrypt.Net.BCrypt.HashPassword(password);
    }
    public bool VerifyHashedPassword(string hashedPassword, string providedPassword)
    {
        Console.WriteLine("Hashed password: " + hashedPassword);
        Console.WriteLine("Provided password: " + providedPassword);
        return BCrypt.Net.BCrypt.Verify(providedPassword, hashedPassword);
    }
}
