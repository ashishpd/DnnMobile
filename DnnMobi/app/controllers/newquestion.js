	var args = arguments[0] || {};

	var WebApiHelper = require('WebApiHelper');
	
	function doBack(e) {
    	$.winNewQuestion.close();
	};
	
	var onContentChanged = function(e) {
		$.btnAsk.enabled = ($.txtTitle.value != '') && ($.txtQuestion.value != '') && ($.txtTags.value != '');
	};
	
	var success = function(e) {	
		$.activityIndicator.hide();
		var response = JSON.parse(e.responseText); 
		if(response.approved  == true) {
			$.winNewQuestion.close();
		} else {	
			$.txtError.text = 'Your question has been submitted and is awaiting moderation';
		}
		
	};
	
    var failure = function(e) {
		$.activityIndicator.hide();
    	$.txtError.text="Error - " + WebApiHelper.error();
	};
    
	function doAsk(e){	
		var url = '/DesktopModules/DNNCorp/Answers/API/Edit/Ask';
		var data = {postId: -1, 
					approved: true,
					content: $.txtQuestion.value,
					contentTitle: $.txtTitle.value,
					subscribeToActivity: $.switchSubscribe.value,
					sortAscending: false,
					groupId: -1,
					tags: [$.txtTags.value]};
		$.activityIndicator.show();
		WebApiHelper.PostAsJson('Answers', url, data, success, failure);
	};
	
