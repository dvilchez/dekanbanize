var rest=require('restler');

var kanbanize = module.exports = function(api_key){
	return {
		'getBoardStructure':function(board_id,callback){
			rest.postJson(
				'http://kanbanize.com/index.php/api/kanbanize/get_board_structure/format/json'
				,{'boardid':board_id}
				,{headers:{'apikey':api_key}})
			.on('complete',function(data){callback(data)});
		},
	};
};