
/*
var activitystreamWin = Alloy.createController('activitystream').getView();
var activitystreamTab = Titanium.UI.createTab({
    window:activitystreamWin,
    title:'Activity Stream',
    icon:'messaging_32x32.png'
});
$.tabGroup.addTab(activitystreamTab);
*/

var answersWin = Alloy.createController('answers').getView();
var answersTab = Titanium.UI.createTab({
    window:answersWin,
    title:'Answers',
    icon:'icon-answers-32px.pngk'
});
$.tabGroup.addTab(answersTab);

/*
var ideasWin = Alloy.createController('ideas').getView();
var ideasTab = Titanium.UI.createTab({
    window:ideasWin,
    title:'Ideas',
    icon:'icon-ideas-32px.png'
});
$.tabGroup.addTab(ideasTab);


var discussionsWin = Alloy.createController('discussions').getView();
var discussionsTab = Titanium.UI.createTab({
    window:discussionsWin,
    title:'Discussions',
    icon:'icon-discussions-32px.png'
});
$.tabGroup.addTab(discussionsTab);
*/

var messagesWin = Alloy.createController('messages').getView();
var messagesTab = Titanium.UI.createTab({
    window:messagesWin,
    title:'Messages',
    icon:'messaging_32x32.png'
});
$.tabGroup.addTab(messagesTab);

/*
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

var damWin = Titanium.UI.createWindow({title: "Digital Assets"});
var damTab = Titanium.UI.createTab({
    window:damWin,
    title:'Documents',
    icon:'Files_32X32.png'
});
$.tabGroup.addTab(damTab);
*/

$.tabGroup.open();

