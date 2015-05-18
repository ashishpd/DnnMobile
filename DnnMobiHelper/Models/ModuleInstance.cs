using System.Runtime.Serialization;

namespace DnnMobiHelper.Models
{
    [DataContract]
    public class ModuleInstance
    {
        [DataMember]
        public string PageName { get; set; }

        [DataMember]
        public string PagePath { get; set; }

        [DataMember]
        public int TabId { get; set; }

        [DataMember]
        public int ModuleId { get; set; }

        [DataMember]
        public string Definition { get; set; }
    }
}
