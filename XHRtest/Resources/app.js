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

win1.add(label1);

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
//xhr.send(JSON.stringify(parms));  // request is actually sent with this statement


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



var xhr3 = Ti.Network.createHTTPClient({
    onload: function(e) {
		// function called in readyState DONE (4)
		Ti.API.info('onload called, HTTP status = '+this.status);
		var search = 'id=\"__VIEWSTATE" value=\"';
  		var pos1 = this.responseText.indexOf(search);
  		var pos2 = this.responseText.indexOf('"', pos1 + search.length);
  		var viewState = this.responseText.substr(pos1, pos2-pos1);
  		label1.text = viewState;
		
		//label1.text = this.responseText;
		//label1.text = this.getResponseHeader("Content-Type");
		//label2.text = this.statusText + this.getResponseHeader("Set-Cookie");
		
		
		
		
		
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
