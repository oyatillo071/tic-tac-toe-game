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
const winCountElement = document.querySelector(".game_score-info-win");
const tieCountElement = document.querySelector(".game_score-info-tied");
const cpuCountElement = document.querySelector(".game_score-info-cpu");

//
let winCount = parseInt(localStorage.getItem("winCount")) || 0;
let tieCount = parseInt(localStorage.getItem("tieCount")) || 0;
let cpuCount = parseInt(localStorage.getItem("cpuCount")) || 0;
//

const gameButtons = document.querySelectorAll(".game-area-btn");

//
function updateFreeButtons() {
  return document.querySelectorAll(".empty");
}

//

function updateScoreDisplay() {
  winCountElement.innerHTML = `X <br> <h3> ${winCount} </h3>`;
  tieCountElement.innerHTML = `TIES <br> <h3> ${tieCount} </h3>`;
  cpuCountElement.innerHTML = `O <br> <h3> ${cpuCount} </h3>`;
}

//
function increaseWinCount() {
  winCount++;
  localStorage.setItem("winCount", winCount);
  updateScoreDisplay();
}

//

function increaseTieCount() {
  tieCount++;
  localStorage.setItem("tieCount", tieCount);
  updateScoreDisplay();
}

//

function increaseCpuCount() {
  cpuCount++;
  localStorage.setItem("cpuCount", cpuCount);
  updateScoreDisplay();
}

//
updateScoreDisplay();

//

//

//
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

  checkWin(botChoise == "x" ? "activeX" : "activeOval");
  isEndGame();
}

const gameButtonsArr = Array.from(document.querySelectorAll(".game-area-btn"));

const winPatterns = [
  [0, 1, 2], // Gorizontal
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6], // Vertikal
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8], // Diagonal
  [2, 4, 6],
];

function checkWin(playerClass) {
  const hasWon = winPatterns.some((pattern) =>
    pattern.every((index) =>
      gameButtonsArr[index].classList.contains(playerClass)
    )
  );

  if (hasWon) {
    document.querySelector(".result_modal").style.display = "block";
    let res = "";
    if (playerClass == "activeX") {
      if (playerClass == "activeX") {
        increaseWinCount();
      } else if (playerClass != "activeX") {
        increaseCpuCount();
      }
      res = "./images/blue-x.svg";
    } else {
      res = "./images/orange-oval.svg";
    }

    document.querySelector(".won-side").setAttribute("src", res);
  }
  updateScoreDisplay();
}

function isEndGame() {
  const isFull = Array.from(gameButtons).every((button) => {
    return !button.classList.contains("empty");
  });

  if ((isFull && checkWin("activeX")) || checkWin("activeOval")) {
    document.querySelector(".tied_modal").style.display = "block";
    increaseTieCount();
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
    updateScoreDisplay();
  });

document
  .querySelector(".choise_section-player")
  .addEventListener("click", () => {
    document.querySelector(".choise_section").style.display = "none";
    document.querySelector("main").style.display = "block";
    updateScoreDisplay();
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
        updateScoreDisplay();
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
      updateScoreDisplay();
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
        localStorage.setItem("winCount", 0);
        localStorage.setItem("tieCount", 0);
        localStorage.setItem("cpuCount", 0);
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

document.addEventListener("DOMContentLoaded", updateScoreDisplay);
