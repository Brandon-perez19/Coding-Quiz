function retrieveScores() {
    var highscores = JSON.parse(localStorage.getItem("scores"));
    var display = document.querySelector("#placement");
    if (!highscores) {
        var list = document.createElement("li");
        list.setAttribute("class", "list-group-item")
        list.textContent= "No Scores Saved!"
        display.appendChild(list);
    }
    else if (highscores.length >= 2) {
        for (let i = 0; i < highscores.length; i++) {
            var list = document.createElement("li");
            list.setAttribute("class", "list-group-item")
            var finalScore = highscores[i].finalScore
            var initials = highscores[i].initials
            list.textContent = initials + " : " + finalScore
            display.appendChild(list);
        };
    }
    else {
        var list = document.createElement("li");
        list.setAttribute("class", "list-group-item")
        var finalScore = highscores.finalScore
        var initials = highscores.initials
        list.textContent = initials + " : " + finalScore
        display.appendChild(list);
    }
};

retrieveScores();