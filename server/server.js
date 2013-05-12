var express = require('express');

function start(route, handle){
	var MemStore = express.session.MemoryStore;

	var app = express();
	app.use(express.logger());
	app.use(express.bodyParser()); // Automatically parses form data
	app.use(express.cookieParser());
	app.use(express.session({secret: 'secret_key', store: MemStore({reapInterval: 60000 * 10})}));
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

	app.get('/station', function(req, res){
		route(handle, '/station', req, res);
	});

	app.get('/stop/:stop_id/:stop_name', function(req, res){
		req.session.stop = {
      		stop_id: req.params.stop_id,
      		stop_name: req.params.stop_name
    	};
    	res.redirect('/station');
	});

	app.post('/bus_station', function(req, res){
		//console.log(req.body);
		route(handle, '/bus_station', req, res);
	});

	app.post('/scheduler', function(req, res){
		route(handle, '/scheduler', req, res);
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
