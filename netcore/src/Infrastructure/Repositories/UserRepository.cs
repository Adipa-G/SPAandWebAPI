using System.Linq;
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
        private ISession _session;

        public UserRepository(ISession session)
        {
            _session = session;
        }

        public  UserModel RegisterUser(UserModel userModel)
        {
            var user = new User()
                       {
                           UserName = userModel.UserName,
                           Password = userModel.Password.Sha512()
                       };

            _session.Save(user);

            return FindUser(userModel.UserName, userModel.Password);
        }

        public UserModel FindUser(string userName)
        {
            var query = _session.QueryOver<User>();
            var user = query.Where(u => u.UserName == userName).SingleOrDefault();

            if (user == null)
            {
                return null;
            }
            return new UserModel() { UserName = user.UserName };
        }

        public UserModel FindUser(string userName, string password)
        {
            var query = _session.QueryOver<User>();
            var user = query.Where(u => u.UserName == userName && u.Password == password.Sha512()).SingleOrDefault();

            if (user == null)
            {
                return null;
            }
            return new UserModel() {UserName = user.UserName };
        }
        
        public ListResult<UserListItemModel> List(ListRequest request)
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

            var totalCount = query.RowCount();
            var results =
                query.Skip((request.PageNumber - 1) * request.PageSize)
                    .Take(request.PageSize)
                    .List()
                    .Select(r => new UserListItemModel() { UserName = r.UserName })
                    .ToList();

            return new ListResult<UserListItemModel>()
            {
                PageNumber = request.PageNumber,
                PageSize = request.PageSize,
                Results = results,
                TotalCount = totalCount
            };
        }

        public void Delete(string userName)
        {
            var query = _session.QueryOver<User>();
            var user = query.Where(u => u.UserName == userName).SingleOrDefault();

            if (user != null)
            {
                _session.Delete(user);
            }
        }
    }
}