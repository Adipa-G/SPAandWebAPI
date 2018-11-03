using Domain.Models;
using Domain.Models.Auth;

namespace Domain.Interfaces.Repositories
{
    public interface IUserRepository
    {
        UserModel RegisterUser(UserModel userModel);
        UserModel FindUser(string userName, string password);
        ListResult<UserListItemModel> List(ListRequest request);
        void Delete(string userName);
    }
}