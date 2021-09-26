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
var startSection= document.querySelector("#intro")
var startButton = document.querySelector("#start-button");
var quiz = document.querySelector("#quiz")
var questions = [
                    {
                        question: "What is the purpose of .gitignore?",
                        choices:  [ "To add files you want to ignore", "To only add .DS_Store ", "Something only Mac users have to worry about."],
                        answer: "To add files you want to ignore",
                    },

                    {
                        question: "How do you comment code out in JavaScript?",
                        choices: ["--", "**", "//",],
                        answer: "//"
                    },
                    {   
                        question: "How do you add a class element using JavaScript?",
                        choices: ["listclass.add","listClass.add",`setAttribute("class", value)`],
                        answer: "listClass.add"
                    },
                    {
                        question: "If a variable is declared outside the function it is a ____.",
                        choices: ["A variable"," A local variable", "A global variable"],
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
    var timeInterval = setInterval(function() {
        time--;
        header.textContent= time
        if(time <= 0) {
            clearInterval(timeInterval);
            endGame()
        }
    }, 1000);
}

startButton.addEventListener("click", startGame)
//start quiz function, displays each time you load the page
function startGame () {
    startSection.classList.add("hide");
    quiz.classList.remove("hide");
    countdown();
    loadQuestions();
}
//function to load in new questions
var loadQuestions = function () {
    if (startingIndex === questions.length){
        endGame();
    }
    else {
        //adds question to question section on html
        var quizQuestion = questions[startingIndex].question
        title.innerHTML = quizQuestion
            //creates a button for each answer option and assigns it a unique id
            for (var i = 0; i < questions[startingIndex].choices.length; i++) {
                var questionButtons = document.createElement("button");
                questionButtons.innerHTML = questions[startingIndex].choices[i];
                const element = questions[startingIndex].choices[i];
                questionButtons.setAttribute("questionId", element)
                choices.appendChild(questionButtons);
                    questionButtons.addEventListener("click", function (event){
                        var correctAnswer= questions[startingIndex].answer
                        var currentAnswer= event.target.getAttribute("questionId")
                        console.log(currentAnswer);
                        console.log(correctAnswer);
                        
                        if (currentAnswer === correctAnswer) {
                            solution.innerHTML = "Correct!";
                            highscore ++;
                            startingIndex++;
                            choices.innerHTML=""
                            loadQuestions(startingIndex);

                        }
                        else {
                            solution.innerHTML = "Wrong!";
                            time = time - 10;
                            console.log(time);
                            startingIndex++;
                            choices.innerHTML=""
                            loadQuestions(startingIndex);
                        }
                    }); 
            };
    };
}

function endGame () {
    var finalScoreEl = highscore * time
    header.classList.add("hide");
    title.innerHTML = "";
    solution.innerHTML = "";
    var endScreenEl = document.createElement ("div");

    // to display end title
    var endTitle = document.createElement("h1");
    endTitle.textContent = "All done!";
    endTitle.className = "end-title"
    endScreenEl.appendChild(endTitle);

    // to display final score
    var finalScore = document.createElement("p");
    finalScore.textContent = "Your final score is " + finalScoreEl + " .";
    finalScore.className = "final-score-description";
    endScreenEl.appendChild(finalScore);

    var initialLabel = document.createElement("label");
    initialLabel.setAttribute("for","initials");
    initialLabel.innerHTML = "Enter initials:";
    endScreenEl.appendChild(initialLabel);

    var initialEntry = document.createElement("input");
    initialEntry.setAttribute("type", "text");
    initialEntry.classList.add("input");
    initialEntry.setAttribute("name","initials");
    endScreenEl.appendChild(initialEntry);

    // button to submit
    var submitButton = document.createElement("button");
    submitButton.textContent = "Submit";
    submitButton.setAttribute("type","submit");
    endScreenEl.appendChild(submitButton);
    // appends main div to body element
    title.appendChild(endScreenEl) 
    submitButton.addEventListener("click", function capture (event){
        var input = document.querySelector(".input");
        var initial = input.value;
        localStorage.setItem ("inital", initial + " " + finalScoreEl);
        input.value = "";
        
    })

    
    

    


}
