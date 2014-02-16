	var args = arguments[0] || {};

	var WebApiHelper = require('WebApiHelper');
	
    var success = function(e) {				
			Ti.API.info(e.responseText);
			var data = [];
			var response = JSON.parse(e.responseText); 
			var header = '';
			for (var i = 0; i < response.Conversations.length; i++) {
				var conversation = response.Conversations[i].Conversation;
				header = conversation.Subject;
				if(header.length > 0){
					header +=' | ';
				}
				header += conversation.To;

			    data.push({
			        from : { text: conversation.From },
			        when : { text: conversation.DisplayDate },
			        message : { text: conversation.Body },
			        profilePic : { image: WebApiHelper.profilePic(conversation.SenderUserID) },
			        properties : {
			            itemId: conversation.MessageID,
			            accessoryType: Ti.UI.LIST_ACCESSORY_TYPE_NONE
			        }
			    });
			}		
			
			$.listView.sections[0].setItems(data);
			$.listView.sections[0].setHeaderTitle(header);
			Titanium.API.info("header " + header + $.listView.sections[0].headerTitle);
	};

    var failure = function(e) {
		Titanium.API.info("failure called after login");
    	
    };
	
	var url = "/DesktopModules/CoreMessaging/API/MessagingService/Thread?conversationId="+args.conversationId+"&afterMessageId=-1&numberOfRecords=2";
	WebApiHelper.Get(url, "65", "437", success, failure);
