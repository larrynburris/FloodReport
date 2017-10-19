const http = require("http");
const express = require("express");
var TriviaQuestionBank = require('./trivia-question-bank');

let triviaQuestionBank = new TriviaQuestionBank();

let app = express();
app.server = http.createServer(app);

var port = process.env.PORT || 3001;

app.use('/', express.static('public'));

app.get('/trivia/:questionNumber', function(req, res) {
    let questionNumber = parseInt(req.params.questionNumber);
    let question =  triviaQuestionBank.getQuestion(questionNumber);
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify(question.toJSON()));
});

app.post('/trivia/tally/:questionNumber/:choice', function(req, res) {
    let questionNumber = parseInt(req.params.questionNumber);
    let choice = isNaN(req.params.choice) ? req.params.choice : parseInt(req.params.choice);
    let question = triviaQuestionBank.updateQuestion(questionNumber, choice);
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify(question.toJSON()));
});

app.server.listen(port, () => {
    console.log(`Started on port ${app.server.address().port}`);
});
