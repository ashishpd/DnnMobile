using System;

namespace AshPrasad.DnnWebApiClient
{
	/// <summary>
	/// Parameters to be sent for a Get operation
	/// </summary>
	public class GetParms
	{
		/// <summary>
		/// The End Point for the WebAPI. Example: DesktopModules/MemberDirectory/API/MemberDirectory/AdvancedSearch
		/// </summary>
		public string EndPoint {get; set;} 

		/// <summary>
		/// Additional Query String parameters to be sent. Example: &userId=-1&groupId=-1&pageIndex=0&pageSize=20&searchTerm1=&searchTerm2=&searchTerm3=&searchTerm4=
		/// </summary>
		public string QueryString {get; set;}

		/// <summary>
		/// TabId to include in the Header. This is needed when WebAPI has SupportedModules or DnnModuleAuthorize attributes associated with the method or the class.
		/// </summary>
		public int TabId { get; set;}

		/// <summary>
		/// ModuleId to include in the Header. This is needed when WebAPI has SupportedModules or DnnModuleAuthorize attributes associated with the method or the class.
		/// </summary>
		public int ModuleId { get; set; } 
	}
}

