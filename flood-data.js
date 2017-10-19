"use strict";

const http = require("http");
const fs = require('fs');
var xlsx = require('xlsx');

class FloodData {

    constructor() {
    }

    loadFromFile(filename) {
        var data = [];
        var wb = xlsx.readFile(filename);
        /* generate array of arrays */
        data = xlsx.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]], {header:1});
        return data;
    }
}

module.exports = FloodData;