var args = arguments[0] || {};

	var WebApiHelper = require('WebApiHelper');
	WebApiHelper.xhrGet("/DesktopModules/CoreMessaging/API/MessagingService/Inbox?afterMessageId=-1&numberOfRecords=10", "64", "436");
	
	function myLoop () {           //  create a loop function
   		setTimeout(function () {    //  call a 3s setTimeout when the loop is called  	
      		$.lblStatus.text = WebApiHelper.status();
      		$.lblResponseText.text = WebApiHelper.responseText();
		}, 4000);
}

myLoop();                      //  start the loop		
