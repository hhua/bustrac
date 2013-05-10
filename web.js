var server = require("./server/server");
var router = require("./server/router");
var requestHandlers = require("./server/requestHandlers");

var handle = {};
handle["/"] = requestHandlers.track;
handle["/allstops"] = requestHandlers.allstops;
handle["/bus_station"] = requestHandlers.station;

server.start(router.route, handle);


