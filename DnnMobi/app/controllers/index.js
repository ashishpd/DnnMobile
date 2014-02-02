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
	Titanium.API.info("Calling Login");
	WebApiHelper.login($.txtSiteName.value, $.txtUserName.value, $.txtPassword.value);
	Titanium.API.info("Called Login");
	
	var i = 1;                     //  set your counter to 1
	var maxCheck = 20;             //  max time to wait 
	function myLoop () {           //  create a loop function
   		setTimeout(function () {    //  call a xs setTimeout when the loop is called  
   		if(WebApiHelper.isLoggedIn() == true) {    		      		
      		Alloy.createController("messages").getView().open();
	      	} else if (WebApiHelper.isError() == true) {
	      		$.txtError.text="Error - " + WebApiHelper.error();
	   		} else if (i < maxCheck) {
	      		myLoop();
	    	}
	   	}, 1000);
	}
	myLoop();                      //  start the loop	
};

function closeWindow() {
    $.winLogin.close();
};