
// GET METHODS
function track(request, response) {
  console.log("Request handler 'track' was called.");

  //response.sendfile('./views/tracking.html');
  response.render('../views/tracking');
}

function allstops(request, response) {
  console.log("Request handler 'allstops' was called.");

  response.writeHead(200, {"Content-Type": "application/json"});

  var stops = [];
  var fs = require('fs');

  try{
    var data = fs.readFileSync('./data/general_transit/stops.txt');

    var array = data.toString().split("\n");
    for(i in array) {
        if(i == 0)
          continue;

        var location = [];
        var item = array[i].split(",");
        location.push(item[0]);
        location.push(item[2].substring(1, item[2].length - 1));
        stops.push(location);
    }

    response.write(
      JSON.stringify(stops)
    );
    response.end();
  }catch(err){
    throw err;
  }
  
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
  response.render('../views/tracking2');
}

function tripplan(request, response){
  console.log("Request handler 'tripplan' was called.");
  //response.sendfile('./frontend/tracking2.html');
  //console.log(request.body);

  var origin = request.body.origin;
  var dest = request.body.dest;
  var date = request.body.date;
  var time = request.body.time;

  response.render('../views/tripplanner1', {origin: origin, dest: dest, date: date, time: time});
}


exports.track = track;
exports.allstops = allstops;
exports.station = station;
exports.planner = planner;
exports.planner1 = planner1;
exports.tripplan = tripplan;
