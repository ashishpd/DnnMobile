//var library = Alloy.Collections.book;
//library.fetch();

var site = Alloy.Collections.site;
site.fetch();

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

var WebApiHelper = require('WebApiHelper');

function doLogin(e){
    
    var success = function(e) {
		login();
    };

    var failure = function(e) {
		Titanium.API.info("failure called after logoff");
    	$.txtError.text="Error - " + WebApiHelper.error();
    };

	Titanium.API.info("isLoggedIn" + WebApiHelper.isLoggedIn());
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
    
	var sitetModel = Alloy.createModel("site", {
		url: $.txtSiteName.value,	
		user: $.txtUserName.value
    });
	//sitetModel.save();
       
	Titanium.API.info("Calling Login");
	WebApiHelper.login($.txtSiteName.value, $.txtUserName.value, $.txtPassword.value, success, failure);
	Titanium.API.info("Called Login");
	
};

// Encase the title attribute in square brackets
function transformFunction(model) {
	Titanium.API.info("model: " + model);
    // Need to convert the model to a JSON object
    var transform = model.toJSON();
    Titanium.API.info("transform url: " + transform.url);
    Titanium.API.info("transform getclass: " + model.getclass());
    
    transform.title = '[' + transform.title + ']';
    // Example of creating a custom attribute, reference in the view using {custom}
    //transform.customproperty = transform.url + " by " + transform.user;
    transform.customproperty = model.getclass();
    transform.prop2 = 'red';
    return transform;
}


function closeWindow() {
    $.winLogin.close();
};

/* cannot use any api except close as all objects are already unloaded
$.winLogin.addEventListener('android:back', function (e) {
	Titanium.API.info("Pressing Back Will Not Close The Activity/Window");
	$.winLogin.close();  
});
*/