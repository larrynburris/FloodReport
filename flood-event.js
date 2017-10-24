"use strict";

const parser = require("./parsers");

class FloodEvent {
    
    constructor(row) {
        this.registerNumber = row[0];
        this.country = row[3];
        this.locations = parser.csvToArray(row[7]);
        if(typeof row[9] != 'undefined') {
            this.beginDate = parser.stringToDate(row[9], "dd-mmm-yy");
        } else {
            this.beginDate = new Date(1900, 1, 1);
        }
        if(typeof row[10] != 'undefined') {
            this.endDate = parser.stringToDate(row[10], "dd-mmm-yy");            
        } else {
            this.endDate = new Date(1900, 1, 1);
        }
        this.durationInDays = row[11];
        this.numberOfDeaths = row[12];
        this.numberDisplaced = row[13];
        this.mainCause = row[15];
        this.severity = row[16];
        this.affectedArea = row[17];
        this.magnitude = row[18];
        this.centroidX = row[19];
        this.centroidY = row[20];
    }

    getYear() {
        return this.beginDate.getFullYear();
    }

    parseLocations(csvLocations) {
        var parser = new CsvParser();
        return parser.toArray(csvLocations);
    }

    printFull() {
        console.log("Register #: " + this.registerNumber);
        console.log("Country: " + this.country);
        console.log("Locations: " + this.locations);
        console.log("Begin Date: " + this.beginDate);
        console.log("End Date: " + this.endDate);
        console.log("Duration (days): " + this.durationInDays);
        console.log("Deaths: " + this.numberOfDeaths);
        console.log("Number displaced: " + this.numberDisplaced);
        console.log("Main Cause: " + this.mainCause);
        console.log("Severity: " + this.severity);
        console.log("Magnitude: " + this.magnitude);
        console.log("Centroid: ( " + this.centroidX + ", " + this.centroidY + " )");
    }
}

module.exports = FloodEvent;