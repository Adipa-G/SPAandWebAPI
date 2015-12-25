using Domain.Models;
using Domain.Models.Auth;
using Microsoft.AspNet.Identity;
using NHibernate.AspNet.Identity;

namespace Domain.Interfaces.Repositories
{
    public interface IAuthRepository
    {
        IdentityResult RegisterUser(UserModel userModel);
        IdentityUser FindUser(string userName, string password);
        IdentityUser Find(UserLoginInfo loginInfo);
        IdentityResult Create(IdentityUser user);
        IdentityResult AddLogin(string userId, UserLoginInfo login);
        ListResult<UserListItemModel> List(ListRequest request);
        void Delete(string userName);
    }
}