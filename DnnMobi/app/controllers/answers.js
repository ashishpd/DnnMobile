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
		{contentTitle: 'Playing video games well can get you into a top South Korean university', 
		lastActiveRelativeDate: '5 minutes ago', 
		contentSummary:'this is a long summary line. There are a plethora of geo-location-based apps that make it incredibly convenient to do friendly things, like chat with nearby peers about local hotspots or meet up with a coworker on the fly. A new iOS app called Cloak, however, utilizes services from Foursquare and Instagram for a more anti-social purpose. The brainchild of Brian Moore and former Buzzfeed director creative director Chris Baker, Cloak identifies the location of friends (read: those youd rather not bump into) based upon their latest check-in. While perusing the map, you can choose to "flag" certain undesirables, like exes or annoying third-wheels, to be notified when they wander within a preset distance of your personal bubble. Or you could, ya know, skip town altogether just to be safe.', 
		questionVotes: 5, 
		totalAnswers: 7}]
	};	
	dummyData.responseText = JSON.stringify(json);
	
	Ti.API.info('DUMMYDATA' + dummyData);
	success(dummyData);
