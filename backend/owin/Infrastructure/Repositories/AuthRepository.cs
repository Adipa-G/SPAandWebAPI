using Domain.Interfaces.Repositories;
using Domain.Models;
using Domain.Models.Auth;
using Microsoft.AspNet.Identity;
using NHibernate;
using NHibernate.AspNet.Identity;
using NHibernate.Criterion;
using System.Linq;

namespace Infrastructure.Repositories
{
    public class AuthRepository : IAuthRepository
    {
        private ISession _session;
        private UserManager<IdentityUser> _userManager;

        public AuthRepository(ISession session, UserManager<IdentityUser> userManager)
        {
            _session = session;
            _userManager = userManager;
        }

        public IdentityResult RegisterUser(UserModel userModel)
        {
            IdentityUser user = new IdentityUser
            {
                UserName = userModel.UserName
            };
            var result = _userManager.Create(user, userModel.Password);
            return result;
        }

        public IdentityUser FindUser(string userName, string password)
        {
            IdentityUser user = _userManager.Find(userName, password);
            return user;
        }

        public IdentityUser Find(UserLoginInfo loginInfo)
        {
            IdentityUser user = _userManager.Find(loginInfo);
            return user;
        }

        public IdentityResult Create(IdentityUser user)
        {
            var result = _userManager.Create(user);
            return result;
        }

        public IdentityResult AddLogin(string userId, UserLoginInfo login)
        {
            var result = _userManager.AddLogin(userId, login);
            return result;
        }

        public ListResult<UserListItemModel> List(ListRequest request)
        {
            var query = _session.QueryOver<IdentityUser>();

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
            var identityUser = _userManager.FindByName(userName);
            _userManager.Delete(identityUser);
        }
    }
}