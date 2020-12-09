using System.Threading.Tasks;
using Domain.Entities;
using Infrastructure.Repositories;
using NUnit.Framework;

namespace Infrastructure.Test.Repositories
{
    [TestFixture]
    public class ConfigRepositoryTest : RepositoryTestBase
    {
        [OneTimeSetUp]
        protected override void OneTimeSetUp()
        {
            base.OneTimeSetUp();
        }

        [OneTimeTearDown]
        protected override void OneTimeTearDown()
        {
            base.OneTimeTearDown();
        }

        [SetUp]
        protected override void SetUp()
        {
            base.SetUp();
        }

        [TearDown]
        public override async Task TearDownAsync()
        {
            await base.TearDownAsync();
        }

        [Test]
        public async Task GivenSettingValue_WhenGetSettingValue_ThenReturnValue()
        {
            await Session.SaveAsync(new ConfigSetting() {ConfigKey = "abc", ConfigValue = "def"});
            await FlushAndClearAsync();

            var sut = new ConfigRepository(Session);
            var value = sut.GetSettingValue("abc", "pqr");

            Assert.AreEqual("def",value);
        }

        [Test]
        public async Task GivenNoSettingValue_WhenGetSettingValue_ThenWriteDefaultValue()
        {
            var sut = new ConfigRepository(Session);
            sut.GetSettingValue("abc", "pqr");
            await FlushAndClearAsync();

            var value = sut.GetSettingValue("abc", "lmn");
            Assert.AreEqual("pqr", value);
        }

        [Test]
        public async Task GivenNoSettingValue_WhenSetSettingValue_ThenSetValue()
        {
            var sut = new ConfigRepository(Session);
            sut.SetSettingValue("abc", "pqr");
            await FlushAndClearAsync();

            var value = sut.GetSettingValue("abc", "lmn");
            Assert.AreEqual("pqr", value);
        }
    }
}
