using System.Threading.Tasks;
using Domain.Models;
using Domain.Models.Auth;

namespace Domain.Interfaces.Repositories
{
    public interface IUserRepository
    {
        Task<UserModel> RegisterUserAsync(UserModel userModel);
        Task<UserModel> FindUserAsync(string userName);
        Task<UserModel> FindUserAsync(string userName, string password);
        Task<ListResult<UserListItemModel>> ListAsync(ListRequest request);
        Task DeleteAsync(string userName);
    }
}