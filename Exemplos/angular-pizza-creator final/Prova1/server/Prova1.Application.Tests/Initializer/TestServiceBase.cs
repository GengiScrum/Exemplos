using NUnit.Framework;
using Prova1.Application.Mapping;

namespace Prova1.Application.Tests.Initializer
{
    [TestFixture]
    public class TestServiceBase
    {
        [OneTimeSetUp]
        public void InitializeOnceTime()
        {
            AutoMapperInitializer.Reset();
            AutoMapperInitializer.Initialize();
        }
    }
}
