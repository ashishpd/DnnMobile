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
	$.body.setHtml(question.contentSummary);
	$.profilePic.setImage(WebApiHelper.profilePic(question.createdUserId));
	$.score.setText(question.score + " votes");
	$.answerCount.setText(question.totalAnswers + " answers");

	var successGetAnswers = function(e) {		
		$.activityIndicator.hide();	
		//Ti.API.info(e.responseText);
		var response = JSON.parse(e.responseText); 
		for (var i = 0; i < response.Posts.length; i++) {
			var answer = response.Posts[i];
			Ti.API.info(answer.postId + ' ' + answer.body);
			var webView = Ti.UI.createWebView({ 
				width: Ti.UI.FILL, 
				height: '100dp', 
				borderWidth: 2,
				scalesPageToFit:true, 
				autoDetect:[Ti.UI.AUTODETECT_NONE] 
			});
			webView.setHtml(answer.body);
			$.answersRow.add(webView);
		}
	};

	var successGetPost = function(e) {		
		$.activityIndicator.hide();	
		//Ti.API.info(e.responseText);
		var response = JSON.parse(e.responseText); 
		var post = response.Post;
		$.body.setHtml(post.body.trim());
		var url = '/DesktopModules/DNNCorp/Answers/API/Detail/GetAnswers?postId=' + question.postId + '&pageIndex=0&pageSize=5&sortColumn=score&sortAscending=false';
		WebApiHelper.Get('Answers',url, successGetAnswers, failure);
	};
	
	var failure = function(e) {
		$.txtError.text="Error - " + WebApiHelper.error();
		$.activityIndicator.hide();
	};
	
	function reload() {		
		$.activityIndicator.show();
		
		var url = '/DesktopModules/DNNCorp/Answers/API/Detail/GetPost?contentItemId=' + question.contentItemId;
		WebApiHelper.Get('Answers',url, successGetPost, failure);
	}
	
	function doVoteQ(e){
		var success = function(e) {
			$.activityIndicator.hide();
			Ti.API.info(e.responseText);
			var response = JSON.parse(e.responseText); 
			$.score.setText(response.score + " votes");		
		};

		var failure = function(e) {
			Titanium.API.info("failure called after logoff");
			$.txtError.text="Error - " + WebApiHelper.error();
			$.activityIndicator.hide();
		};
		
		$.activityIndicator.show();
		var url = '/DesktopModules/DNNCorp/Answers/API/Detail/Upvote';
		var data = {postId: question.postId, 
			parentId: 0,
			groupId: -1};
			
	//Ti.API.info("post json: " + JSON.stringify(data));
	$.activityIndicator.show();
	WebApiHelper.PostAsJson('Answers', url, data, success, failure);    
};

reload();