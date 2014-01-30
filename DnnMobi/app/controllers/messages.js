var args = arguments[0] || {};

	var WebApiHelper = require('WebApiHelper');
	
	//laptop
	//WebApiHelper.xhrGet("/DesktopModules/CoreMessaging/API/MessagingService/Inbox?afterMessageId=-1&numberOfRecords=10", "67", "446");
	
	//ashprasad.com
	//WebApiHelper.xhrGet("/DesktopModules/CoreMessaging/API/MessagingService/Inbox?afterMessageId=-1&numberOfRecords=10", "65", "437");
	
	//www.dnnsoftware.com
	//WebApiHelper.xhrGet("/DesktopModules/CoreMessaging/API/MessagingService/Inbox?afterMessageId=-1&numberOfRecords=10", "65", "437");
	
	//catalyst
	WebApiHelper.xhrGet("/DesktopModules/CoreMessaging/API/MessagingService/Inbox?afterMessageId=-1&numberOfRecords=10", "124", "514");
	
	
	
	
	function waitForResponse () {           //  create a loop function
   		setTimeout(function () {    //  call a 3s setTimeout when the loop is called  	
      		
			var data = [];
			var response = WebApiHelper.jsonData();
			for (var i = 0; i < response.Conversations.length; i++) {
			    data.push(
			        { 
					    properties: {
					    	itemId: response.Conversations[i].MessageID,
				            title: response.Conversations[i].From,
				            subtitle: response.Conversations[i].Subject + ' - ' + response.Conversations[i].Body,
				            //image: 'http://192.168.1.79/72ce/profilepic.ashx?userId=1&h=64&w=64',
				            //image: '/assets/iphone/appicon.png',
				            image: 'KS_nav_views.png',
				            accessoryType: Ti.UI.LIST_ACCESSORY_TYPE_DETAIL
				        },
				        template: Ti.UI.LIST_ITEM_TEMPLATE_SUBTITLE
				    }  
			    );
			}
					
			var listSection = Ti.UI.createListSection({items: data});
			var listView = Ti.UI.createListView({sections: [listSection]});
			
			/*
			listView.addEventListener('itemclick', function(e){
			    var item = section.getItemAt(e.itemIndex);
			    if (item.properties.accessoryType == Ti.UI.LIST_ACCESSORY_TYPE_NONE) {
			        item.properties.accessoryType = Ti.UI.LIST_ACCESSORY_TYPE_CHECKMARK;
			        item.properties.color = 'red';
			    }
			    else {
			        item.properties.accessoryType = Ti.UI.LIST_ACCESSORY_TYPE_NONE;
			        item.properties.color = 'black';
			    }
			    section.updateItemAt(e.itemIndex, item);
			});
			*/
			
			$.winMessages.add(listView);

		}, 10000);
}

waitForResponse();