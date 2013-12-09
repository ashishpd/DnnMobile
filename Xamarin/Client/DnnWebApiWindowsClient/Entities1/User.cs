using System;

namespace AshPrasad.DnnWebApiClient
{
	/// <summary>
	/// DNN User
	/// </summary>
	public class User
	{
		/// <summary>
		/// User Id
		/// </summary>
		public string MemberId {get; set;} 

		/// <summary>
		/// Display Name
		/// </summary>
		public string DisplayName {get; set;} 

		/// <summary>
		/// Email Address
		/// </summary>
		public string Email {get; set;}

        /// <summary>
		/// UserName
		/// </summary>
        public string UserName { get; set; }

		/// <summary>
		/// Friendship status compared to the user reading this information
		/// </summary>
		public int FriendStatus { get; set;}

		public override string ToString ()
		{
			return DisplayName;
		}
	}
}

