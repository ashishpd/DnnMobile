exports.definition = {
	config: {
		columns: {
			"site_id": "INTEGER PRIMARY KEY AUTOINCREMENT",
		    "url": "TEXT",
		    "user": "TEXT",
		    "isnew": "INTEGER"
		},
		adapter: {
			type: "sql",
			collection_name: "sites",
			"idAttribute": "url"
		}
	},
	extendModel: function(Model) {
		_.extend(Model.prototype, {
			// extended functions and properties go here
			getclass: function () {
				Ti.API.info('I am being called');
				return "myclass";
			}	
			
		});

		return Model;
	},
	extendCollection: function(Collection) {
		_.extend(Collection.prototype, {
			// extended functions and properties go here
		});

		return Collection;
	}
};