
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

  var stop_id = request.body.stop_id;
  var stop_name = request.body.stop_name;

  var fs = require('fs');
  try{
    var data = fs.readFileSync('./data/general_transit/stop_times.txt');

    var bus = []; // [[trip_id, arrival_time], ...]
    var array = data.toString().split("\n");
    for(i in array) {
        if(i == 0)
          continue;

        var item = array[i].split(",");

        if(stop_id != item[3])
          continue;

        var date = new Date();
        var hours = date.getHours() + 10; // + 10 for test
        var minutes = date.getMinutes();
        var testHours = parseInt(item[1].substring(0, 2));
        var testMinutes = parseInt(item[1].substring(3, 5));

        if((testHours == hours && testMinutes > minutes) || (testHours == (hours + 1) && testMinutes <= minutes)){
          var entry = [];
          entry.push(item[0]);
          entry.push(item[1]);
          bus.push(entry);
        }
    }

    bus.sort(function(a, b){
      return a[1].localeCompare(b[1]);
    });

    // read trips
    var tripsData = fs.readFileSync('./data/general_transit/trips.txt');
    array = tripsData.toString().split("\n");
    var trips = {}; // {trip_id : [route_id, trip_headsign], ...}
    for(i in array){
      if(i == 0)
        continue;

      var item = array[i].split(",");

      var entry = [item[0], item[3]];
      trips[item[2]] = entry;
    }

    // read routes
    var routesData = fs.readFileSync('./data/general_transit/routes.txt');
    array = routesData.toString().split("\n");
    var routes = {}; // {route_id : route_short_name, ...}
    for(i in array){
      if(i == 0)
        continue;

      var item = array[i].split(",");

      routes[item[0]] = item[2];
    }

    var schedule = [];
    for(i in bus){
      var item = bus[i];

      var entry = []; // [arrival_time, trip_id, route_id, trip_headsign, route_short_name]
      entry.push(item[1].substring(0, 5));
      entry.push(item[0]);

      var trip = trips[item[0]];
      entry.push(trip[0]);
      entry.push(trip[1]);
      entry.push(routes[trip[0]]);
      schedule.push(entry);
    }

    //console.log(JSON.stringify(schedule, null, 3));

    response.render('../views/tracking2', {schedule: schedule, stop_name: stop_name});
  }catch(err){
    throw err;
  }


  
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
