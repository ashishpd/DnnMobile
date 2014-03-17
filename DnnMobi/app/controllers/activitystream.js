var args = arguments[0] || {};

	var WebApiHelper = require('WebApiHelper');
	var recordsLoaded = 0;
	var currentPage = 0;
	var module = 'Activity Stream';
	//var module = 'Journal';
	
	function doLoadMore(e){
	    reload();
	};
	
	function doRefresh(e){	
	    refresh();
	};

	function parseJournalRow(html) {
		html = html.replace("&w=","").replace("&h=","");					
		//Ti.API.info('parseJournalRow ' + html);

		var xmlDomDoc = Ti.XML.parseString(html); 
		
			// Get all the item tags and their contents
		var allItemTags = xmlDomDoc.getElementsByTagName('span'); 
		// Loop over them and grab the text contents and print
		for (var i=0; i < allItemTags.length; i++) {
		  var textContent = allItemTags.item(i).textContent;
		  var className = allItemTags.item(i).attributes.getNamedItem('class');
		  Ti.API.info(className + ': ' + textContent);
		};			
	}	

	function parseJournalList(html) {
		var start = 0;
		var locations = [];
		var search = "<div class=\"journalrow\"";
		while (true)
		{
		  pos = html.indexOf(search, start);
		  //Ti.API.info(pos);
		  locations.push(pos);
		  if(pos < 0) break;
		  start = pos + search.length;
		}									
		
		var row;
		for (var i = 0; i < locations.length; i++) {
		  if(locations[i] == -1) { 
		    break;
		  } else if(locations[i + 1] == -1) {
		    row = html.substr(locations[i]);
		  } else {
		    row = html.substr(locations[i], locations[i+1]);
		  }
		  var journal = parseJournalRow(row);
		}		
	}
		
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
		var html = e.responseText.replace(/&w=/g,'').replace(/&h=/,'').replace(/<\/a><\/em>/g,'</em></a>');
		
		var xmlDomDoc = Ti.XML.parseString(html); 
		
			// Get all the item tags and their contents
		var allItemTags = xmlDomDoc.getElementsByTagName('span'); 
		// Loop over them and grab the text contents and print
		for (var i=0; i < allItemTags.length; i++) {
		  var textContent = allItemTags.item(i).textContent;
		  var className = allItemTags.item(i).attributes.getNamedItem('class');
		  Ti.API.info(className + ': ' + textContent);
		};					
		
		
		//var feed = parseJournalList(e.responseText);
			
			/*
			var data = [];
			var response = JSON.parse(e.responseText); 
			for (var i = 0; i < response.Results.length; i++) {
				var topic = response.Results[i];		
				
			    data.push({
			        title : { text: topic.contentTitle },
			        when : { text: topic.lastActiveRelativeDate },
			        //message : { text: topic.contentSummary },
			        profilePic : { image: WebApiHelper.profilePic(topic.createdByUserId) },
			        properties : {
			            itemId: topic.topicId,
			            accessoryType: Ti.UI.LIST_ACCESSORY_TYPE_NONE
			        }
			    });
			    recordsLoaded++;
			}		
			
			$.listView.sections[0].appendItems(data);
			$.btnLoadMore.visible = (response.TotalRecords > recordsLoaded);
			currentPage += 1;
			*/
    };

    var failure = function(e) {
		$.txtError.text="Error - " + WebApiHelper.error();
		$.activityIndicator.hide();
    };
	
	function reload() {
		$.activityIndicator.show();
		var url = '/DesktopModules/DNNCorp/ActivityStream/API/ActivityStreamServices/GetListForProfile';
		//var url = '/DesktopModules/Journal/API/Services/GetListForProfile';
		var data = {ProfileId: -1, 
					GroupId: -1,
					RowIndex: 0,
					MaxRows: 2,
					FilterId: 0,
					JournalTypeId: 0
					};
		
		$.activityIndicator.show();
		WebApiHelper.PostAsJson(module, url, data, success, failure);
	}
	
	function refresh() {
		recordsLoaded = 0;
		currentPage = 0;	
		 
		var section = $.listView.sections[0];	
		if(section.items.length > 0) {
			section.deleteItemsAt(0,section.items.length);
		}
		
	    reload();
	}	
	
	//refresh();
	
	