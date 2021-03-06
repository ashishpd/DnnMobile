// this sets the background color of the master UIView (when there are no windows/tab groups on it)
Titanium.UI.setBackgroundColor('#000');

// create tab group
var tabGroup = Titanium.UI.createTabGroup();


//
// create base UI tab and root window
//
var win1 = Titanium.UI.createWindow({  
    title:'Tab 1',
    backgroundColor:'#fff'
});
var tab1 = Titanium.UI.createTab({  
    icon:'KS_nav_views.png',
    title:'Tab 1',
    window:win1
});

var label1 = Titanium.UI.createLabel({
	color:'#999',
	text:'I am Window 1',
	font:{fontSize:20,fontFamily:'Helvetica Neue'},
	textAlign:'center',
	width:'auto'
});

var textArea = Ti.UI.createTextArea({
  borderWidth: 2,
  borderColor: '#bbb',
  borderRadius: 5,
  color: '#888',
  font: {fontSize:20, fontWeight:'bold'},
  keyboardType: Ti.UI.KEYBOARD_NUMBER_PAD,
  returnKeyType: Ti.UI.RETURNKEY_GO,
  textAlign: 'left',
  value: 'I am a textarea',
  top: 5,
  width: 300, height : 500
});

win1.add(label1);
win1.add(textArea);

var xhr = Ti.Network.createHTTPClient({
    onload: function(e) {
		// function called in readyState DONE (4)
		Ti.API.info('onload called, HTTP status = '+this.status);
		label1.text = this.responseText;
		//label1.text = this.getResponseHeader("Content-Type");
		//label1.text = this.getResponseHeader("Set-Cookie");
		var img = Ti.UI.createImageView({
			image:this.responseData
		});
		win1.add(img);
    },
    onerror: function(e) {
		Ti.API.info('error, HTTP status = '+this.status);
		alert(e.error + this.status + this.getAllResponseHeaders());
    },
    timeout:5000  /* in milliseconds */
});
xhr.open("POST", 'http://www.dnnsoftware.com/DesktopModules/DNNCorp/Answers/API/List/Query');
xhr.setRequestHeader("TabId","145");
xhr.setRequestHeader("ModuleId","601");
xhr.setRequestHeader("Accept","application/json, text/javascript, */*; q=0.01");
xhr.setRequestHeader("Accept-Encoding", "gzip,deflate,sdch");
xhr.setRequestHeader("Accept-Language", "en-US,en;q=0.8");
xhr.setRequestHeader("Content-Length","116");
xhr.setRequestHeader("Content-Type","application/json; charset=UTF-8");
xhr.setRequestHeader("Cache-Control","no-cache");
var parms = {"category":"answered","pageIndex":0,"pageSize":25,"sortColumn":"lastactive","sortAscending":false,"tags":[],"sequence":2};
label1.text = 'Params'+JSON.stringify(parms);
xhr.send(JSON.stringify(parms));  // request is actually sent with this statement


//
// create controls tab and root window
//
var win2 = Titanium.UI.createWindow({  
    title:'Tab 2',
    backgroundColor:'#fff'
});
var tab2 = Titanium.UI.createTab({  
    icon:'KS_nav_ui.png',
    title:'Tab 2',
    window:win2
});

var label2 = Titanium.UI.createLabel({
	color:'#999',
	text:'I am Window 2',
	font:{fontSize:20,fontFamily:'Helvetica Neue'},
	textAlign:'center',
	width:'auto'
});

win2.add(label2);


var xhr2 = Ti.Network.createHTTPClient({
    onload: function(e) {
		// function called in readyState DONE (4)
		Ti.API.info('onload called, HTTP status = '+this.status);
		//label1.text = this.responseText;
		//label1.text = this.getResponseHeader("Content-Type");
		label2.text = this.statusText + this.getResponseHeader("Set-Cookie");
		var img = Ti.UI.createImageView({
			image:this.responseData
		});
		//win1.add(img);
    },
    onerror: function(e) {
		Ti.API.info('error, HTTP status = '+this.status);
		alert(e.error + this.status + this.getAllResponseHeaders());
    },
    timeout:30000  /* in milliseconds */
});
xhr2.open("GET", 'http://www.dnnsoftware.com/answers');
xhr2.autoRedirect="false";
//xhr2.send();  // request is actually sent with this statement


var xhrPost = Ti.Network.createHTTPClient({
    onload: function(e) {
		// function called in readyState DONE (4)
		textArea.value = this.responseText;
		
    },
    onerror: function(e) {
		Ti.API.info('error, HTTP status = '+this.status);
		alert(e.error + this.status + this.getAllResponseHeaders());
    },
    timeout:30000  /* in milliseconds */
});


var xhr3 = Ti.Network.createHTTPClient({
    onload: function(e) {
		// function called in readyState DONE (4)
		Ti.API.info('onload called, HTTP status = '+this.status);
		var search = 'id=\"__VIEWSTATE" value=\"';
  		var pos1 = this.responseText.indexOf(search);
  		var pos2 = this.responseText.indexOf('"', pos1 + search.length);
  		var viewstate = this.responseText.substr(pos1 + search.length, pos2 - pos1 - search.length);
  		
		search = "id=\"__EVENTVALIDATION\" value=\"";
  		pos1 = this.responseText.indexOf(search);
  		pos2 = this.responseText.indexOf('"', pos1 + search.length);
  		var eventValidation = this.responseText.substr(pos1 + search.length, pos2 - pos1 - search.length);

		var username = "ash.prasad";
		var password = "Mypassword3";
  		var usernameField = this.responseText.match("name=\"(.+?\\$txtUsername)\"")[1];
  		var passwordField = this.responseText.match("name=\"(.+?\\$txtPassword)\"")[1];
  		var webFormField  = this.responseText.match("WebForm_PostBackOptions\\(&quot;(.+?\\$cmdLogin)&quot;")[1];
		
		//viewState = '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';
		
		xhrPost.open("POST", 'http://www.ashprasad.com/?ctl=login');
		xhrPost.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
		//var parm = "ScriptManager=%7Cdnn%24ctr%24Login%24Login_DNN%24cmdLogin&__EVENTTARGET=dnn%24ctr%24Login%24Login_DNN%24cmdLogin&__EVENTARGUMENT=&__VIEWSTATE=dZrQGQwsjZLaB6gmGqEAMtP%2bZB%2b3h4gXSD9oIM0xk5tuU9JOcUvCm45yiDkWNXIDGPbSLrBX2egZc66nJK4p8b2aqfU0ZAzljPY2MtmSMEvxDiXgLFaWeCijkbaScdiGQ4eAsuaQDSzFQ%2fAIVTZQ9S5QWk1qopL9E3FEGFSlGftmqK1Jq6ad9uZ22a9W88Pi3rvgtqvhJ1Gp%2fdmAoJzuxtKMNCEGxFOxGBBaU%2bEnU7HA0lmk2yG3GgkwtW5UKfZUZOZYHsFjHgqJOWutCRKbKVK3O0P0N179Hnz1OvxTaTmPrQQKx%2bojh9yivL65T0TYPo%2fZL3JEyaABMaAqh07leL8Z4dvsinlUKbTZtFdkk7m%2b2SZramAv4p3aHlZDrgT7Ka2YVEQvKQ2yLpETl7sw%2flUv95nB1dB79yVxCEFisQ7Ve2YRS%2bTQ8v16V1Qr%2bs03I%2bQgTmn0%2bvV7M7qbiSxDz1O2qBvItIKmXemNJInq8IMH1UgElWu9eAQsMKTgSckLVBnN77sjRQmTFWJY0qpNl1%2bCnExgm2Pt7oaY69Neg%2f32nqgvM54DVNS%2b4Je5QHAllZy27G7MT8LuUUCxWIGPvhJ%2fqKE5iwjUW9aicm5abg5u3IU5nMwAHAL6KbZZfjQC24mWhuf2ib0pcrWfb%2f7pqrp2G4CttOj5XVRzysjURgiOBkv%2fZSxCNtUdxSzRbq3C8BXbIHFbJIC55Es7e5%2f6SDcmdDIxM5%2fmmp3QjLOF70TX8jCOF2%2bR4HkBWS8wFLHrOTtw2vebXvoK%2fiTTmgtaelLDKyWNmMIcHaaotDiPh4yL6ZE2drrgGtaKTa09Jel7r45AQv9Qj8rXFfMX8MCenqSoXLmFFVY8ELLxg3YDp1t7ruGhFK5hVHcby54BjrikBGzrPJWaR9H5O4orhM%2bSXlqOEapTV2d6jw6jKsXCQhsj8dVuoP8B%2f9j71DS6Xf0cVfbRQTbjn23XnBZ2%2f4lWOvCmY8l2TVZ85HjNUyAGdyHDXQPY9%2b%2fIrrjf0%2fIwmrTjzrY9HKtBJZLeOt69hZDWbpgeRtVRJ%2bJdgCMoU5Ss5zyZGejK8Na9GOpe2O5aAIPq5CLFnQJQZRExfhnIJqBj%2b21VKcTiyJTkOaFSuPtvI9fhqtySz1MwnZ31Mlgd7faBjPIYzvGTJQObIeZ32Y0pa9dhFmT8nyjk10%2bFdFM66gQf4h0%2f6iOmZy1VBbahY3uiSxpFyGPjmS6oBmNVgFJ%2bTKYGeXyELsHob7Dmd0B92UMC%2fFTQdwQ02mqK8mbX3QPrPTC42CIvGhq%2fNuwPEai7w8Oo2JtwQavMSCpWaSgXr%2b9B%2bV2T0xzfavEbaNMh9o39xYLVy8U2M4W2tGXruhtOxl0eG0jhRXvmJpzq7rpAq0Rwnwp%2fLLWUajGUbEd0VaetRg5vvUsqU1XWTPw6%2fb%2fSyoRQ8V2p1EC1PhzJ8P9i8vkGxjV%2b49vRc9h3kxmve9LbbaKSt6dqKafdAidd5EsWKFHCOdBdPnv582nbc4rb%2bb8of25jevz3%2bAzbjno6RIlkYjyy0CV8amTVmCJUluQSVGLkrA8wSGlquJ3UU9P1kFo4ky8HfK3l%2foYjq85JUhjZFpLl1c6IQZKH4wbPUHeZ2J4r%2f%2bxdCfmkaNbPy2DACV%2bmVKv7o0E5sYruJ9Q0pK71OBkfexkUKTCSVr5Tas51bUK0eQJ45Qhp5l%2f1vMJDfS%2f41BwZm%2fOr%2bapY3T%2f3YvlnL%2fA3qRVhWPHyGKhEB0ljeLMkjJKsg91JTkfCVnPQIGgibz13%2bvqjvOizisaboX088zXQB89VHIR0uJpJLdrYEYfqMmlV5iifsnxQG9xlwUm5OwBS%2bRJWvNE8YvtChyLJJBVVvtyEXFmuj6J28%2fKt9vDJHOopgmh5bX17CzEv%2f2XU9oLFmzmb4jS9wUnUrSThWKbABrvDywQ3%2foIEc%2f5hSih8p6qqhEihASFZal4NEpxEy5d1zKjwZFoGqnJTzM%2bnWK6K9ZrWKBtGDgfsSoi0CIJXxhOd%2boxdME9U6SU4B7NlIucjwSsn27k9qoZUf9mb6F0lUQEWouBw37dptNvnXKbrDUgyynfz%2bX%2ftpf5kZKNpzy1RaJQ8JuIDm%2fygxJJ8sIdgWILkMYnEOF84Jey7HszRTzWiJyJMCRg5t756xqtnJxKCp015sjMEmiRnHvq6UGpkFZ64Iui7GWn4xYe3dNcVFRMJpmOCgrSQHvmavIc0gH%2fkydKAcdNi9Ey9P9TbjvJ7rNp%2f3c7yNAA1d4oMPtFDfvWjI8httpQY0ZUC8tHEhQV24cpGbGoOZh0aTvJWwUsfjjY%2bIuEzJBhK4Fz1K8x%2bpWu3hT1tkonHVhypXy7yHTXMv1wPN2QGOOQp5CPo3LVNZkXpJwiznN5esMkO8fIhZSfvIAeEj6KKA%2fzwkVoPHdOyo1URWO7k%2fg6WZXgUcmW53Q4tpQnC7G6eR%2bWl%2bmGENyM4okTWGfXTSRozn3e%2bNoB9Ult%2fEFBpj%2fbiCinvAZVaGgvZAToc1J73bBJ0FrAcOq3uLexwkDhjA80EUH5kCd0KorhcBx1NCYd0d4V%2f4z%2bYyFnyrWWd7t5T3vUMm63ZkyHs%2b8h6xfbXFenQzRJqpBqFHNOQUkYNnGmjQFloGQfPznNHXH3sZENA6QZQNiWqQvF%2bSdKi%2bf2AFqdtMh%2b5JXGJi2OVPKWJAh9BYgj3Em0VwVx9ospZUM%2f4RkkSqXPPikiysellgo9g83fqe6SV3RGS%2b0LDt2GH5bfj34VWRSqfOTe754tYUNc3qS8D1UGLEwFJIqInMeszrjCDqC4nl7X6qqSgpsmV9n0AcdeBWoIz77sQMoR14t2dzrXehmkqu50%2fIw5mAZYbLvw%2btvc7y4ZsOhEIytWMP%2fKpVRaNEfRNFuCaK9rdWulkgSdIKagTRNPxLndq5fFVwGseIrpflr1WNHgyVnu2MD%2fg%2fNVzMwm6Kt40lWiXhILsF6Rs12dysFIj%2fpn1MEs7%2fvs6l5C4mFeZJFkjXkuDaIyzpF2uusVw8dTseSyf%2fqfPV60aWJFgoH2Dv15WglEiCJ8gNgzDDnS2I%2fiZvNFCt%2fhwX5quMnT4bg7x%2fFUNKbacfLOzLysZjnklfxzUD%2fxa0A%3d%3d&__VIEWSTATEENCRYPTED=&__EVENTVALIDATION=lWHqZVwYBfTXE3I1WaHq%2fs2Sjnq1CvW8JGAGikbOfEuARTjj%2fNCoPHGfrxUHISdoqEnsE2HYDgMZy5yZ0uc6G2DE9ciIdXvsclcMaGFQVKnntxUhhl5ot4IGkI3ely0P2HPWQinZWiDa4ep4BCA3SOd8SVC7MkYcMDaYWqNuxFGohBzSaUHhtei4%2bz6vYUtat83QLO9HNLz3so12um0j7XZE6AYupZ14MPtjiHWu5ux2bY9VhaRwMCSXMISH9w6DQOiGt6namLS8%2bM6D&dnn%24ctr%24Login%24Login_DNN%24txtUsername=ash.prasad&dnn%24ctr%24Login%24Login_DNN%24txtPassword=Mypassword3&__ASYNCPOST=true&RadAJAXControlID=";
		//xhrPost.setRequestHeader('Content-Length','3917');
		//var parm = "ScriptManager=%7Cdnn%24ctr%24Login%24Login_DNN%24cmdLogin&__EVENTTARGET=dnn%24ctr%24Login%24Login_DNN%24cmdLogin&__EVENTARGUMENT=&__VIEWSTATE=dZrQGQwsjZLaB6gmGqEAMtP%2bZB%2b3h4gXSD9oIM0xk5tuU9JOcUvCm45yiDkWNXIDGPbSLrBX2egZc66nJK4p8b2aqfU0ZAzljPY2MtmSMEvxDiXgLFaWeCijkbaScdiGQ4eAsuaQDSzFQ%2fAIVTZQ9S5QWk1qopL9E3FEGFSlGftmqK1Jq6ad9uZ22a9W88Pi3rvgtqvhJ1Gp%2fdmAoJzuxtKMNCEGxFOxGBBaU%2bEnU7HA0lmk2yG3GgkwtW5UKfZUZOZYHsFjHgqJOWutCRKbKVK3O0P0N179Hnz1OvxTaTmPrQQKx%2bojh9yivL65T0TYPo%2fZL3JEyaABMaAqh07leL8Z4dvsinlUKbTZtFdkk7m%2b2SZramAv4p3aHlZDrgT7Ka2YVEQvKQ2yLpETl7sw%2flUv95nB1dB79yVxCEFisQ7Ve2YRS%2bTQ8v16V1Qr%2bs03I%2bQgTmn0%2bvV7M7qbiSxDz1O2qBvItIKmXemNJInq8IMH1UgElWu9eAQsMKTgSckLVBnN77sjRQmTFWJY0qpNl1%2bCnExgm2Pt7oaY69Neg%2f32nqgvM54DVNS%2b4Je5QHAllZy27G7MT8LuUUCxWIGPvhJ%2fqKE5iwjUW9aicm5abg5u3IU5nMwAHAL6KbZZfjQC24mWhuf2ib0pcrWfb%2f7pqrp2G4CttOj5XVRzysjURgiOBkv%2fZSxCNtUdxSzRbq3C8BXbIHFbJIC55Es7e5%2f6SDcmdDIxM5%2fmmp3QjLOF70TX8jCOF2%2bR4HkBWS8wFLHrOTtw2vebXvoK%2fiTTmgtaelLDKyWNmMIcHaaotDiPh4yL6ZE2drrgGtaKTa09Jel7r45AQv9Qj8rXFfMX8MCenqSoXLmFFVY8ELLxg3YDp1t7ruGhFK5hVHcby54BjrikBGzrPJWaR9H5O4orhM%2bSXlqOEapTV2d6jw6jKsXCQhsj8dVuoP8B%2f9j71DS6Xf0cVfbRQTbjn23XnBZ2%2f4lWOvCmY8l2TVZ85HjNUyAGdyHDXQPY9%2b%2fIrrjf0%2fIwmrTjzrY9HKtBJZLeOt69hZDWbpgeRtVRJ%2bJdgCMoU5Ss5zyZGejK8Na9GOpe2O5aAIPq5CLFnQJQZRExfhnIJqBj%2b21VKcTiyJTkOaFSuPtvI9fhqtySz1MwnZ31Mlgd7faBjPIYzvGTJQObIeZ32Y0pa9dhFmT8nyjk10%2bFdFM66gQf4h0%2f6iOmZy1VBbahY3uiSxpFyGPjmS6oBmNVgFJ%2bTKYGeXyELsHob7Dmd0B92UMC%2fFTQdwQ02mqK8mbX3QPrPTC42CIvGhq%2fNuwPEai7w8Oo2JtwQavMSCpWaSgXr%2b9B%2bV2T0xzfavEbaNMh9o39xYLVy8U2M4W2tGXruhtOxl0eG0jhRXvmJpzq7rpAq0Rwnwp%2fLLWUajGUbEd0VaetRg5vvUsqU1XWTPw6%2fb%2fSyoRQ8V2p1EC1PhzJ8P9i8vkGxjV%2b49vRc9h3kxmve9LbbaKSt6dqKafdAidd5EsWKFHCOdBdPnv582nbc4rb%2bb8of25jevz3%2bAzbjno6RIlkYjyy0CV8amTVmCJUluQSVGLkrA8wSGlquJ3UU9P1kFo4ky8HfK3l%2foYjq85JUhjZFpLl1c6IQZKH4wbPUHeZ2J4r%2f%2bxdCfmkaNbPy2DACV%2bmVKv7o0E5sYruJ9Q0pK71OBkfexkUKTCSVr5Tas51bUK0eQJ45Qhp5l%2f1vMJDfS%2f41BwZm%2fOr%2bapY3T%2f3YvlnL%2fA3qRVhWPHyGKhEB0ljeLMkjJKsg91JTkfCVnPQIGgibz13%2bvqjvOizisaboX088zXQB89VHIR0uJpJLdrYEYfqMmlV5iifsnxQG9xlwUm5OwBS%2bRJWvNE8YvtChyLJJBVVvtyEXFmuj6J28%2fKt9vDJHOopgmh5bX17CzEv%2f2XU9oLFmzmb4jS9wUnUrSThWKbABrvDywQ3%2foIEc%2f5hSih8p6qqhEihASFZal4NEpxEy5d1zKjwZFoGqnJTzM%2bnWK6K9ZrWKBtGDgfsSoi0CIJXxhOd%2boxdME9U6SU4B7NlIucjwSsn27k9qoZUf9mb6F0lUQEWouBw37dptNvnXKbrDUgyynfz%2bX%2ftpf5kZKNpzy1RaJQ8JuIDm%2fygxJJ8sIdgWILkMYnEOF84Jey7HszRTzWiJyJMCRg5t756xqtnJxKCp015sjMEmiRnHvq6UGpkFZ64Iui7GWn4xYe3dNcVFRMJpmOCgrSQHvmavIc0gH%2fkydKAcdNi9Ey9P9TbjvJ7rNp%2f3c7yNAA1d4oMPtFDfvWjI8httpQY0ZUC8tHEhQV24cpGbGoOZh0aTvJWwUsfjjY%2bIuEzJBhK4Fz1K8x%2bpWu3hT1tkonHVhypXy7yHTXMv1wPN2QGOOQp5CPo3LVNZkXpJwiznN5esMkO8fIhZSfvIAeEj6KKA%2fzwkVoPHdOyo1URWO7k%2fg6WZXgUcmW53Q4tpQnC7G6eR%2bWl%2bmGENyM4okTWGfXTSRozn3e%2bNoB9Ult%2fEFBpj%2fbiCinvAZVaGgvZAToc1J73bBJ0FrAcOq3uLexwkDhjA80EUH5kCd0KorhcBx1NCYd0d4V%2f4z%2bYyFnyrWWd7t5T3vUMm63ZkyHs%2b8h6xfbXFenQzRJqpBqFHNOQUkYNnGmjQFloGQfPznNHXH3sZENA6QZQNiWqQvF%2bSdKi%2bf2AFqdtMh%2b5JXGJi2OVPKWJAh9BYgj3Em0VwVx9ospZUM%2f4RkkSqXPPikiysellgo9g83fqe6SV3RGS%2b0LDt2GH5bfj34VWRSqfOTe754tYUNc3qS8D1UGLEwFJIqInMeszrjCDqC4nl7X6qqSgpsmV9n0AcdeBWoIz77sQMoR14t2dzrXehmkqu50%2fIw5mAZYbLvw%2btvc7y4ZsOhEIytWMP%2fKpVRaNEfRNFuCaK9rdWulkgSdIKagTRNPxLndq5fFVwGseIrpflr1WNHgyVnu2MD%2fg%2fNVzMwm6Kt40lWiXhILsF6Rs12dysFIj%2fpn1MEs7%2fvs6l5C4mFeZJFkjXkuDaIyzpF2uusVw8dTseSyf%2fqfPV60aWJFgoH2Dv15WglEiCJ8gNgzDDnS2I%2fiZvNFCt%2fhwX5quMnT4bg7x%2fFUNKbacfLOzLysZjnklfxzUD%2fxa0A%3d%3d&__VIEWSTATEENCRYPTED=&__EVENTVALIDATION=lWHqZVwYBfTXE3I1WaHq%2fs2Sjnq1CvW8JGAGikbOfEuARTjj%2fNCoPHGfrxUHISdoqEnsE2HYDgMZy5yZ0uc6G2DE9ciIdXvsclcMaGFQVKnntxUhhl5ot4IGkI3ely0P2HPWQinZWiDa4ep4BCA3SOd8SVC7MkYcMDaYWqNuxFGohBzSaUHhtei4%2bz6vYUtat83QLO9HNLz3so12um0j7XZE6AYupZ14MPtjiHWu5ux2bY9VhaRwMCSXMISH9w6DQOiGt6namLS8%2bM6D&dnn%24ctr%24Login%24Login_DNN%24txtUsername=ash.prasad&dnn%24ctr%24Login%24Login_DNN%24txtPassword=Mypassword3&__ASYNCPOST=true&RadAJAXControlID=";
		
		var parm = "__EVENTTARGET="+Ti.Network.encodeURIComponent(webFormField)+"&__EVENTARGUMENT=&__VIEWSTATE="+Ti.Network.encodeURIComponent(viewstate)+"&__VIEWSTATEENCRYPTED=&__EVENTVALIDATION="+Ti.Network.encodeURIComponent(eventValidation)+"&"+Ti.Network.encodeURIComponent(usernameField)+"="+Ti.Network.encodeURIComponent(username)+"&"+Ti.Network.encodeURIComponent(passwordField)+"="+Ti.Network.encodeURIComponent(password)+"&__ASYNCPOST=true&RadAJAXControlID=";
		
		//var parm = "__EVENTTARGET=" + webFormField + "&__VIEWSTATE="+viewState+"&__VIEWSTATEENCRYPTED=&__EVENTVALIDATION="+eventValidation+"&"+userNameField+"="+"ash.prasad"+"&"+passwordField+"="+"Mypassword3";
		
		//xhrPost.setRequestHeader('Content-Type','multipart/form-data; boundary=----WebKitFormBoundaryPeF4unBPb6C21kWe');
		//var parm = '------WebKitFormBoundaryPeF4unBPb6C21kWe\r\nContent-Disposition: form-data; name="__EVENTTARGET"\r\n\r\ndnn$ctr$Login$Login_DNN$cmdLogin\r\n------WebKitFormBoundaryPeF4unBPb6C21kWe\r\nContent-Disposition: form-data; name="__VIEWSTATE"\r\n\r\n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\r\n------WebKitFormBoundaryPeF4unBPb6C21kWe\r\nContent-Disposition: form-data; name="__VIEWSTATEENCRYPTED"\r\n\r\n\r\n------WebKitFormBoundaryPeF4unBPb6C21kWe\r\nContent-Disposition: form-data; name="__EVENTVALIDATION"\r\n\r\nT3umqoE/27d71PHz8GTwkdDZ5Br0QDULAdse4/DjwQXgqzR8KijbiT2I4a4b/zVGJpFB/u/sHmuRnE2qwm30f+KpCPU3VnASUKe4hpCAHj8DF7WJrbXkK/ebdUIDuic9tQpuaWoS1Zf7Z5vyuIujTJqlbm7w2AtblRHCyED2ocGlJmQSNKwOkliFbDC0INbFWU8fa6uxZ/CUxCP2Kel7Qu1uPgviPn5QqHVzdVwW5IP2SEy1I4eIgLEIydAHFnajsSlVC9ps3OSLaZxE\r\n------WebKitFormBoundaryPeF4unBPb6C21kWe\r\nContent-Disposition: form-data; name="dnn$ctr$Login$Login_DNN$txtUsername"\r\n\r\nash.prasad\r\n------WebKitFormBoundaryPeF4unBPb6C21kWe\r\nContent-Disposition: form-data; name="dnn$ctr$Login$Login_DNN$txtPassword"\r\n\r\nMypassword3\r\n------WebKitFormBoundaryPeF4unBPb6C21kWe--\r\n';
		
		
		textArea.value = parm;
		xhrPost.send(parm);
				
    },
    onerror: function(e) {
		Ti.API.info('error, HTTP status = '+this.status);
		alert(e.error + this.status + this.getAllResponseHeaders());
    },
    timeout:30000  /* in milliseconds */
});
xhr3.open("GET", 'http://www.ashprasad.com/?ctl=login');
//xhr3.autoRedirect="false";
xhr3.send();  // request is actually sent with this statement

//
//  add tabs
//
tabGroup.addTab(tab1);  
tabGroup.addTab(tab2);  

// open tab group
tabGroup.open();
