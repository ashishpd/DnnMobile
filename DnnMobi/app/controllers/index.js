$.winLogin.open();


var defaultSites = [
	{site:'mobile-wizards.evoqtrial.com', user:'99J1P7_manager', pwd:'aJ2s3lM7hA52'},
	{site:'dnnq8v9be.cloudapp.net', user:'ash.prasad', pwd:'Mypassword1'},
	{site:'ashprasad.com', user:'user1', pwd:'1234567'},
	{site:'www.dnnsoftware.com', user:'ashishpd', pwd:'dotdot1'},
	{site:'catalyst.dnnsoftware.com', user:'ashishpd', pwd:'dotdot1'}	
];

var knownSites = Ti.App.Properties.getList('knownsites', defaultSites);

function loadKnownSites(){
	var len = knownSites.length;
	var data = [];
	for (var i = 0; i < len; i++) {
		var knownSite = knownSites[i];
		data.push(Ti.UI.createPickerRow(
			{title:knownSite.site, 
			user:knownSite.user,
			pwd:knownSite.pwd}));
	}	
	$.pickerSites.add(data);
	$.pickerSites.selectionIndicator = true;
	
	var row = data[0];
	$.txtSiteName.value=row.title;
	$.txtUserName.value=row.user;
	$.txtPassword.value=row.pwd;
};

var WebApiHelper = require('WebApiHelper');

function doSelectSite(e){
	var row = $.pickerSites.getSelectedRow(0);
	if(row != undefined) {
		Ti.API.info("User selected site: " + row.title + " user: " + row.user);
		$.txtSiteName.value=row.title;
		$.txtUserName.value=row.user;
		$.txtPassword.value=row.pwd;
	}
};

function doSkip(e){
    var success = function(e) {
    	$.activityIndicator.hide();
      	Alloy.createController("main").getView().open();
    };

    var failure = function(e) {
    	$.activityIndicator.hide();
		Titanium.API.info("failure called after pingSite");
    	$.txtError.text="Error - " + WebApiHelper.error();
    };
    
    $.activityIndicator.show();
	WebApiHelper.pingSite($.txtSiteName.value, success, success);
};

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

loadKnownSites();

//if (Titanium.Platform.name == 'iPhone OS') {
    //doSkip(null);
//}
