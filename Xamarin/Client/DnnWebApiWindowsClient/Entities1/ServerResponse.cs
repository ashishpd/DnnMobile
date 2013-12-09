using System;
using System.Net;

namespace AshPrasad.DnnWebApiClient
{
	/// <summary>
	/// Response returned from Server after sending the request
	/// </summary>
	public class ServerResponse
	{
		/// <summary>
		/// The data returned by the server. This may be a JSON or an Error
		/// </summary>
		public string Data {get; set;} 

		/// <summary>
		/// HttpStatusCode returned from Server. A value of HttpStatusCode.OK indicates that no error was returned
		/// </summary>
		public  HttpStatusCode Status {get; set;}
	}
}

