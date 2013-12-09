using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;
using AshPrasad.DnnWebApiClient;
using DotNetNuke.Entities.Users.Social;
using Newtonsoft.Json;

namespace DnnWebApiWindowsClient
{
    public partial class Form1 : Form
    {
        public Form1()
        {
            InitializeComponent();

            txtSite.Text = "http://ashprasad.com";
            txtUser.Text = "ash.prasad";
            txtPassword.Text = "Mypassword3";



            //var users = new List<User> { 
            //    new User { DisplayName = "Ash Prasad", FriendStatus = 1}
            //    , new User { DisplayName = "Super User", FriendStatus = 2 }
            //, new User { DisplayName = "Joe Brinkman", FriendStatus = 0 }};
            //gvMembers.DataSource = users;     //bind to GridView

            //foreach (DataGridViewRow dgvr in gvMembers.Rows)
            //{
            //    dgvr.Cells[0].Value = true;// "ddd";
            //}

            //for (int i = 0; i < gvMembers.RowCount; i++)
            //{
            //  //  gvMembers.Rows[i].Cells["clmAction"].Value =
            //   //     "Button " + i.ToString();
            //}

            //foreach (DataGridViewRow row in gvMembers.Rows)
            //{
            //    //row.Cells[clmCheck.Name].Value = false;
            //}


        }

        private void btnLogin_Click(object sender, EventArgs e)
        {
            DnnWebApiClientController.Instance.Login(txtSite.Text, txtUser.Text, txtPassword.Text);
            var parm = new GetParms {EndPoint = "DesktopModules/MemberDirectory/API/MemberDirectory/AdvancedSearch", 
				QueryString = "?userId=1&groupId=-1&pageIndex=0&pageSize=20&searchTerm1=&searchTerm2=&searchTerm3=&searchTerm4=",
				TabId = 96, ModuleId = 484 };
			var response = DnnWebApiClientController.Instance.Get(parm);
            if (response.Status == HttpStatusCode.OK)
            {
                var users = JsonConvert.DeserializeObject<IList<User>>(response.Data);
                gvMembers.DataSource = users;  
            }
            foreach (DataGridViewRow dgvr in gvMembers.Rows)
            {
                var userName = dgvr.Cells["UserName"].Value;
                if(userName == txtUser.Text) continue;
                var friendStatus = dgvr.Cells["FriendStatus"].Value;
                switch ((RelationshipStatus) friendStatus)
                {
                    case RelationshipStatus.None:
                        dgvr.Cells[0].Value = "Add Friend";
                        break;
                    case RelationshipStatus.Pending:
                        dgvr.Cells[0].Value = "Pending";
                        break;
                    case RelationshipStatus.Accepted:
                        dgvr.Cells[0].Value = "Remove Friend";
                        break;
                }
            }
        }

        private void gvMembers_CellContentClick(object sender, DataGridViewCellEventArgs e)
        {
               //make sure click not on header and column is type of ButtonColumn
            if (e.RowIndex >= 0 && ((DataGridView)sender).Columns[e.ColumnIndex].GetType() == typeof(DataGridViewButtonColumn))
            {
                 //TODO - Execute Code Here
                var row = ((DataGridView) sender).Rows[e.RowIndex];
                var friendStatus = (RelationshipStatus)row.Cells["FriendStatus"].Value;
                var targetUserName = row.Cells["UserName"].Value;
                var targetFriendId = row.Cells["MemberId"].Value;

                var parm = new PostParms
                               {
                                   EndPoint = "DesktopModules/MemberDirectory/API/MemberDirectory/AddFriend",
                                   Content = JsonConvert.SerializeObject(new FriendDto { FriendId = Convert.ToInt32(targetFriendId) }),
                                   TabId = 96,
                                   ModuleId = 484
                               };

                var response = DnnWebApiClientController.Instance.Post(parm);

            }
        }

        
    }
}
