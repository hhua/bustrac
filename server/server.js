var express = require('express');

function start(route, handle){
	var app = express();
	app.use(express.logger());

	app.get('/' , function(req, res){
		route(handle, '/', res);
	});

	app.use(express.static('./data'));
	app.use(express.static('./frontend'));

	var port = process.env.PORT || 3000;
	app.listen(port);
	console.log('Listening on port ' + port);
}

exports.start = start;	
