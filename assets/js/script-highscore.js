var highscores = JSON.stringify(localStorage.getItem("inital"));
for (let i = 0; i < highscores.length; i++) {
    var display = document.querySelector("#placement");
    var list = document.createElement("li");
    list.textContent = highscores
    display.appendChild(list);
};
