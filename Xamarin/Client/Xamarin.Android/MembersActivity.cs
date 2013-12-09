using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Android.App;
using Android.Content;
using Android.OS;
using Android.Runtime;
using Android.Views;
using Android.Widget;
using System.Web;
using System.Net;
using Newtonsoft.Json;
using AshPrasad.DnnWebApiClient;


namespace DnnMobile
{
	[Activity (Label = "Members")]			
	public class MembersActivity : Activity
	{
		protected override void OnCreate (Bundle bundle)
		{
			base.OnCreate (bundle);

			// Create your application here
			SetContentView (Resource.Layout.Members);

			//var gridview = FindViewById<GridView> (Resource.Id.gridMembers);

			var parm = new GetParms {EndPoint = "DesktopModules/MemberDirectory/API/MemberDirectory/AdvancedSearch", 
				QueryString = "?userId=1&groupId=-1&pageIndex=0&pageSize=20&searchTerm1=&searchTerm2=&searchTerm3=&searchTerm4=",
				TabId = 96, ModuleId = 484 };
			var response = DnnWebApiClientController.Instance.Get(parm);
			if (response.Status == HttpStatusCode.OK) {
				var users = JsonConvert.DeserializeObject<IList<User>>(response.Data);

				// create our adapter
				var userList = new Adapters.UserListAdapter(this, users);

				var listMembers = FindViewById<ListView> (Resource.Id.listMembers);
				//Hook up our adapter to our ListView
				listMembers.Adapter = userList;
			}
		}

	}
}

