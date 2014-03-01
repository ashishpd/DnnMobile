var args = arguments[0] || {};

	var WebApiHelper = require('WebApiHelper');
	var recordsLoaded = 0;
	var earliestMessageId = -1;
	
	function doLoadMore(e){
	    reload();
	};
	
	function doRefresh(e){	
	    refresh();
	};
		
	$.listView.addEventListener('itemclick', function(e){
		Ti.API.info(e.bindId);
		var item = e.section.getItemAt(e.itemIndex);
		//Ti.API.info(item);
		var arg = {
	        conversationId: item.properties.itemId
		};
		Alloy.createController('message', arg).getView().open();    
	});	
		
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
			    recordsLoaded++;
			    earliestMessageId = conversation.MessageID;
			}		
			
			$.listView.sections[0].appendItems(data);
			$.btnLoadMore.visible = (response.TotalConversations > recordsLoaded);
    };

    var failure = function(e) {
		$.txtError.text="Error - " + WebApiHelper.error();
		$.activityIndicator.hide();
    };
	
	function reload() {
		$.btnLoadMore.visible = false;
		$.activityIndicator.show();
		var url = '/DesktopModules/CoreMessaging/API/MessagingService/Inbox?afterMessageId=' + earliestMessageId + '&numberOfRecords=10';
		WebApiHelper.Get('DotNetNuke.Modules.CoreMessaging',url, success, failure);
	
	}
	
	function refresh() {
		recordsLoaded = 0;
		earliestMessageId = -1;	
		 
		var section = $.listView.sections[0];	
		if(section.items.length > 0) {
			section.deleteItemsAt(0,section.items.length);
		}
		
	    reload();
	}	
	
	//refresh();
	
	