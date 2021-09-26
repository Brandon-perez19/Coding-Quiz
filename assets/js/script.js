/*
PROBLEMS:
Data tag increases by one, meaning answer values will have to change based on last click. IE:
If first question's answer is answer choice 1, next questions answers will need to be increased by 1.

Load question only loads one question, can't figure out how to loop it back.

Added endscreen function, but keeps repeating due to setinterval function.

*/



var highscore = 0
var time = 60
var header = document.querySelector("#timer")
var title = document.querySelector("#question")
var choices = document.querySelector("#choices")
var solution = document.querySelector("#answer")
var choiceIdCounter = 1
var questions = ["What is the purpose of .gitignore?", "What does DOM stand for?"]
var options1 = [ "To add files you want to ignore ", "To only add .DS_Store ", "Something only Mac users have to worry about."]
var answer = ["1"]


function countdownStarter (){
    var starter = setInterval(countdown, 1000);
 }

//function to have countdown clock
function countdown (){
    const minutes = Math.floor(time/60);
    let seconds = time % 60;
    seconds = seconds <10 ? '0' + seconds: seconds;
    timer.innerHTML = `${minutes}: ${seconds}`;
    time --;

    //prevents timer from running into the negatives
    time = time < 0 ? 0: time;
    
    if (time === 0) {
        endGame();
    };
};



//start quiz function, displays each time you load the page
var startGame = function () {
    //creates a div to hold the timer element in the header
    var timer = document.createElement ("div");
    header.appendChild(timer);

    //main div element that everything will be appeneded too 
    var startingScreenEl = document.createElement ("div");

    // to display quiz title
    var codingQuiz = document.createElement("h1");
    codingQuiz.textContent = "BootCamp Coding Quiz Challenge";
    codingQuiz.className = "question-title"
    startingScreenEl.appendChild(codingQuiz);

    // to display description of the quiz
    var codingDescription = document.createElement("p");
    codingDescription.textContent = "Try to answer the following code-related questions within the time limit. Keep in mind that incorrect answers will penalize your score/time by ten seconds!";
    codingDescription.className = "question-description"
    startingScreenEl.appendChild(codingDescription);

    // button to start quiz
    var startButton = document.createElement("button");
    startButton.textContent = "Start Quiz";
    startButton.setAttribute("type","submit");
    startingScreenEl.appendChild(startButton);

    // appends main div to body element
    title.appendChild(startingScreenEl) 

    //start button that is used to start counter and load questions onto page as well as clear old elements out
    startButton.addEventListener("click", function startTimer(){
        startingScreenEl.remove();
        loadQuestions();
    });
}

//function to target which button was clicked
function clicked (event) {
    // get target element from event
    var targetEl = event.target;
    // test if button was clicked
    if(targetEl.matches(".answer-choice")) {
        console.log("choice", targetEl)
    }
    //get unique data tag assigned to each button
    var questionId = targetEl.getAttribute("data-choice-id");

    //passes questionId variable to checker function
    checker(questionId)
}

//function to load in new questions
var loadQuestions = function () {
        countdownStarter()

        // if reaches end question call end game function, else statments, run checkecker function within load question

    for (var i = 0; i < questions.length; i++) {
        //adds question to question section on html
        var questionTitle = document.createElement("div");
            questionTitle.textContent= questions[i];
            title.appendChild(questionTitle);

        //creates a button for each answer option and assigns it a unique id
        for (var i = 0; i < options1.length; i++) {
        var questionButtons = document.createElement("button");
        questionButtons.innerHTML = options1[i];
        questionButtons.className = "answer-choice"

        //adds unique data tag to each button
        questionButtons.setAttribute("data-choice-id", choiceIdCounter);
        questionButtons.addEventListener("click", clicked)
        choices.appendChild(questionButtons);
        choiceIdCounter ++;
        };
    };
    loadQuestions()
};

//function to check to see if your answer is right 
function checker (questionId){
    //creates div element to display correct or incorrect 
    var answerDisplay = document.createElement("div")
    console.log (questionId)


    for (let i = 0; i < answer.length; i++) {
        if (questionId === answer[i]){
            answerDisplay.textContent = "Correct!";
            highscore ++;
        }
        else {
            answerDisplay.textContent ="Wrong!";
            time = time - 10;
        }
    }
    solution.appendChild(answerDisplay);

   reset()
}

function reset (){
    //clears out body element for new questions to load. Delayed to see if you got it correct
    setTimeout(function(){
        choices.innerHTML = "";
        title.innerHTML = "";
        solution.innerHTML = "";
        loadQuestions()
    }, 3000)
}

function endGame () {
    var endScreenEl = document.createElement ("div");

    // to display end title
    var endTitle = document.createElement("h1");
    endTitle.textContent = "All done!";
    endTitle.className = "end-title"
    endScreenEl.appendChild(endTitle);

    // to display final score
    var finalScore = document.createElement("p");
    finalScore.textContent = "Your final score is " + highscore + " .";
    finalScore.className = "final-score-description";
    endScreenEl.appendChild(finalScore);

    var initialLabel = document.createElement("label");
    initialLabel.setAttribute("for","initials");
    initialLabel.innerHTML = "Enter initials:";
    endScreenEl.appendChild(initialLabel);

    var initialEntry = document.createElement("input");
    initialEntry.setAttribute("type", "text");
    initialEntry.setAttribute("name","initials");
    endScreenEl.appendChild(initialEntry);

    // button to submit
    var submitButton = document.createElement("button");
    submitButton.textContent = "Submit";
    submitButton.setAttribute("type","submit");
    endScreenEl.appendChild(submitButton);

    // appends main div to body element
    title.appendChild(endScreenEl) 
}



//calling function 
startGame();