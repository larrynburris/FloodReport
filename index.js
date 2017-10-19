"use strict";

const http = require("http");
const express = require("express");
var FloodData = require('./flood-data');
var FloodEvent = require('./flood-event');
var FloodStatsGenerator = require('./flood-stats');

var dataService = new FloodData();
var data = dataService.loadFromFile('./data/floods.xls');
var floodEvents = data.map(function(flood) {
    return new FloodEvent(flood);
 });
//console.log(floodEvents[0].printFull());
//console.log(floodEvents[1].printFull());
console.log(floodEvents.length);

var floodStatsGenerator = new FloodStatsGenerator(floodEvents);
var yearCounts = floodStatsGenerator.getYearlyFloodCounts();
console.log(yearCounts);

let app = express();
app.server = http.createServer(app);

var port = process.env.PORT || 3000;

app.use('/', express.static('public'));

app.server.listen(port, () => {
    console.log(`Started on port ${app.server.address().port}`);
});
