	var rest=require('restler');

	rest.post('http://kanbanize.com/index.php/api/kanbanize/get_board_structure/boardid/2',{headers:{'apikey':'OEypAZ9DSdwq0WZwZBTeZUK7wp5UN0B1JMSBiAry'}})
		.on('complete', function(data){
				console.log(data);
			}
		);