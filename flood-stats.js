"use strict";

const Enumerable = require("linq");

class FloodStatsGenerator {

    constructor(floods) {
        this.floodEvents = floods;
    }

    getYearlyFloodCounts() {
        return Enumerable.from(this.floodEvents)
                        .groupBy("$.getYear()", 
                                "g => g",
                                "yr, grp => { year: yr, count:grp.count() }")
                        .toArray()
                        .filter(function (f) {
                            let filtered = (f.year !== 1900) && (!isNaN(f.year));
                            return filtered;
                        });
    }
}

module.exports = FloodStatsGenerator;