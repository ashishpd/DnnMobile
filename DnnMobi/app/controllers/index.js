$.winLogin.open();
$.txtSiteName.value="http://www.ashprasad.com";
$.txtUserName.value="user1";
$.txtPassword.value="1234567";
function doLogin(e){
    Titanium.API.info("You clicked the button");
	var WebApiHelper = require('WebApiHelper');
	WebApiHelper.sayHello("Ash");
};