const TriviaQuestion = require('./app/trivia-question');
const TriviaResponse = require('./app/trivia-response');
const TriviaStatsGenerator = require('./flood-stats');
const FloodRepo = require('./flood-data');
const FloodEvent = require('./flood-event');

class TriviaQuestionBank {

    constructor() {
        this.floods = this.loadData();
        this.stats = new TriviaStatsGenerator(this.floods);
        this.questions = [];
        this.questions.push(this.initializeQuestionOne(this.stats.getYearlyFloodCounts()));
    }

    loadData() {
        let floodRepo = new FloodRepo();
        let data = floodRepo.loadFromFile('./data/floods.xls');
        return data.map(function(flood) {
            return new FloodEvent(flood);
         });
    }

    initializeQuestionOne(yearlyCounts) {
        var quarterGroupSize = Math.floor(yearlyCounts.length/4);
        let countSortedYearlyCounts = yearlyCounts.sort(function (a, b) {
            return a.count - b.count
        });
        let minCountObject = countSortedYearlyCounts[0];
        let maxCountObject = countSortedYearlyCounts[countSortedYearlyCounts.length - 1];
        let lowerObject = countSortedYearlyCounts[quarterGroupSize];
        let middleObject = countSortedYearlyCounts[quarterGroupSize*2];
        let higherObject = countSortedYearlyCounts[quarterGroupSize*3];

        let q = new TriviaQuestion(0,
                        "Which year had the greatest amount of floods?", 
                        [minCountObject.year,
                            maxCountObject.year,
                            lowerObject.year,
                            middleObject.year,
                            higherObject.year], 
                        yearlyCounts);
        return q;
    }

    getQuestion(id){
        let matchingQuestion =  this.questions.filter(function(q) {
            return q.id === id; 
        })[0];
        return matchingQuestion;
    }

    updateQuestion(id, selectedChoice) {
        let currentQuestion = this.getQuestion(id);
        currentQuestion.updateResults(selectedChoice);
        return currentQuestion;
    }
}

module.exports = TriviaQuestionBank;