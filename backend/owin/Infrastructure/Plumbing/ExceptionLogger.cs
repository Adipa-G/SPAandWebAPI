using Domain.Enum;
using Domain.Interfaces.Repositories;
using System.Threading;
using System.Threading.Tasks;
using System.Web.Http.ExceptionHandling;

namespace Infrastructure.Plumbing
{
    public class ExceptionLogger : IExceptionLogger
    {
        private ILogWriterRepository logRepository;

        public ExceptionLogger(ILogWriterRepository logRepository)
        {
            this.logRepository = logRepository;
        }

        public async Task LogAsync(ExceptionLoggerContext context, CancellationToken cancellationToken)
        {
            await Task.Run(() =>
                           {
                               if (context.Exception != null)
                               {
                                   logRepository.Log(LogLevel.Error, LoggerName.General, context.Exception.Message,
                                       context.Exception);
                               }
                           }, cancellationToken);
        }
    }
}