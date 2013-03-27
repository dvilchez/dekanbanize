var should=require("should");
var assert=require("assert");
var nock=require("nock");
var kanbanize=require("../kanbanize.js");

describe("kanbanize",function(){
	var api_key="OEypAZ9DSdwq0WZwZBTeZUK7wp5UN0B1JMSBiAry";
	describe("getBoardStructure",function(){
		it('should get the board structure', function(done)
		{
			var board_id='2';
			var structure={columns:[{position:0,lcname:'juas',description:'tachan'}],lanes:[{lcname:'test',color:'yellow',description:'descripcion'}]};
			var scope=nock('http://kanbanize.com')
				.matchHeader('apikey', api_key)
				.post('/index.php/api/kanbanize/get_board_structure/format/json',{boardid:board_id})
				.reply(200,structure);
			kanbanize(api_key).getBoardStructure(board_id,function(data){
				JSON.parse(data).should.eql(structure);
				done();
			});
		});
	});
});