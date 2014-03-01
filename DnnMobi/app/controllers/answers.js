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
	
	function doNew(e){	
	    Alloy.createController('newquestion').getView().open(); 
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
				var question = response.Results[i];		
				
			    data.push({
			        title : { text: question.contentTitle },
			        when : { text: question.lastActiveRelativeDate },
			        message : { text: question.contentSummary },
			        profilePic : { image: WebApiHelper.profilePic(question.createdUserId) },
			        properties : {
			            itemId: question.postId,
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
		var url = '/DesktopModules/DNNCorp/Answers/API/List/Query';
		var data = {category: null, 
					pageIndex: currentPage,
					pageSize: 10,
					sortColumn: 'lastactive',
					sortAscending: false,
					tags: [],
					groupId: -1,
					sequence: 6};
		
		//{"category":null,"pageIndex":1,"pageSize":25,"sortColumn":"lastactive","sortAscending":false,"tags":[],"groupId":-1,"sequence":0}
		
		//var parms = {"category":"answered","pageIndex":0,"pageSize":25,"sortColumn":"lastactive","sortAscending":false,"tags":[],"sequence":2};
		
		$.activityIndicator.show();
		WebApiHelper.PostAsJson('Answers', url, data, success, failure);
	
	
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
	
	refresh();
	
	