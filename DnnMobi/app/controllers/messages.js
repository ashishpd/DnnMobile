var args = arguments[0] || {};

	var WebApiHelper = require('WebApiHelper');
	
	//laptop
	//WebApiHelper.xhrGet("/DesktopModules/CoreMessaging/API/MessagingService/Inbox?afterMessageId=-1&numberOfRecords=10", "67", "446");
	
	//ashprasad.com
	WebApiHelper.Get("/DesktopModules/CoreMessaging/API/MessagingService/Inbox?afterMessageId=-1&numberOfRecords=10", "65", "437");
	
	//www.dnnsoftware.com
	//WebApiHelper.xhrGet("/DesktopModules/CoreMessaging/API/MessagingService/Inbox?afterMessageId=-1&numberOfRecords=10", "67", "446");
	
	//catalyst
	//WebApiHelper.xhrGet("/DesktopModules/CoreMessaging/API/MessagingService/Inbox?afterMessageId=-1&numberOfRecords=10", "124", "514");
	
	
	
	
	function waitForResponse () {           //  create a loop function
   		setTimeout(function () {    //  call a 3s setTimeout when the loop is called  	
      		
	
			//var listSection = Ti.UI.createListSection({items: data});
			//var listView = Ti.UI.createListView({sections: [listSection]});
			
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
			
			// Create a custom template that displays an image on the left, 
			// then a title next to it with a subtitle below it.
			var myTemplate = {
			    childTemplates: [
			        {                            // Image justified left
			            type: 'Ti.UI.ImageView', // Use an image view for the image
			            bindId: 'pic',           // Maps to a custom pic property of the item data
			            properties: {            // Sets the image view  properties
			                width: '50dp', height: '50dp', left: 0
			            }
			        },
			        {                            // Title 
			            type: 'Ti.UI.Label',     // Use a label for the title 
			            bindId: 'title',          // Maps to a custom info property of the item data
			            properties: {            // Sets the label properties
			                color: 'black',
			                font: { fontFamily:'Arial', fontSize: '20dp', fontWeight:'bold' },
			                left: '60dp', top: 0,
			            }
			        },
			        {                            // Subtitle
			            type: 'Ti.UI.Label',     // Use a label for the subtitle
			            bindId: 'subtitle',       // Maps to a custom es_info property of the item data
			            properties: {            // Sets the label properties
			                color: 'gray',
			                font: { fontFamily:'Arial', fontSize: '14dp' },
			                left: '60dp', top: '25dp',
			            }
			        }
			    ]
			};

			var listView = Ti.UI.createListView({
			    // Maps myTemplate dictionary to 'template' string
			    templates: { 'template': myTemplate },
			    // Use 'template', that is, the myTemplate dict created earlier
			    // for all items as long as the template property is not defined for an item.
			    defaultItemTemplate: 'template'
			});
			
			var sections = [];
			var fruitSection = Ti.UI.createListSection({ headerTitle: 'Messages'});
	
			var data = [];
			var response = WebApiHelper.jsonData();
			for (var i = 0; i < response.Conversations.length; i++) {
			    data.push({
			        // Maps to the rowtitle component in the template
			        // Sets the text property of the Label component
			        title : { text: response.Conversations[i].From },
			        subtitle : { text: response.Conversations[i].Subject + ' - ' + response.Conversations[i].Body },
			        pic : { image: 'http://ashprasad.com/profilepic.ashx?userId=1&amp;h=64&amp;w=64' },
			        // Sets the regular list data properties
			        properties : {
			            itemId: response.Conversations[i].MessageID,
			            accessoryType: Ti.UI.LIST_ACCESSORY_TYPE_NONE
			        }
			    });
			}		
			
			fruitSection.setItems(data);
			sections.push(fruitSection);
			
			listView.setSections(sections);
			
			$.winMessages.add(listView);

		}, 3000);
}

waitForResponse();