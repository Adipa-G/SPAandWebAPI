namespace Domain.Entities
{
    public class User
    {
        public virtual long UserId { get; set; }
        public virtual string UserName { get; set; }
        public virtual string Password { get; set; }
    }
}
