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
                        .toArray();
    }
}

module.exports = FloodStatsGenerator;