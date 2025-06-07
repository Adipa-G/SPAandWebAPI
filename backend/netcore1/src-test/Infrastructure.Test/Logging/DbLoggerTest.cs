using Infrastructure.Logging;
using Microsoft.Extensions.Logging;
using NSubstitute;
using NUnit.Framework;
using Domain.Interfaces.Repositories;

namespace Infrastructure.Test.Logging;

[TestFixture]
public class DbLoggerTest
{
    private ILogWriterRepository _logWriterRepository;

    [SetUp]
    public void SetUp()
    {
        _logWriterRepository = Substitute.For<ILogWriterRepository>();
    }

    [TestCase(LogLevel.Trace,Domain.Enum.LogLevel.Debug)]
    [TestCase(LogLevel.Debug,Domain.Enum.LogLevel.Debug)]
    [TestCase(LogLevel.Information,Domain.Enum.LogLevel.Info)]
    [TestCase(LogLevel.Warning,Domain.Enum.LogLevel.Warn)]
    [TestCase(LogLevel.Error,Domain.Enum.LogLevel.Error)]
    [TestCase(LogLevel.Critical,Domain.Enum.LogLevel.Error)]
    [TestCase(LogLevel.None,Domain.Enum.LogLevel.Info)]
    public void GivenLogLevel_WhenLog_ThenConvertLevel(LogLevel srcLevel, Domain.Enum.LogLevel destLevel)
    {
        var dbLogger = new DbLogger(_logWriterRepository);

        dbLogger.Log(srcLevel, new EventId(), "Test message", null, (state, exception) => state.ToString());

        _logWriterRepository.Received(1).Log(destLevel, Domain.Enum.LoggerName.General, "Test message", null);
    }
}
