	var args = arguments[0] || {};
	var question = args.question;

	var WebApiHelper = require('WebApiHelper');
	
	function doBack(e) {
    	closeMe();
	};
	
	$.winAnswer.addEventListener('android:back', function (e) {
	  closeMe();  
	});	
	
	function closeMe() {
		$.winAnswer.close();
	};
	
	Ti.API.info('question.contentTitle  ' + question.contentTitle);
	$.title.setText(question.contentTitle);
	$.author.setText(question.authorDisplayName);
	$.when.setText(question.lastActiveRelativeDate);
	$.summary.setText(question.contentSummary);
	$.profilePic.setImage(WebApiHelper.profilePic(question.createdUserId));

	var success = function(e) {		
		$.activityIndicator.hide();	
		Ti.API.info(e.responseText);
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