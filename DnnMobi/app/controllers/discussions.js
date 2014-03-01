var args = arguments[0] || {};

	var WebApiHelper = require('WebApiHelper');
	var recordsLoaded = 0;
	var currentPage = 0;
	
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
    };

    var failure = function(e) {
		$.txtError.text="Error - " + WebApiHelper.error();
		$.activityIndicator.hide();
    };
	
	function reload() {
		$.btnLoadMore.visible = false;
		$.activityIndicator.show();
		var url = '/DesktopModules/DNNCorp/Discussions/API/List/Query';
		var data = {category: null, 
					pageIndex: currentPage,
					pageSize: 10,
					sortColumn: 'createddate',
					sortAscending: false,
					tags: [],
					groupId: -1,
					sequence: 6};
		
		$.activityIndicator.show();
		WebApiHelper.PostAsJson('Discussions', url, data, success, failure);
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
	
	