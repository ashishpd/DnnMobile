	var args = arguments[0] || {};

	var currentPageSize = 2;
	var WebApiHelper = require('WebApiHelper');
	
	if (Titanium.Platform.name == 'android') {
    	$.winMessage.windowSoftInputMode = Ti.UI.Android.SOFT_INPUT_ADJUST_PAN;
	}
	
	function doBack(e) {
    	$.winMessage.close();
	};
	
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
		$.txtError.text="Error - " + WebApiHelper.error();
    	$.activityIndicator.hide();
    };
    
	function doReply(e){
	    
	    var success = function(e) {
			currentPageSize++;
			reload();
	    };
	
	    var failure = function(e) {
			$.activityIndicator.hide();
	    	$.txtError.text="Error - " + WebApiHelper.error();
	    };
	
		var data = "conversationId=" + args.conversationId + "&body=" + $.txtReply.value;
		
		var url = "/DesktopModules/CoreMessaging/API/MessagingService/Reply";
		$.activityIndicator.show();
		WebApiHelper.Post('DotNetNuke.Modules.CoreMessaging', url, data, success, failure);
	};
	
	function reload() {
		$.activityIndicator.show();
		$.txtReply.value = '';
		$.btnReply.enabled = false;
		var url = "/DesktopModules/CoreMessaging/API/MessagingService/Thread?conversationId="+args.conversationId+"&afterMessageId=-1&numberOfRecords="+currentPageSize;
		WebApiHelper.Get('DotNetNuke.Modules.CoreMessaging', url, success, failure);
	}
	
	reload();

