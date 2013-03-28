var should=require("should");
var assert=require("assert");
var nock=require("nock");
var kanbanize=require("../kanbanize.js");

describe("kanbanize",function(){
	var apiKey="anykey";

	describe("getProjectsAndBoards", function(){
		it('should get projects and boards', function(done){
			var projectsAndBoards={projects:[{name:'project',id:'idProject',bords:[{name:'board',id:'idBoard'}]}]};
			var scope=nock('http://kanbanize.com')
				.matchHeader('apikey', apiKey)
				.post('/index.php/api/kanbanize/get_projects_and_boards/format/json')
				.reply(200, projectsAndBoards);

			kanbanize(apiKey).getProjectsAndBoards(function(data){
				JSON.parse(data).should.eql(projectsAndBoards);
				done();
			});
		});
	});

	describe("getBoardStructure",function(){
		it('should get the board structure', function(done)
		{
			var idBoard='2';
			var structure={columns:[{position:0,lcname:'juas',description:'tachan'}],lanes:[{lcname:'test',color:'yellow',description:'descripcion'}]};
			var scope=nock('http://kanbanize.com')
				.matchHeader('apikey', apiKey)
				.post('/index.php/api/kanbanize/get_board_structure/format/json',{boardid:idBoard})
				.reply(200,structure);
			
			kanbanize(apiKey).getBoardStructure(idBoard,function(data){
				JSON.parse(data).should.eql(structure);
				done();
			});
		});
	});
});