using System;
using System.Collections.Generic;
using Android.App;
using Android.Widget;
using Newtonsoft.Json;
using AshPrasad.DnnWebApiClient;
using DotNetNuke.Entities.Users.Social;

namespace DnnMobile.Adapters
{
	/// <summary>
	/// Adapter that presents Tasks in a row-view
	/// </summary>
	public class UserListAdapter : BaseAdapter<User> {
		protected Activity context = null;
		protected IList<User> users = new List<User>();

		public UserListAdapter (Activity context, IList<User> users) : base ()
		{
			this.context = context;
			this.users = users;
		}

		public override User this[int position]
		{
			get { return users[position]; }
		}

		public override long GetItemId (int position)
		{
			return position;
		}

		public override int Count
		{
			get { return users.Count; }
		}

		public override Android.Views.View GetView (int position, Android.Views.View convertView, Android.Views.ViewGroup parent)
		{
			// Get our object for position
			var item = users[position];			

			//Try to reuse convertView if it's not  null, otherwise inflate it from our item layout
			// gives us some performance gains by not always inflating a new view
			// will sound familiar to MonoTouch developers with UITableViewCell.DequeueReusableCell()
			var view = (convertView ?? 
			            context.LayoutInflater.Inflate(
				Resource.Layout.MemberItem, 
				parent, 
				false)) as LinearLayout;

			// Find references to each subview in the list item's view
			var txtDisplayName = view.FindViewById<TextView>(Resource.Id.txtDisplayName);
			//var txtEmail = view.FindViewById<TextView>(Resource.Id.txtEmail);
			var btnAction = view.FindViewById<Button>(Resource.Id.btnAction);

			//Assign item's values to the various subviews
			txtDisplayName.SetText (item.DisplayName, TextView.BufferType.Normal);
			//txtEmail.SetText (item.Email, TextView.BufferType.Normal);

			switch ((RelationshipStatus) item.FriendStatus)
			{
				case RelationshipStatus.None:
					btnAction.Text = "Add Friend";
					break;
				case RelationshipStatus.Pending:
					btnAction.Text = "Pending";
					break;
				case RelationshipStatus.Accepted:
					btnAction.Text = "Remove Friend";
					break;
			}

			btnAction.Click += (o, e) => {
				var parm = new PostParms
				{
					EndPoint = "DesktopModules/MemberDirectory/API/MemberDirectory/AddFriend",
					Content = JsonConvert.SerializeObject(new FriendDto { FriendId = Convert.ToInt32(item.MemberId) }),
					TabId = 96,
					ModuleId = 484
				};

				var response = DnnWebApiClientController.Instance.Post(parm);

			};

			//Finally return the view
			return view;
		}
	}
}

