
exports.trimWithEllipsis = function(data, max){
	if (data.length > (max - 3)) {
		return data.substring(0, max - 3) + '...';
	}
	
	return data;
};

exports.trimTime = function(data){
	return data.replace("minute", "min").replace("year", "yr").replace("months", "mth").replace("week","wk").replace("ago","");
};