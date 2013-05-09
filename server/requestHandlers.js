

function track(response) {
  console.log("Request handler 'map' was called.");

  //response.sendfile(__dirname + '/html/test.html');
  response.sendfile('./frontend/tracking.html');

}
/*
function getAllCities(response){
  console.log("Request handler 'cities' was called.");

  response.writeHead(200, {"Content-Type": "application/json"});

  var test_cities = require("../html/test_cities");

  response.write(
    JSON.stringify(test_cities)
  );
  response.end();
}*/

exports.track = track;
