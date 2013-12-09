using System;
using Android.App;
using Android.Content;
using Android.Runtime;
using Android.Views;
using Android.Widget;
using Android.OS;
using System.Net;
using System.Text;
using System.Text.RegularExpressions;
using System.Web;
using AshPrasad.DnnWebApiClient;

namespace DnnMobile
{
	[Activity (Label = "DnnMobile", MainLauncher = true)]
	public class MainActivity : Activity
	{
		protected override void OnCreate (Bundle bundle)
		{
			base.OnCreate (bundle);

			// Set our view from the "main" layout resource
			SetContentView (Resource.Layout.Main);

			var txtSite = FindViewById<AutoCompleteTextView> (Resource.Id.txtSite);
			txtSite.Text = "http://dnn4yk57i.trials.dnncloudservices.com/";

			var txtUser = FindViewById<AutoCompleteTextView> (Resource.Id.txtUser);
			txtUser.Text = "user1";

			var txtPassword = FindViewById<EditText> (Resource.Id.txtPassword);
			txtPassword.Text = "1234567";
		
			Button login = FindViewById<Button> (Resource.Id.btnLogin);
			login.Click += delegate {
				try
				{
				DnnWebApiClientController.Instance.Login (txtSite.Text, txtUser.Text, txtPassword.Text);
				StartActivity (typeof(MembersActivity));
				}
				catch (Exception ex)
				{
					var txtError = FindViewById<TextView> (Resource.Id.txtError);
					txtError.Text = ex.Message;
				}
			};
		}
	}
}


