using System.Linq.Expressions;

namespace AuthenticationService.Application.Interfaces;

public interface IRepository<T> where T : class
{
    IQueryable<T> AsQueryable();
    Task<T?> GetByIdAsync(object id, CancellationToken cancellationToken = default);
    Task<List<T>> GetAllAsync(CancellationToken cancellationToken = default);
    Task<T> AddAsync(T entity, CancellationToken cancellationToken = default);
    Task UpdateAsync(T entity, CancellationToken cancellationToken = default);
    Task DeleteAsync(T entity, CancellationToken cancellationToken = default);
    Task<int> SaveChangesAsync(CancellationToken cancellationToken = default);
}
