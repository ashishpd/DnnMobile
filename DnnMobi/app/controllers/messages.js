var args = arguments[0] || {};










	var WebApiHelper = require('WebApiHelper');
	WebApiHelper.xhrGet("/DesktopModules/CoreMessaging/API/MessagingService/Inbox?afterMessageId=-1&numberOfRecords=10", "64", "436");
	
	function waitForResponse () {           //  create a loop function
   		setTimeout(function () {    //  call a 3s setTimeout when the loop is called  	
      		$.lblStatus.text = WebApiHelper.status();
      		$.lblResponseText.text = WebApiHelper.responseText();
      		
      		
      		//$.listSection.setItems(WebApiHelper.responseText());
      		var listView = Ti.UI.createListView();

			var tasks = [
			    {id: 'trash', name: 'Take Out the Trash', icon: 'trash.png'},
			    {id: 'dishes', name: 'Do the Dishes', icon: 'dishes.png'},
			    {id: 'doggie', name: 'Walk the Dog', icon: 'doggie.png'}
			];
			
			var data = [];
			var data1 = WebApiHelper.jsonData();
			for (var i = 0; i < data1.Conversations.length; i++) {

			    data.push(
			        { properties: {
			            itemId: tasks[i].MessageID,
			            title: data1.Conversations[i].From,
			            accessoryType: Ti.UI.LIST_ACCESSORY_TYPE_NONE,
			            color: 'black'
			        }
			    });
			}
			
			var section = Ti.UI.createListSection();
			
			section.setItems(data);
			listView.sections = [section];
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
      		
      		
      		
      		
      		
		}, 4000);
}

waitForResponse();