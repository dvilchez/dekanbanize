var should=require("should");
var assert=require("assert");
var nock=require("nock");
var kanbanize=require("../kanbanize.js");

describe("kanbanize",function(){
	var apiKey="anykey";
	var kb=kanbanize(apiKey);
	var scope=nock('http://kanbanize.com')
		.matchHeader('apikey', apiKey);

	describe("setXmlResponse", function(){
		it('should return xml data');
	});

	describe('setJSONResponse', function(){
		it('should return json data');
	});

	describe("getProjectsAndBoards", function(){
		var projectsAndBoards={projects:[{name:'project',id:'idProject',bords:[{name:'board',id:'idBoard'}]}]};
		scope.post(kb.uriProjectAndBoards)
			 .reply(200, projectsAndBoards);
	
		it('should get projects and boards', function(done){
			kb.getProjectsAndBoards(function(data){
				data.should.eql(projectsAndBoards);
				done();
			});
		});
	});

	describe("getBoardStructure",function(){
		var structure={columns:[{position:0,lcname:'juas',description:'tachan'}],lanes:[{lcname:'test',color:'yellow',description:'descripcion'}]};
		scope.post(kb.uriBoardStructure,{boardid:'2'})
			 .reply(200,structure);
		
		it('should get the board structure', function(done)
		{	
			kb.getBoardStructure('2',function(data){
				data.should.eql(structure);
				done();
			});
		});
	});

	describe("getBoardSettings", function(){
		var settings={usernames:['username'],templates:['template'],types:['TYPE']};
		scope.post(kb.uriBoardSettings,{boardid:'2'})
			 .reply(200,settings)
		
		it('should get the board settings', function (done) {
			kb.getBoardSettings('2', function (data) {
				data.should.eql(settings);
				done();
			});
		});
	});

	describe('getBoardActivities', function () {
		var activities={allactivities:'1',page:'1',activities:[{author:'author','event':'event',text:'text',date:'date',taskid:'taskid'}]};
		scope.post(kb.uriBoardActivities
				,{boardid:'2', fromdate:'last Monday', todate:'now',resultsperpage:'25'})
			.reply(200,activities);

		it('should get the board activities', function (done) {
			kb.getBoardActivities('2', 'last Monday', 'now', {resultsperpage:'25'}, function (data) {
				data.should.eql(activities);
				done();
			});
		});
	});

	describe('getAllTask', function () {
		var tasks={tasks:[{taskid:'1', position:'1', type:'type', assignee:'username', title:'title'
			, description:'description', subtasks:'0', subtaskscomplete:'0', color:'color', priority:'priority'
			, size:'size', deadline:'deadline', deadlineoriginalformat:'yyyy-mm-dd', extlink:'link'
			, tags:'tag1 tag2', columnid:'1', laneid:'1', leadtime:'1', blocked:'0', blockedreason:'reason'
			, subtasksdetails:'?', columnname:'name', lanename:'name', columnpath:'Column.Subcolumn.SubSubColumn'}]};
		scope.post(kb.uriBoardTasks
				,{boardid:'2', subtasks:'no', container:'backlog',page:'1'})
			.reply(200,tasks);

		it('should get the board tasks', function (done) {
			kb.getBoardTasks('2', 'no', 'backlog', '1', function (data) {
				data.should.eql(tasks);
				done();
			});
		});
	});

	describe('getAllArchiveTask', function () {
		it('should get the board archived tasks');
	});

	describe('searchTask', function(){
		it('should get the coincident ocurrences')
	});

	describe('createTask', function () {
		var taskId={taskid:'1'};
		scope.post(kb.uriCreateTask
				,{boardid:'1',title:'title', description:'description', priority:'low'
				,assignee:'username', color:'99b399', size:'XL', tags:'tags tags'
				, deadline:'yyyy-mm-dd', extlink:'http://link', type:'type name', template:'template name'})
			.reply(200,taskId);

		it('should create task in board', function (done) {
			kb.createTask('1', {title:'title', description:'description', priority:'low'
				,assignee:'username', color:'99b399', size:'XL', tags:'tags tags'
				, deadline:'yyyy-mm-dd', extlink:'http://link', type:'type name', template:'template name'}, function (data) {
				data.should.eql(taskId);
				done();
			});
		});
	});		
});