class TriviaQuestion {
    constructor(id, question, choices, details) {
        this.id = id;
        this.question = question;
        this.choices = choices;
        this.results = [];
        for(var choice of choices) {
            this.results.push({
                choice: choice,
                count: 0
            });
        }
        this.details = details;
    }

    getResultByChoice(choice) {
        return this.results.filter(function(r) {
            return r.choice === choice; 
        })[0];
    }

    updateResults(selectedChoice) {
        let selectedResult = this.getResultByChoice(selectedChoice);
        selectedResult.count += 1;
    }

    toJSON() {
        return {
            id: this.id,
            question: this.question,
            choices: this.choices,
            results: this.results,
            details: this.details
        };
    }
}

module.exports = TriviaQuestion;