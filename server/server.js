var express = require('express');

function start(route, handle){
	var app = express();
	app.use(express.logger());
	app.use(express.bodyParser()); // Automatically parses form data
	app.set('view engine', 'ejs');
	app.set('view options', {layout: false});

	app.get('/' , function(req, res){
		route(handle, '/track', req, res);
	});

	app.get('/track', function(req, res){
		route(handle, '/track', req, res);
	});

	app.get('/allstops', function(req, res){
		route(handle, '/allstops', req, res);
	});

	app.get('/planner', function(req, res){
		route(handle, '/planner', req, res);
		//res.render('../views/tripplanner');
	});

	app.get('/planner1' ,function(req, res){
		route(handle, '/planner1', req, res);
	});

	app.get('/scheduler', function(req, res){

	});

	app.post('/bus_station', function(req, res){
		//console.log(req.body);
		route(handle, '/bus_station', req, res);
	});

	app.post('/tripplan', function(req, res){
		route(handle, '/tripplan', req, res);
	});

	app.use(express.static('./data'));
	app.use(express.static('./views'));

	var port = process.env.PORT || 3000;
	app.listen(port);
	console.log('Listening on port ' + port);
}

exports.start = start;	
