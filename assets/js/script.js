var highscore = 0
var time = 60 
var title = document.querySelector("#question")
var choices = document.querySelector("#choices")

var startGame = function () {

    var startingScreenEl = document.createElement ("div");

    var codingQuiz = document.createElement("h1");
    codingQuiz.textContent = "BootCamp Coding Quiz Challenge";
    codingQuiz.className = "question-title"
    startingScreenEl.appendChild(codingQuiz);

    var codingDescription = document.createElement("p");
    codingDescription.textContent = "Try to answer the following code-related questions within the time limit. Keep in mind that incorrect answers will penalize your score/time by ten seconds!";
    codingDescription.className = "question-description"
    startingScreenEl.appendChild(codingDescription);

    var startButton = document.createElement("button");
    startButton.textContent = "Start Quiz";
    startButton.setAttribute("type","submit");
    startingScreenEl.appendChild(startButton);

    title.appendChild(startingScreenEl)
}

startGame();