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
			        votes :  { text: question.questionVotes },
			        answers :  { text: question.totalAnswers },
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
		$.activityIndicator.show();
		var url = '/DesktopModules/DNNCorp/Answers/API/List/Query';
		var data = {category: null, 
					pageIndex: currentPage,
					pageSize: Alloy.Globals.pageSize,
					sortColumn: 'lastactive',
					sortAscending: false,
					tags: [],
					groupId: -1,
					sequence: 0};
		
		$.activityIndicator.show();
		WebApiHelper.PostAsJson('Answers', url, data, success, failure);
	}
	
	function refresh() {
		recordsLoaded = 0;
		currentPage = 0;	
		$.btnLoadMore.visible = false;
		 
		var section = $.listView.sections[0];	
		if(section.items.length > 0) {
			section.deleteItemsAt(0,section.items.length);
		}
		
	    reload();
	}	
	
	//refresh();
	
	var dummyData = new Object();
	var json = {TotalRecords: 3, 
		Results: [
		{contentTitle: 'title', 
		lastActiveRelativeDate: '1 minute ago', 
		contentSummary:'summary', 
		questionVotes: 999, 
		totalAnswers: 888},
		{contentTitle: 'title', 
		lastActiveRelativeDate: '1 minute ago', 
		contentSummary:'summary', 
		questionVotes: 22, 
		totalAnswers: 33},
		{contentTitle: 'title', 
		lastActiveRelativeDate: '5 minutes ago', 
		contentSummary:'summary', 
		questionVotes: 5, 
		totalAnswers: 6}]
	};	
	dummyData.responseText = JSON.stringify(json);
	
	Ti.API.info('DUMMYDATA' + dummyData);
	success(dummyData);
