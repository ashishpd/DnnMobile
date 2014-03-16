var Alloy = require("alloy"), _ = Alloy._, Backbone = Alloy.Backbone;

Alloy.Globals.pageSize = Alloy.isTablet ? 20 : 5;

Alloy.createController("index");