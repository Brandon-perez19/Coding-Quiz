for (let i = 0; i < localStorage.getItem("initial").length; i++) {
var display = document.querySelector("#placement");
var list = document.createElement("li");
var retrieve = localStorage.getItem("inital")
list.textContent = retrieve
display.appendChild(list);
};
