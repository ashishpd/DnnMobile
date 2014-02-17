	var args = arguments[0] || {};

	var currentPageSize = 2;
	var WebApiHelper = require('WebApiHelper');
	
	var txtReplyChanged = function(e) {
		//Ti.API.info($.txtReply.value);
		$.btnReply.enabled = ($.txtReply.value != '');
	};
	
    var success = function(e) {				
			Ti.API.info(e.responseText);
			$.activityIndicator.hide();
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
			
			var section = Titanium.UI.createListSection({
			    // properties
			    items: data,
			    //headerTitle: header
			});
			
			$.listView.sections = [section];
			$.lblHeader.setText(header);
						
			//$.listView.sections[0].setItems(data);
			//$.listView.sections[0].setHeaderTitle(header);
			Titanium.API.info("header " + header + $.listView.sections[0].headerTitle);
	};

    var failure = function(e) {
		Titanium.API.info("failure called after login");
    	$.activityIndicator.hide();
    };
    
	function doReply(e){
	    
	    var success = function(e) {
			currentPageSize++;
			reload();
	    };
	
	    var failure = function(e) {
			Titanium.API.info("failure called after logoff");
			$.activityIndicator.hide();
	    	$.txtError.text="Error - " + WebApiHelper.error();
	    };
	
		//var data = {conversationId: args.conversationId, body: $.textReply.value};
		var data = "conversationId=" + args.conversationId + "&body=" + $.txtReply.value;
		
		var url = "/DesktopModules/CoreMessaging/API/MessagingService/Reply";
		$.activityIndicator.show();
		WebApiHelper.Post(url, data, "65", "437", success, failure);
	};
	
	function reload() {
		$.activityIndicator.show();
		$.txtReply.value = '';
		var url = "/DesktopModules/CoreMessaging/API/MessagingService/Thread?conversationId="+args.conversationId+"&afterMessageId=-1&numberOfRecords="+currentPageSize;
		WebApiHelper.Get(url, "65", "437", success, failure);
	}
	
	reload();

