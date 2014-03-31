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
	
	Ti.API.info('question.contentTitle ' + question.contentTitle);
	$.title.setText(question.contentTitle);
	$.author.setText(question.authorDisplayName);
	$.when.setText(question.lastActiveRelativeDate);
	$.summary.setText(question.contentSummary);
	$.profilePic.setImage(WebApiHelper.profilePic(question.createdUserId));
