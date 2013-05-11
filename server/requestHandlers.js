
// GET METHODS
function track(request, response) {
  console.log("Request handler 'track' was called.");

  response.sendfile('./views/tracking.html');

}

function allstops(request, response) {
  console.log("Request handler 'allstops' was called.");

  response.writeHead(200, {"Content-Type": "application/json"});

  var fs = require('fs');
  fs.readFile('./data/general_transit/stops.txt', function(err, data) {
    if(err) throw err;
    var array = data.toString().split("\n");
    for(i in array) {
        console.log(array[i]);
    }
  });

  

  var stops = [];
  response.write(
    JSON.stringify(stops)
  );
  response.end();
}

function planner(request, response){
  console.log("Request handler 'planner' was called.");

  //response.sendfile('./views/tripplanner.ejs');
  response.render('../views/tripplanner');
}

function planner1(request, response){
  console.log("Request handler 'planner1' was called.");

  response.sendfile('./views/tripplanner1.html');
}

// POST METHODS

function station(request, response){
  console.log("Request handler 'station' was called.");
  response.sendfile('./views/tracking2.html');
}

function tripplan(request, response){
  console.log("Request handler 'tripplan' was called.");
  //response.sendfile('./frontend/tracking2.html');
  //console.log(request.body);

  var origin = request.body.origin;
  var dest = request.body.dest;
  var date = request.body.date;
  var time = request.body.time;

  console.log(time);

  response.render('../views/tripplanner1', {origin: origin, dest: dest, date: date, time: time});
}


exports.track = track;
exports.allstops = allstops;
exports.station = station;
exports.planner = planner;
exports.planner1 = planner1;
exports.tripplan = tripplan;
