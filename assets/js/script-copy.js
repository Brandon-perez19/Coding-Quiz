/*
PROBLEMS:
Data tag increases by one, meaning answer values will have to change based on last click. IE:
If first question's answer is answer choice 1, next questions answers will need to be increased by 1.

Load question only loads one question, can't figure out how to loop it back.

Added endscreen function, but keeps repeating due to setinterval function.

*/
var startingIndex = 0
var highscore = 0
var time = 60
var header = document.querySelector("#timer")
var title = document.querySelector("#question")
var choices = document.querySelector("#choices")
var solution = document.querySelector("#answer")
var startSection = document.querySelector("#intro")
var startButton = document.querySelector("#start-button");
var quiz = document.querySelector("#quiz")
var questions = [
    {
        question: "What is the purpose of .gitignore?",
        choices: ["To add files you want to ignore", "To only add .DS_Store ", "Something only Mac users have to worry about."],
        answer: "To add files you want to ignore",
    },

    {
        question: "How do you comment code out in JavaScript?",
        choices: ["--", "**", "//",],
        answer: "//"
    },
    {
        question: "How do you add a class element using JavaScript?",
        choices: ["listclass.add", "listClass.add", `setAttribute("class", value)`],
        answer: "listClass.add"
    },
    {
        question: "If a variable is declared outside the function it is a ____.",
        choices: ["A variable", " A local variable", "A global variable"],
        answer: "A global variable"
    },
    {
        question: "What does HTML stand for?",
        choices: ["Hypertext Markup Language", "Hard Text Madeup Language", "I don't care"],
        answer: "Hypertext Markup Language"
    }
]

//function to have countdown clock
function countdown() {
    var timeInterval = setInterval(function () {
        time--;
        header.textContent = time
        if (time <= 0) {
            clearInterval(timeInterval);
            endGame()
        }
        else if (startingIndex === questions.length) {
            clearInterval(timeInterval);
        }
    }, 1000);
}


//start quiz function, displays each time you load the page
function startGame() {
    startSection.classList.add("hide");
    quiz.classList.remove("hide");
    // countdown();
    loadQuestions();
}

//function to load in new questions
var loadQuestions = function () {
    if (startingIndex === questions.length) {
        endGame();
    }
    else {
        //sets variable to question property in questions array 
        var quizQuestion = questions[startingIndex].question
        //sets the inner html of the section to whatever question is next
        title.innerHTML = quizQuestion
        //creates a button for each answer option and assigns it a unique id
        for (var i = 0; i < questions[startingIndex].choices.length; i++) {
            var questionButtons = document.createElement("button");
            questionButtons.innerHTML = questions[startingIndex].choices[i];

            const element = questions[startingIndex].choices[i];
            questionButtons.setAttribute("class", "btn btn-primary col-3")
            questionButtons.setAttribute("questionId", element)
            choices.appendChild(questionButtons);
            questionButtons.addEventListener("click", function (event) {
                var correctAnswer = questions[startingIndex].answer
                var currentAnswer = event.target.getAttribute("questionId")
                console.log(currentAnswer);
                console.log(correctAnswer);

                if (currentAnswer === correctAnswer) {
                    solution.innerHTML = "Correct!";
                    solution.setAttribute("class", "text-success h1 text-center fw-bolder")
                    highscore++;
                    startingIndex++;
                    choices.innerHTML = ""
                    loadQuestions(startingIndex);

                }
                else {
                    solution.innerHTML = "Wrong!";
                    solution.setAttribute("class", "text-danger h1 text-center fw-bolder")
                    time = time - 10;
                    console.log(time);
                    startingIndex++;
                    choices.innerHTML = ""
                    loadQuestions(startingIndex);
                }
            });
        };
    };
}

function endGame() {
    var finalScoreEl = highscore * time
    header.classList.add("hide");
    title.innerHTML = "";
    solution.innerHTML = "";
    var endScreenEl = document.createElement("div");

    // to display end title
    var endTitle = document.createElement("h1");
    endTitle.textContent = "All done!";

    //add the attribute class and then its associated values
    endTitle.className = "end-title text-primary"
    endScreenEl.appendChild(endTitle);

    // to display final score
    var finalScore = document.createElement("p");
    finalScore.textContent = "Your final score is " + finalScoreEl + " .";
    finalScore.className = "final-score-description text-primary";
    endScreenEl.appendChild(finalScore);

    var initialLabel = document.createElement("label");
    initialLabel.setAttribute("for", "initials");
    initialLabel.innerHTML = "Enter initials:";
    endScreenEl.appendChild(initialLabel);

    var initialEntry = document.createElement("input");
    initialEntry.setAttribute("type", "text");
    initialEntry.setAttribute("class", "form-control input my-2")
    initialEntry.setAttribute("name", "initials");
    initialEntry.setAttribute("placeholder", "Ex: BP")
    endScreenEl.appendChild(initialEntry);

    // button to submit
    var submitButton = document.createElement("button");
    submitButton.textContent = "Submit";
    submitButton.setAttribute("type", "submit");
    submitButton.setAttribute("class", "btn btn-success")
    endScreenEl.appendChild(submitButton);

    // appends main div to body element
    title.appendChild(endScreenEl)

    submitButton.addEventListener("click", function capture(event) {
        var input = document.querySelector(".input");
        var initial = input.value;
        var scoresObj = {
            initials: initial,
            finalScore: finalScoreEl
        }
        var highscores = JSON.parse(localStorage.getItem("scores"))

        if (!highscores) {
            localStorage.setItem('scores', JSON.stringify(scoresObj))
        } 
        else if (highscores.length >= 2) {
            console.log(highscores)
            highscores.push(scoresObj)
            localStorage.setItem('scores', JSON.stringify(highscores))        
        } else {
            var highscoresArr =[]
            var highscores = JSON.parse(localStorage.getItem("scores"))
            highscoresArr.push(highscores)
            highscoresArr.push(scoresObj)
            localStorage.setItem('scores', JSON.stringify(highscoresArr))        
        }
        input.value = "";
    })
}

startButton.addEventListener("click", startGame)