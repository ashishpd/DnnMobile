using System;

namespace AshPrasad.DnnWebApiClient
{
	public class PostParms
	{
		public string EndPoint {get; set;} 
		public object Content {get; set;}
		public int TabId { get; set;}
		public int ModuleId { get; set; } 
	}
}

