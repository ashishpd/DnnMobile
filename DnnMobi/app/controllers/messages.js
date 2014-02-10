var args = arguments[0] || {};

	var WebApiHelper = require('WebApiHelper');
	
    var success = function(e) {				
			Ti.API.info(e.responseText);
			var data = [];
			var response = JSON.parse(e.responseText); 
			for (var i = 0; i < response.Conversations.length; i++) {
			    data.push({
			        // Maps to the rowtitle component in the template
			        // Sets the text property of the Label component
			        from : { text: response.Conversations[i].From },
			        when : { text: response.Conversations[i].DisplayDate },
			        message : { text: response.Conversations[i].Subject + ' - ' + response.Conversations[i].Body },
			        pic : { image: WebApiHelper.profilePic(response.Conversations[i].SenderUserID) },
			        // Sets the regular list data properties
			        properties : {
			            itemId: response.Conversations[i].ConversationId,
			            accessoryType: Ti.UI.LIST_ACCESSORY_TYPE_NONE
			        }
			    });
			}		
			
			$.listView.sections[0].setItems(data);
			$.listView.addEventListener('itemclick', function(e){
				Ti.API.info(e.bindId);
				var item = e.section.getItemAt(e.itemIndex);
				//Ti.API.info(item);
				var arg = {
			        conversationId: item.properties.itemId
   				};
				Alloy.createController('message', arg).getView().open();
				/*
			    // Only respond to clicks on the label (rowtitle) or image (pic)
			    if (e.bindId == 'rowtitle' || e.bindId == 'pic') {
			        var item = e.section.getItemAt(e.itemIndex);
			        if (item.properties.accessoryType == Ti.UI.LIST_ACCESSORY_TYPE_NONE) {
			            item.properties.accessoryType = Ti.UI.LIST_ACCESSORY_TYPE_CHECKMARK;
			        }
			        else {
			            item.properties.accessoryType = Ti.UI.LIST_ACCESSORY_TYPE_NONE;
			        }
			        e.section.updateItemAt(e.itemIndex, item);
			    } */     
			});			
			
			//$.winMessages.add(listView);
    };

    var failure = function(e) {
		Titanium.API.info("failure called after login");
    	
    };
	
	//laptop
	//WebApiHelper.xhrGet("/DesktopModules/CoreMessaging/API/MessagingService/Inbox?afterMessageId=-1&numberOfRecords=10", "67", "446");
	
	//ashprasad.com
	WebApiHelper.Get("/DesktopModules/CoreMessaging/API/MessagingService/Inbox?afterMessageId=-1&numberOfRecords=10", "65", "437", success, failure);
	
	//www.dnnsoftware.com
	//WebApiHelper.xhrGet("/DesktopModules/CoreMessaging/API/MessagingService/Inbox?afterMessageId=-1&numberOfRecords=10", "67", "446");
	
	//catalyst
	//WebApiHelper.xhrGet("/DesktopModules/CoreMessaging/API/MessagingService/Inbox?afterMessageId=-1&numberOfRecords=10", "124", "514");
	