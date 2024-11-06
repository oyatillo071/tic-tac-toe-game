let userChoise = "";
let botChoise = "";

//

const xBtn = document.querySelector(".choise_mark-btn-x");
const ovalBtn = document.querySelector(".choise_mark-btn-o");
const xBtnImg = document.querySelector(".choise_mark-btn-x-img");
const ovalBtnImg = document.querySelector(".choise_mark-btn-o-img");
let fisrtUserChoise = document.querySelector(".choise_mark-btn");
const restartBtn = document.querySelector(".restart-btn");
const turnImg = document.querySelector(".turn-img");

//

xBtn &&
  xBtn.addEventListener("click", () => {
    userChoise = "x";
    botChoise = "o";

    xBtn.setAttribute("id", "isActive-choise");
    ovalBtn.setAttribute("id", " ");
    xBtnImg.setAttribute("src", "./images/active-x.svg");
    ovalBtnImg.setAttribute("src", "./images/turn-oval.svg");
  });
ovalBtn &&
  ovalBtn.addEventListener("click", () => {
    userChoise = "o";
    botChoise = "x";

    ovalBtn.setAttribute("id", "isActive-choise");
    xBtn.setAttribute("id", " ");
    xBtnImg.setAttribute("src", "./images/choise-x.png");
    ovalBtnImg.setAttribute("src", "./images/choise-o.png");
  });

document.querySelector(".choise_section-cpu").addEventListener("click", () => {
  if (userChoise != "") {
    document.querySelector(".choise_section").style.display = "none";
    document.querySelector("main").style.display = "block";

    //
  } else {
    alert("X yoki O ni tanlash kerak!");
    document.querySelector(".choise_mark-wrapper").focus();
  }
});

const gameBtn = document.querySelectorAll(".game-area-btn");

gameBtn.forEach(function (button) {
  button.addEventListener("click", function () {
    if (
      !button.classList.contains("activeOval") &&
      !button.classList.contains("activeX")
    ) {
      if (turnImg.getAttribute("src") === "./images/nav-x.svg") {
        button.innerHTML = `<img src="./images/x.svg" alt="x">`;
        button.classList.add("activeX");
        turnImg.setAttribute("src", "./images/turn-oval.svg");
      } else {
        button.innerHTML = `<img src="./images/orange-oval.svg" alt="oval">`;
        button.classList.add("activeOval");
        turnImg.setAttribute("src", "./images/nav-x.svg");
      }
    }
  });
});

const restartModal = document.querySelector(".restart_modal");
restartBtn &&
  restartBtn.addEventListener("click", () => {
    restartModal.style.display = "block";

    document
      .querySelector(".restart_modal-cancel")
      .addEventListener("click", () => {
        restartModal.style.display = "none";
      });
    document
      .querySelector(".restart_modal-confirm")
      .addEventListener("click", () => {
        location.reload();
      });
  });

console.log(userChoise);
