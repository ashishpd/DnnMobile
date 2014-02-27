$.tabGroup.open();


var answersWin = Alloy.createController('answers').getView();
var answersTab = Titanium.UI.createTab({
    window:answersWin,
    title:'Answers',
    icon:'messaging_32x32.png'
});
$.tabGroup.addTab(answersTab);


var discussionsWin = Alloy.createController('discussions').getView();
var discussionsTab = Titanium.UI.createTab({
    window:discussionsWin,
    title:'Discussions',
    icon:'messaging_32x32.png'
});
$.tabGroup.addTab(discussionsTab);


var messagesWin = Alloy.createController('messages').getView();
var messagesTab = Titanium.UI.createTab({
    window:messagesWin,
    title:'Messages',
    icon:'messaging_32x32.png'
});
$.tabGroup.addTab(messagesTab);


var membersWin = Titanium.UI.createWindow({title: "Members"});
var membersTab = Titanium.UI.createTab({
    window:membersWin,
    title:'Members',
    icon:'member_list_32X32.png'
});
$.tabGroup.addTab(membersTab);

var searchWin = Titanium.UI.createWindow({title: "Search"});
var searchTab = Titanium.UI.createTab({
    window:searchWin,
    title:'Search',
    icon:'Search_32X32.png'
});
$.tabGroup.addTab(searchTab);

var searchWin = Titanium.UI.createWindow({title: "Digital Assets"});
var searchTab = Titanium.UI.createTab({
    window:searchWin,
    title:'Documents',
    icon:'Files_32X32.png'
});
$.tabGroup.addTab(searchTab);

