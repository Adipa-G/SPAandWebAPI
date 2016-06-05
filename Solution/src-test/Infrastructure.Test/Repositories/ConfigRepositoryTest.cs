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
        public override void TearDown()
        {
            base.TearDown();
        }

        [Test]
        public void GivenSettingValue_WhenGetSettingValue_ThenReturnValue()
        {
            Session.Save(new ConfigSetting() {ConfigKey = "abc", ConfigValue = "def"});
            FlushAndClear();

            var sut = new ConfigRepository(Session);
            var value = sut.GetSettingValue("abc", "pqr");

            Assert.AreEqual("def",value);
        }

        [Test]
        public void GivenNoSettingValue_WhenGetSettingValue_ThenWriteDefaultValue()
        {
            var sut = new ConfigRepository(Session);
            sut.GetSettingValue("abc", "pqr");
            FlushAndClear();

            var value = sut.GetSettingValue("abc", "lmn");
            Assert.AreEqual("pqr", value);
        }

        [Test]
        public void GivenNoSettingValue_WhenSetSettingValue_ThenSetValue()
        {
            var sut = new ConfigRepository(Session);
            sut.SetSettingValue("abc", "pqr");
            FlushAndClear();

            var value = sut.GetSettingValue("abc", "lmn");
            Assert.AreEqual("pqr", value);
        }
    }
}
