var express = require('express');

function start(route, handle){
	var app = express();
	app.use(express.logger());
	app.use(express.bodyParser()); // Automatically parses form data

	app.get('/' , function(req, res){
		route(handle, '/', req, res);
	});

	app.get('/allstops', function(req, res){
		route(handle, '/allstops', req, res);
	});

	app.get('/trip_planner', function(req, res){

	});

	app.get('/scheduler', function(req, res){

	});

	app.post('/bus_station', function(req, res){
		//console.log(req.body);
		route(handle, '/bus_station', req, res);
	});

	app.use(express.static('./data'));
	app.use(express.static('./frontend'));

	var port = process.env.PORT || 3000;
	app.listen(port);
	console.log('Listening on port ' + port);
}

exports.start = start;	
