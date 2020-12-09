using System.Linq;
using System.Threading.Tasks;
using Domain.Entities;
using Domain.Interfaces.Repositories;
using Domain.Models;
using Domain.Models.Auth;
using IdentityServer4.Models;
using NHibernate;
using NHibernate.Criterion;

namespace Infrastructure.Repositories
{
    public class UserRepository : IUserRepository
    {
        private readonly ISession _session;

        public UserRepository(ISession session)
        {
            _session = session;
        }

        public async Task<UserModel> RegisterUserAsync(UserModel userModel)
        {
            var user = new User()
                       {
                           UserName = userModel.UserName,
                           Password = userModel.Password.Sha512()
                       };

            await _session.SaveAsync(user);

            return await FindUserAsync(userModel.UserName, userModel.Password);
        }

        public async Task<UserModel> FindUserAsync(string userName)
        {
            var query = _session.QueryOver<User>();
            var user = await query.Where(u => u.UserName == userName).SingleOrDefaultAsync();

            if (user == null)
            {
                return null;
            }
            return new UserModel() { UserName = user.UserName };
        }

        public async Task<UserModel> FindUserAsync(string userName, string password)
        {
            var query = _session.QueryOver<User>();
            var user = await query.Where(u => u.UserName == userName && u.Password == password.Sha512()).SingleOrDefaultAsync();

            if (user == null)
            {
                return null;
            }
            return new UserModel() {UserName = user.UserName };
        }
        
        public async Task<ListResult<UserListItemModel>> ListAsync(ListRequest request)
        {
            var query = _session.QueryOver<User>();

            if (request.OrderDirection == SortDirection.Asc)
            {
                query = query.OrderBy(Projections.Property(request.OrderField)).Asc;
            }
            else if (request.OrderDirection == SortDirection.Desc)
            {
                query = query.OrderBy(Projections.Property(request.OrderField)).Desc;
            }

            var totalCount = await query.RowCountAsync();
            
            var queryResults = await query.Skip((request.PageNumber - 1) * request.PageSize)
                .Take(request.PageSize)
                .ListAsync();

            var results = queryResults
                .Select(r => new UserListItemModel() {UserName = r.UserName})
                .ToList();

            return new ListResult<UserListItemModel>()
            {
                PageNumber = request.PageNumber,
                PageSize = request.PageSize,
                Results = results,
                TotalCount = totalCount
            };
        }

        public async Task DeleteAsync(string userName)
        {
            var query = _session.QueryOver<User>();
            var user = await query.Where(u => u.UserName == userName).SingleOrDefaultAsync();

            if (user != null)
            {
                await _session.DeleteAsync(user);
            }
        }
    }
}