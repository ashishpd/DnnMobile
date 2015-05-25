var args = arguments[0] || {};

	var WebApiHelper = require('WebApiHelper');
	var MobiUtility = require('MobiUtility');

	var recordsLoaded = 0;
	var currentPage = 0;
	
	function doLoadMore(e){
	    reload();
	};
	
	function doRefresh(e){	
	    refresh();
	};
	
	function doNew(e){			
		if(!WebApiHelper.isLoggedIn()) {
			Alloy.createController("index").getView().open();
		} else {
			Alloy.createController('newquestion').getView().open();
		}	
	};	
		
	$.listView.addEventListener('itemclick', function(e){
		Ti.API.info(e.bindId);
		var item = e.section.getItemAt(e.itemIndex);
		//Ti.API.info(item);
		var arg = {
	        question: item.properties.question
		};
		Alloy.createController('answer', arg).getView().open();    
	});	
	
	if (Titanium.Platform.name == 'iPhone OS') {	
		var refreshControl = Ti.UI.createRefreshControl({
		    tintColor:'red' 
			});
			
		$.listView.refreshControl = refreshControl;		
	
		refreshControl.addEventListener('refreshstart',function(e){
		    Ti.API.info('refreshstart');
		    setTimeout(function(){
		        Ti.API.debug('Timeout');
		        refreshControl.endRefreshing();
		        refresh();
		    }, 1500);
		});
	}
			
    var success = function(e) {		
    		$.activityIndicator.hide();	
			Ti.API.info(e.responseText);
			var data = [];
			var response = JSON.parse(e.responseText); 
			$.totals.setText(response.TotalRecords + " questions");
			for (var i = 0; i < response.Results.length; i++) {
				var question = response.Results[i];		
				var title;
				var message;
				var answersCount;
				var background = question.answerId > 0 ? '#33FF00' : 'transparent';
				Ti.API.info('question.contentTitle  ' + question.contentTitle);
				//Ti.API.info('Alloy.isTablet ' + Alloy.isTablet);
				if(Alloy.isTablet == true) {
					author = question.authorDisplayName + ' ';
					title =  MobiUtility.trimWithEllipsis(question.contentTitle, 70);
					message = MobiUtility.trimWithEllipsis(question.authorDisplayName + ' - ' + question.contentSummary, 80);
					answersCount = question.totalAnswers + " answers"; 
				}
				else {
					title = question.contentTitle + ' - ' + question.contentSummary;
					title = MobiUtility.trimWithEllipsis(title, 65);
					answersCount = question.totalAnswers + " a  " + question.score + " v  " + MobiUtility.trimTime(question.lastActiveRelativeDate);
					//answersCount = question.totalAnswers + " ans, " + MobiUtility.trimTime(question.lastActiveRelativeDate);
				
				}
										
			    data.push({
			        title : { text: title },
			        message : { text: message },
			        when : { text: question.lastActiveRelativeDate },
			        votes :  { text: question.questionVotes },
			        answersCount :  { text: answersCount },
			        profilePic : { image: WebApiHelper.profilePic(question.createdUserId) },
			        properties : {
			            question: question,
			            accessoryType: Ti.UI.LIST_ACCESSORY_TYPE_NONE,
			            backgroundColor: background
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
		$.totals.setText('');
		 
		var section = $.listView.sections[0];	
		if(section.items.length > 0) {
			section.deleteItemsAt(0,section.items.length);
		}
		
	    reload();
	}	
	
	var dummyData = new Object();
	var json = {TotalRecords: 3, 
		Results: [
		{contentTitle: 'title', 
		score: 0,
		postId: 1,
		contentItemId: 436219,
		authorDisplayName: 'Ash Prasad',
		lastActiveRelativeDate: '1 minute ago', 
		contentSummary:'summary', 
		questionVotes: 999,
		views: 53,
		createdUserId: 1, 
		totalAnswers: 888},
		{contentTitle: 'title', 
		postId: 2,
		contentItemId: 437028,
		lastActiveRelativeDate: '1 minute ago', 
		contentSummary:'summary', 
		score: 1,
		createdUserId: 2,
		questionVotes: 22, 
		views: 78,
		answerId:5,
		authorDisplayName: 'John Doe First',
		totalAnswers: 33},
		{contentTitle: 'Playing video games well can get you into a top South Korean university', 
		lastActiveRelativeDate: '45 minutes ago', 
		contentSummary:'this is a long summary line. There are a plethora of geo-location-based apps that make it incredibly convenient to do friendly things, like chat with nearby peers about local hotspots or meet up with a coworker on the fly. A new iOS app called Cloak, however, utilizes services from Foursquare and Instagram for a more anti-social purpose. The brainchild of Brian Moore and former Buzzfeed director creative director Chris Baker, Cloak identifies the location of friends (read: those youd rather not bump into) based upon their latest check-in. While perusing the map, you can choose to "flag" certain undesirables, like exes or annoying third-wheels, to be notified when they wander within a preset distance of your personal bubble. Or you could, ya know, skip town altogether just to be safe.', 
		questionVotes: 5, 
		createdUserId: 3,
		contentItemId: 437178,
		postId: 4,
		score: 2,
		authorDisplayName: 'Batman Jr.',
		views: 153,
		totalAnswers: 8}]
	};	
	dummyData.responseText = JSON.stringify(json);
	
	//Ti.API.info('DUMMYDATA' + dummyData);

if(Alloy.Globals.testMode) {	
	success(dummyData);	
	Alloy.createController('answer', {question: json.Results[1]}).getView().open();  
} else {
	refresh();
}	
