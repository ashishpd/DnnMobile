$.winLogin.open();
$.txtSiteName.value="ashprasad.com";
$.txtUserName.value="user1";
$.txtPassword.value="1234567";

$.txtSiteName.value="dnnq8v9be.cloudapp.net";
$.txtUserName.value="ash.prasad";
$.txtPassword.value="Mypassword1";

$.txtSiteName.value="http://mobile-wizards.evoqtrial.com/";
$.txtUserName.value="99J1P7_manager";
$.txtPassword.value="aJ2s3lM7hA52";

//$.txtSiteName.value="store.dnnsoftware.com";
//$.txtSiteName.value="www.dnnsoftware.com";
//$.txtSiteName.value="catalyst.dnnsoftware.com";
//$.txtUserName.value="ashishpd";
//$.txtPassword.value="dotdot1";


if (Titanium.Platform.name == 'iPhone OS') {
    //doLogin();
}

var WebApiHelper = require('WebApiHelper');

function doLogin(e){
    var success = function(e) {
		login();
    };

    var failure = function(e) {
		Titanium.API.info("failure called after logoff");
    	$.txtError.text="Error - " + WebApiHelper.error();
    	$.activityIndicator.hide();
    };

	Titanium.API.info("isLoggedIn" + WebApiHelper.isLoggedIn());
	$.activityIndicator.show();
	if(WebApiHelper.isLoggedIn()) {
		Titanium.API.info("Calling Logoff");
		WebApiHelper.logoff(success, failure);
	}
	else {
		login();
	}
};

function login(){
    var success = function(e) {
    	$.activityIndicator.hide();
		if(WebApiHelper.isLoggedIn() == true) {   			 		      		
      		Alloy.createController("main").getView().open();
		} else if (WebApiHelper.isError() == true) {
	      		$.txtError.text="Error - " + WebApiHelper.error();
	   	}
    };

    var failure = function(e) {
    	$.activityIndicator.hide();
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

/* cannot use any api except close as all objects are already unloaded
$.winLogin.addEventListener('android:back', function (e) {
	Titanium.API.info("Pressing Back Will Not Close The Activity/Window");
	$.winLogin.close();  
});
*/