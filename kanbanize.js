var rest=require('restler');
var kanbanize = {};

kanbanize.getBoardStructure = function(board_id,callback){
	rest.postJson(this.uri_board_structure
		,{'boardid':board_id}
		,{headers:{'apikey':this.api_key}}).on('complete',function(data){callback(data)});
};

module.exports = function(api_key){
	kanbanize.domain = 'http://kanbanize.com';
	kanbanize.uri_board_structure=kanbanize.domain+'/index.php/api/kanbanize/get_board_structure/format/json';
	kanbanize.api_key=api_key;
	return kanbanize;
};