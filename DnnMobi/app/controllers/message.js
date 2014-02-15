var args = arguments[0] || {};

Ti.API.info(args.conversationId);

var WebApiHelper = require('WebApiHelper');
	
    var success = function(e) {				
			Ti.API.info(e.responseText);
			var data = [];
			var response = JSON.parse(e.responseText); 
			for (var i = 0; i < response.Conversations.length; i++) {
			    data.push({
			        from : { text: response.Conversations[i].From, color: 'blue' },
			        when : { text: response.Conversations[i].DisplayDate },
			        message : { text: response.Conversations[i].Subject + ' - ' + response.Conversations[i].Body },
			        profilePic : { image: WebApiHelper.profilePic(response.Conversations[i].SenderUserID) },
			        // Sets the regular list data properties
			        properties : {
			            itemId: response.Conversations[i].MessageID,
			            accessoryType: Ti.UI.LIST_ACCESSORY_TYPE_NONE
			        }
			    });
			}		
			
			$.listView.sections[0].setItems(data);
			
    };

    var failure = function(e) {
		Titanium.API.info("failure called after login");
    	
    };
	
	var url = "/DesktopModules/CoreMessaging/API/MessagingService/Thread?conversationId="+args.conversationId+"&numberOfRecords=2";
	WebApiHelper.Get(url, "65", "437", success, failure);
	