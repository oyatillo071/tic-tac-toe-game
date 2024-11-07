let userChoise = "";
let botChoise = "";
let withCpu = false;
let isXTurn = true;

//

const xBtn = document.querySelector(".choise_mark-btn-x");
const ovalBtn = document.querySelector(".choise_mark-btn-o");
const xBtnImg = document.querySelector(".choise_mark-btn-x-img");
const ovalBtnImg = document.querySelector(".choise_mark-btn-o-img");
let fisrtUserChoise = document.querySelector(".choise_mark-btn");
const restartBtn = document.querySelector(".restart-btn");
const turnImg = document.querySelector(".turn-img");

const firstBtn = document.querySelector(".game-area-btn-1");
const secondBtn = document.querySelector(".game-area-btn-2");
const thirdBtn = document.querySelector(".game-area-btn-3");
const fourBtn = document.querySelector(".game-area-btn-4");
const fiveBtn = document.querySelector(".game-area-btn-5");
const sixBtn = document.querySelector(".game-area-btn-6");
const sevenBtn = document.querySelector(".game-area-btn-7");
const eightBtn = document.querySelector(".game-area-btn-8");
const nineBtn = document.querySelector(".game-area-btn-9");

const gameButtons = document.querySelectorAll(".game-area-btn");

//
function updateFreeButtons() {
  return document.querySelectorAll(".empty");
}

function cpuRandomTurn(isXTurn) {
  let btns = updateFreeButtons();
  let randIndex = Math.trunc(Math.random() * btns.length);

  btns[randIndex].classList.remove("empty");

  if (isXTurn) {
    btns[randIndex].innerHTML = `<img src="./images/x.svg" alt="x">`;
    btns[randIndex].classList.add("activeX");
    turnImg.setAttribute("src", "./images/turn-oval.svg");
    isXTurn = false;
  } else {
    btns[
      randIndex
    ].innerHTML = `<img src="./images/orange-oval.svg" alt="oval">`;
    btns[randIndex].classList.add("activeOval");
    turnImg.setAttribute("src", "./images/nav-x.svg");
    isXTurn = true;
  }

  checkWin(botChoise === "x" ? "activeX" : "activeOval");
  isEndGame();
}

function checkWin(playerClass) {
  if (
    // Horizontal wins
    (firstBtn.classList.contains(playerClass) &&
      secondBtn.classList.contains(playerClass) &&
      thirdBtn.classList.contains(playerClass)) ||
    (fourBtn.classList.contains(playerClass) &&
      fiveBtn.classList.contains(playerClass) &&
      sixBtn.classList.contains(playerClass)) ||
    (sevenBtn.classList.contains(playerClass) &&
      eightBtn.classList.contains(playerClass) &&
      nineBtn.classList.contains(playerClass)) ||
    // Vertical wins
    (firstBtn.classList.contains(playerClass) &&
      fourBtn.classList.contains(playerClass) &&
      sevenBtn.classList.contains(playerClass)) ||
    (secondBtn.classList.contains(playerClass) &&
      fiveBtn.classList.contains(playerClass) &&
      eightBtn.classList.contains(playerClass)) ||
    (thirdBtn.classList.contains(playerClass) &&
      sixBtn.classList.contains(playerClass) &&
      nineBtn.classList.contains(playerClass)) ||
    // Diagonal wins
    (firstBtn.classList.contains(playerClass) &&
      fiveBtn.classList.contains(playerClass) &&
      nineBtn.classList.contains(playerClass)) ||
    (thirdBtn.classList.contains(playerClass) &&
      fiveBtn.classList.contains(playerClass) &&
      sevenBtn.classList.contains(playerClass))
  ) {
    // alert(`${playerClass === "activeX" ? "X" : "Oval"} wins!`);

    document.querySelector(".result_modal").style.display = "block";

    if (playerClass === "activeX") {
      document
        .querySelector(".won-side")
        .setAttribute("src", "./images/blue-x.svg");
    } else {
      document
        .querySelector(".won-side")
        .setAttribute("src", "./images/orange-oval.svg");
    }
  }
}

function isEndGame() {
  const isFull = Array.from(gameButtons).every((button) => {
    return !button.classList.contains("empty");
  });

  if (isFull) {
    document.querySelector(".tied_modal").style.display = "block";
  }
}

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

document
  .querySelector(".choise_section-player")
  .addEventListener("click", () => {
    document.querySelector(".choise_section").style.display = "none";
    document.querySelector("main").style.display = "block";
  });

document.querySelector(".choise_section-cpu").addEventListener("click", () => {
  if (userChoise != "") {
    document.querySelector(".choise_section").style.display = "none";
    document.querySelector("main").style.display = "block";
    withCpu = true;
    if (userChoise == "o") {
      cpuRandomTurn(true);
      isXTurn = false;
    }
  } else {
    alert("X yoki O ni tanlash kerak!");
    document.querySelector(".choise_mark-wrapper").focus();
  }
});

//

//

//

//
gameButtons.forEach((button) => {
  button.addEventListener("click", function () {
    //

    //

    if (
      !button.classList.contains("activeOval") &&
      !button.classList.contains("activeX")
    ) {
      button.classList.remove("empty");

      if (withCpu) {
        if (isXTurn) {
          button.innerHTML = `<img src="./images/x.svg" alt="x">`;
          button.classList.add("activeX");
          turnImg.setAttribute("src", "./images/turn-oval.svg");
        } else {
          button.innerHTML = `<img src="./images/orange-oval.svg" alt="oval">`;
          button.classList.add("activeOval");
          turnImg.setAttribute("src", "./images/nav-x.svg");
        }
        if (userChoise == "o") {
          cpuRandomTurn(true);
        } else {
          cpuRandomTurn(false);
        }
      } else if (!withCpu) {
        if (isXTurn) {
          button.innerHTML = `<img src="./images/x.svg" alt="x">`;
          button.classList.add("activeX");
          turnImg.setAttribute("src", "./images/turn-oval.svg");
        } else {
          button.innerHTML = `<img src="./images/orange-oval.svg" alt="oval">`;
          button.classList.add("activeOval");
          turnImg.setAttribute("src", "./images/nav-x.svg");
        }
        isXTurn = !isXTurn;
      }

      isEndGame();
    }
  });
});

//

//

//

//

//

//

//

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
// isXWon();

gameButtons.forEach((button) => {
  button.addEventListener("click", function () {
    checkWin("activeX");
    checkWin("activeOval");
  });
});
