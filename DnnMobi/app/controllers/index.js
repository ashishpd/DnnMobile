$.winLogin.open();
$.txtSiteName.value="http://ashprasad.com";
$.txtUserName.value="user1";
$.txtPassword.value="1234567";

//$.txtSiteName.value="http://www.dnnsoftware.com";
//$.txtSiteName.value="http://catalyst.dnnsoftware.com";
//$.txtSiteName.value="http://store.dnnsoftware.com";

//$.txtUserName.value="ashishpd";
//$.txtPassword.value="dotdot1";


if (Titanium.Platform.name == 'iPhone OS') {
    //doLogin();
}


function doLogin(e){
    var WebApiHelper = require('WebApiHelper');
    
    var success = function(e) {
		if(WebApiHelper.isLoggedIn() == true) {    		      		
      		Alloy.createController("messages").getView().open();
		} else if (WebApiHelper.isError() == true) {
	      		$.txtError.text="Error - " + WebApiHelper.error();
	   	}
    };

    var failure = function(e) {
		Titanium.API.info("failure called after login");
    	$.txtError.text="Error - " + WebApiHelper.error();
    };

    
	Titanium.API.info("Calling Login");
	WebApiHelper.login($.txtSiteName.value, $.txtUserName.value, $.txtPassword.value, success, failure);
	Titanium.API.info("Called Login");
	
};

function closeWindow() {
    $.winLogin.close();
};