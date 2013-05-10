

function track(request, response) {
  console.log("Request handler 'track' was called.");

  response.sendfile('./frontend/tracking.html');

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

function station(request, response){
  console.log("Request handler 'station' was called.");
  response.sendfile('./frontend/tracking2.html');
}

exports.track = track;
exports.allstops = allstops;
exports.station = station;
