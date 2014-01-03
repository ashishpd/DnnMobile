function Controller() {
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "index";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    $.__views.winLogin = Ti.UI.createWindow({
        backgroundColor: "white",
        top: "30%",
        layout: "vertical",
        barColor: "#a00",
        id: "winLogin"
    });
    $.__views.winLogin && $.addTopLevelView($.__views.winLogin);
    $.__views.__alloyId0 = Ti.UI.createLabel({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        color: "#000",
        top: "25dp",
        left: "10%",
        text: "Site",
        id: "__alloyId0"
    });
    $.__views.winLogin.add($.__views.__alloyId0);
    $.__views.txtSiteName = Ti.UI.createTextField({
        width: "90%",
        top: "5%",
        borderStyle: Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
        returnKeyType: Ti.UI.RETURNKEY_DONE,
        id: "txtSiteName"
    });
    $.__views.winLogin.add($.__views.txtSiteName);
    $.__views.txtUserName = Ti.UI.createTextField({
        width: "90%",
        top: "5%",
        borderStyle: Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
        returnKeyType: Ti.UI.RETURNKEY_DONE,
        id: "txtUserName",
        hintText: "username"
    });
    $.__views.winLogin.add($.__views.txtUserName);
    $.__views.txtPassword = Ti.UI.createTextField({
        width: "90%",
        top: "5%",
        borderStyle: Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
        returnKeyType: Ti.UI.RETURNKEY_DONE,
        id: "txtPassword",
        hintText: "password",
        passwordMask: "true"
    });
    $.__views.winLogin.add($.__views.txtPassword);
    exports.destroy = function() {};
    _.extend($, $.__views);
    $.winLogin.open();
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;