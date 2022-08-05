function retrieveScores () {
    var highscoresArr =[]
    var highscores = JSON.parse(localStorage.getItem("scores"));
    highscoresArr.push(highscores)

    for (let i = 0; i < highscoresArr.length; i++) {
        var display = document.querySelector("#placement");
        var list = document.createElement("li");
        var finalScore = highscoresArr[i].finalScore
        var initials = highscoresArr[i].initials
        list.textContent = initials + " : " + finalScore
        display.appendChild(list);
    };
};

retrieveScores();