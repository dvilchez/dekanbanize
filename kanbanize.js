var rest=require('restler');
var kanbanize = {};

kanbanize.getProjectsAndBoards = function(callback){
	rest.post(this.uriProjectAndBoards
		,{headers:{'apikey':this.apiKey}}).on('complete', function(data){callback(JSON.parse(data));})
};

kanbanize.getBoardStructure = function(idBoard,callback){
	rest.postJson(this.uriBoardStructure
		,{'boardid':idBoard}
		,{headers:{'apikey':this.apiKey}}).on('complete',function(data){callback(JSON.parse(data));});
};

kanbanize.getBoardSettings = function  (idBoard, callback) {
	rest.postJson(this.uriBoardSettings
		,{'boardid':idBoard}
		,{headers:{'apikey':this.apiKey}}).on('complete',function(data){callback(JSON.parse(data));});
};

module.exports = function(apiKey){
	kanbanize.domain = 'http://kanbanize.com';
	kanbanize.uriProjectAndBoards=kanbanize.domain+'/index.php/api/kanbanize/get_projects_and_boards/format/json';
	kanbanize.uriBoardStructure=kanbanize.domain+'/index.php/api/kanbanize/get_board_structure/format/json';
	kanbanize.uriBoardSettings=kanbanize.domain+'/index.php/api/kanbanize/get_board_settings/format/json';

	kanbanize.apiKey=apiKey;
	return kanbanize;
};