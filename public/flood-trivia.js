
var currentQuestion = 0;

function onStartClicked(event) {
    getNextQuestion(currentQuestion);
}

function onNextQuestionClicked(event) {
    currentQuestion += 1;
    getNextQuestion(currentQuestion);
}

function getNextQuestion(questionNumber) {
    let query = '/trivia/' + questionNumber;
    console.log('Making query: ' + query);
    window.fetch(query)
    .then(function (resp){
        console.log(resp);
        return resp.json();
    })
    .then( function (data) {
        updateQuestionHtml(data.question, data.choices);
    });
}

function updateQuestionHtml(question, choices) {
    hideResultsAndDetails();
    let questionElement = document.getElementById('question');
    questionElement.innerText = question;

    let choicesElement = document.getElementById('choices');
    removeAllChildren(choicesElement);
    let listGroup = document.createElement('ul');
    listGroup.classList.add('list-group"');

    choices.forEach(function (choice) {
        let listItem = document.createElement('li');
        listItem.classList.add('list-group-item');
        listItem.innerText = choice;

        listItem.addEventListener('click', function (event) {
            let choice = event.target.innerText;
            window.fetch('/trivia/tally/' + currentQuestion + '/' + choice, { method: "POST" })
                .then( (resp) => resp.json() )
                .then( function (data) {
                    if (data.error) {
                        window.alert(data.error);
                    } else {
                        updateResultsHtml(data.results);
                        updateDataHtml(data.details);
                        showNextQuestionButton();
                    }
                });
        });
        listGroup.appendChild(listItem);
    });

    choicesElement.appendChild(listGroup);    
}

function updateResultsHtml(results) {
    let resultsElement = document.getElementById('results');
    removeAllChildren(resultsElement);    
    let listGroup = document.createElement('ul');
    listGroup.classList.add('list-group"');

    for (result of results) {
        let listItem = document.createElement('li');
        listItem.classList.add('list-group-item');
        listItem.innerText = result.choice + ': ' + result.count;
        listGroup.appendChild(listItem);
    }
    resultsElement.appendChild(listGroup);

    let resultsHtmlGroup = document.getElementById('results-html-group');
    showElement(resultsHtmlGroup);
}

function updateDataHtml(details) {
    let dataHtmlGroup = document.getElementById('data-html-group');
    showElement(dataHtmlGroup);
    let dataBody = document.getElementById('data');
    removeAllChildren(dataBody);
    
    let chartCanvas = document.createElement('canvas');
    chartCanvas.setAttribute('id', 'dataChart');
    dataBody.appendChild(chartCanvas);
    let ctx = document.getElementById("dataChart").getContext("2d");
    ctx.height = 300;
    let sortedDetails = details.sort(function(a,b){
        return a.year - b.year
    });
    let detailLabels = sortedDetails.map(d => d.year);
    let detailData = sortedDetails.map(d => d.count);
    console.log(detailLabels);
    console.log(detailData);
    let dataChart = new Chart(ctx, {
        responsive: true,
        type: 'bar',
        data: {
            labels: detailLabels,
            datasets: [{
                label: '# of Floods',
                data: detailData
            
            }]
        }
    });
    
}

function showNextQuestionButton() {
    let nextQuestionButton = document.getElementById('next-question');
    showElement(nextQuestionButton);    
}

function hideResultsAndDetails() {
    let resultsHtmlGroup = document.getElementById('results-html-group');
    let dataHtmlGroup = document.getElementById('data-html-group');
    let nextQuestionButton = document.getElementById('next-question');
    hideElement(resultsHtmlGroup);
    hideElement(dataHtmlGroup);    
    hideElement(nextQuestionButton);
}

function hideElement(element) {
    element.classList.add('d-none');
}

function showElement(element) {
    element.classList.remove('d-none');
}

function removeAllChildren(myNode) {
    while (myNode.firstChild) {
        myNode.removeChild(myNode.firstChild);
    }
}