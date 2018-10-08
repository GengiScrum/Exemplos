using System.Configuration;
using System.Diagnostics.CodeAnalysis;
using System.IO;
using System.Xml;
using System.Xml.Serialization;

namespace Prova1.Infra.Settings
{
    /// <summary>
    ///  Classe usada para ler as configurações da Web.config
    ///  
    ///  
    /// É usada em Web.config da Prova1.Auth para ler a sessão personalizada AuthenticationSettings
    /// </summary>
    [ExcludeFromCodeCoverage]
    public class ConfigurationSectionHandler : IConfigurationSectionHandler
    {
        private readonly string Namespace = "Prova1.Infra.Settings.Entities.{0}";

        public object Create(object parent, object configContext, XmlNode section)
        {
            MemoryStream stm = new MemoryStream();

            StreamWriter stw = new StreamWriter(stm);
            stw.Write(section.OuterXml);
            stw.Flush();

            stm.Position = 0;
            var type = System.Type.GetType(string.Format(Namespace, section.Name));

            XmlSerializer ser = new XmlSerializer(type);
            var result = (ser.Deserialize(stm));

            return result;
        }

    }
}
