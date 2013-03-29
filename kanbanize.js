var rest=require('restler');
var kanbanize = {};

Object.prototype.combine = function conbineObjects(object) {
  	for (var attrname in object)
    	this[attrname] = object[attrname];
	return this;
};

kanbanize.getProjectsAndBoards = function(callback){
	rest.post(kanbanize.domain+this.uriProjectAndBoards
		,{headers:{'apikey':this.apiKey}}).on('complete', function(data){callback(JSON.parse(data));})
};

kanbanize.getBoardStructure = function(idBoard,callback){
	rest.postJson(kanbanize.domain+this.uriBoardStructure
		,{'boardid':idBoard}
		,{headers:{'apikey':this.apiKey}}).on('complete',function(data){callback(JSON.parse(data));});
};

kanbanize.getBoardSettings = function  (idBoard, callback) {
	rest.postJson(kanbanize.domain+this.uriBoardSettings
		,{'boardid':idBoard}
		,{headers:{'apikey':this.apiKey}}).on('complete',function(data){callback(JSON.parse(data));});
};	

kanbanize.getBoardActivities = function  (idBoard, fromDate, toDate, args, callback) {
	rest.postJson(kanbanize.domain+this.uriBoardActivities
		,{'boardid':idBoard,'fromdate':fromDate, 'todate':toDate}.combine(args)
		,{headers:{'apikey':this.apiKey}}).on('complete',function(data){callback(JSON.parse(data));});
};

module.exports = function(apiKey){
	kanbanize.domain = 'http://kanbanize.com';
	kanbanize.uriProjectAndBoards='/index.php/api/kanbanize/get_projects_and_boards/format/json';
	kanbanize.uriBoardStructure='/index.php/api/kanbanize/get_board_structure/format/json';
	kanbanize.uriBoardSettings='/index.php/api/kanbanize/get_board_settings/format/json';
	kanbanize.uriBoardActivities='/index.php/api/kanbanize/get_board_activities/format/json';

	kanbanize.apiKey=apiKey;
	return kanbanize;
};