$.winLogin.open();
//$.txtSiteName.value="http://www.dnnsoftware.com";
$.txtSiteName.value="http://192.168.1.79/72ce";
$.txtUserName.value="user1";
$.txtPassword.value="1234567";

if (Titanium.Platform.name == 'iPhone OS') {
    //doLogin();
}


function doLogin(e){
    var WebApiHelper = require('WebApiHelper');
	Titanium.API.info("Calling Login");
	WebApiHelper.login($.txtSiteName.value, $.txtUserName.value, $.txtPassword.value);
	Titanium.API.info("Called Login");
	
	var i = 1;                     //  set your counter to 1
	function myLoop () {           //  create a loop function
   		setTimeout(function () {    //  call a 3s setTimeout when the loop is called
      		
      		
      	Alloy.createController("messages").getView().open();
		//sTitanium.API.info("opened messages window");
     //		 i++;                     //  increment the counter
	 //     if (i < 10) {            //  if the counter < 10, call the loop function
	 //        myLoop();             //  ..  again which will trigger another 
	 //     }                        //  ..  setTimeout()
   		}, 10000);
}

myLoop();                      //  start the loop	
		
	

};

function closeWindow() {
    $.winLogin.close();
};