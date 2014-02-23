var args = arguments[0] || {};

	var WebApiHelper = require('WebApiHelper');
	
    var success = function(e) {		
    		$.activityIndicator.hide();	
			Ti.API.info(e.responseText);
			var data = [];
			var response = JSON.parse(e.responseText); 
			for (var i = 0; i < response.Conversations.length; i++) {
				var conversation = response.Conversations[i];
				var message = conversation.Subject;
				if(message.length > 0){
					message +=' - ';
				}
				message += conversation.Body;
								
				var fromFont = {fontFamily:'Arial', fontSize: '20dp' };
				if(conversation.NewThreadCount > 0){
					fromFont = {fontFamily:'Arial', fontSize: '20dp', fontWeight: 'bold'};
				};			
				
			    data.push({
			        // Maps to the rowtitle component in the template
			        // Sets the text property of the Label component
			        from : { text: conversation.From, font: fromFont },
			        when : { text: conversation.DisplayDate },
			        message : { text: message },
			        profilePic : { image: WebApiHelper.profilePic(conversation.SenderUserID) },
			        // Sets the regular list data properties
			        properties : {
			            itemId: conversation.ConversationId,
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
		$.activityIndicator.hide();
    };
	
	//laptop
	//WebApiHelper.xhrGet("/DesktopModules/CoreMessaging/API/MessagingService/Inbox?afterMessageId=-1&numberOfRecords=10", "67", "446");
	
	//ashprasad.com
	$.activityIndicator.show();
	//WebApiHelper.Get("/DesktopModules/CoreMessaging/API/MessagingService/Inbox?afterMessageId=-1&numberOfRecords=10", "65", "437", success, failure);
	WebApiHelper.Get('DotNetNuke.Modules.CoreMessaging',"/DesktopModules/CoreMessaging/API/MessagingService/Inbox?afterMessageId=-1&numberOfRecords=10", success, failure);
	
	//www.dnnsoftware.com
	//WebApiHelper.xhrGet("/DesktopModules/CoreMessaging/API/MessagingService/Inbox?afterMessageId=-1&numberOfRecords=10", "67", "446");
	
	//catalyst
	//WebApiHelper.xhrGet("/DesktopModules/CoreMessaging/API/MessagingService/Inbox?afterMessageId=-1&numberOfRecords=10", "124", "514");
	