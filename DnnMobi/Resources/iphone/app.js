var Alloy = require("alloy"), _ = Alloy._, Backbone = Alloy.Backbone;

Alloy.Globals.pageSize = Alloy.isTablet ? 20 : 10;

Alloy.createController("index");