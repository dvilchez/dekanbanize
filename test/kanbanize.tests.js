var should=require("should");
var assert=require("assert");
var nock=require("nock");
var kanbanize=require("../kanbanize.js");

describe("kanbanize",function(){
	var apiKey="anykey";
	var idBoard='2';
	var projectsAndBoards={projects:[{name:'project',id:'idProject',bords:[{name:'board',id:'idBoard'}]}]};
	var structure={columns:[{position:0,lcname:'juas',description:'tachan'}],lanes:[{lcname:'test',color:'yellow',description:'descripcion'}]};
	var settings={usernames:['username'],templates:['template'],types:['TYPE']};
	var scope=nock('http://kanbanize.com')
		.matchHeader('apikey', apiKey)
		.post('/index.php/api/kanbanize/get_projects_and_boards/format/json')
		.reply(200, projectsAndBoards)
		.post('/index.php/api/kanbanize/get_board_structure/format/json',{boardid:idBoard})
		.reply(200,structure)
		.post('/index.php/api/kanbanize/get_board_settings/format/json',{boardid:idBoard})
		.reply(200,settings);


	describe("setXmlResponse", function(){
		it('should return xml data');
	});

	describe('setJSONResponse', function(){
		it('should return json data');
	});

	describe("getProjectsAndBoards", function(){
		it('should get projects and boards', function(done){
			kanbanize(apiKey).getProjectsAndBoards(function(data){
				data.should.eql(projectsAndBoards);
				done();
			});
		});
	});

	describe("getBoardStructure",function(){
		it('should get the board structure', function(done)
		{	
			kanbanize(apiKey).getBoardStructure(idBoard,function(data){
				data.should.eql(structure);
				done();
			});
		});
	});

	describe("getBoardSettings", function(){
		it('should get the board settings', function (done) {
			kanbanize(apiKey).getBoardSettings(idBoard, function (data) {
				data.should.eql(settings);
				done();
			});
		});
	});
});