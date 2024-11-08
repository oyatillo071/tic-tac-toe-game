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
  console.log(tieCount);
  tieCount++;

  localStorage.setItem("tieCount", tieCount);
  updateScoreDisplay();
  console.log(tieCount);
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
function hoverUpdateBtns() {
  return Array.from(document.querySelectorAll(".empty"));
}

function hoverEffect(isXTurn) {
  let gameFreeButtonsHover = hoverUpdateBtns();

  gameFreeButtonsHover.forEach((element) => {
    if (isXTurn) {
      element.classList.remove("isHoverX");
      element.classList.add("isHoverOval");
    } else {
      element.classList.remove("isHoverOval");
      element.classList.add("isHoverX");
    }
  });

  gameButtons.forEach((element) => {
    if (
      element.classList.contains("activeOval") ||
      element.classList.contains("activeX")
    ) {
      element.classList.remove("isHoverX");
      element.classList.remove("isHoverOval");
    }
  });
}
//

//
function cpuRandomTurn(isXTurn) {
  let btns = updateFreeButtons();
  let randIndex = Math.trunc(Math.random() * btns.length);

  btns[randIndex].classList.remove("empty");
  if (isXTurn) {
    btns[
      randIndex
    ].innerHTML = `<img src="./images/xOnClick.svg" width="64" height="64" alt="x">`;
    btns[randIndex].classList.add("activeX");
    turnImg.setAttribute("src", "./images/turn-oval.svg");
    isXTurn = false;
    hoverEffect(!isXTurn);
  } else {
    btns[
      randIndex
    ].innerHTML = `<img src="./images/orange-oval.svg" alt="oval">`;
    btns[randIndex].classList.add("activeOval");
    turnImg.setAttribute("src", "./images/nav-x.svg");
    isXTurn = true;
    hoverEffect(!isXTurn);
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

function whoWinGame(winSide) {
  let winnerClass = winSide == "x" ? "activeX" : "activeOval";

  winPatterns.forEach((pattern) => {
    if (
      pattern.every((index) =>
        gameButtonsArr[index].classList.contains(winnerClass)
      )
    ) {
      // Add the winning class to each button in the winning pattern
      pattern.forEach((index) => {
        gameButtonsArr[index].classList.add("winClassForLine");
      });
    }
  });
}

function checkWin(playerClass) {
  const hasWon = winPatterns.some((pattern) =>
    pattern.every((index) =>
      gameButtonsArr[index].classList.contains(playerClass)
    )
  );

  if (hasWon) {
    document.querySelector(".result_modal").style.display = "block";
    let res = "";
    let line = "";
    if (playerClass == "activeX") {
      increaseWinCount();
      res = "./images/blue-x.svg";
      line = "x";
    } else if (playerClass == "activeOval") {
      increaseCpuCount();
      line = "o";
      res = "./images/orange-oval.svg";
    }

    whoWinGame(line);
    document.querySelector(".won-side").setAttribute("src", res);
    return true;
  }
  return false;
}
updateScoreDisplay();

let tieChecked = false;
function isEndGame() {
  if (!tieChecked) {
    const isFull = Array.from(gameButtons).every((button) => {
      return !button.classList.contains("empty");
    });

    if (isFull && !checkWin("activeX") && !checkWin("activeOval")) {
      document.querySelector(".tied_modal").style.display = "block";
      increaseTieCount();
      tieChecked = true;
    }
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
    userChoise == "x" ? hoverEffect(true) : hoverEffect(false);
  });

// cpu
document.querySelector(".choise_section-cpu").addEventListener("click", () => {
  if (userChoise == "") {
    userChoise = "o";
  }

  document.querySelector(".choise_section").style.display = "none";
  document.querySelector("main").style.display = "block";
  withCpu = true;
  if (userChoise == "o") {
    cpuRandomTurn(true);
    isXTurn = false;
  }
  hoverEffect(!isXTurn);
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
      userChoise == "x" ? hoverEffect(false) : hoverEffect(true);

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
        hoverEffect(!isXTurn);
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

console.log(userChoise);
// isXWon();

gameButtons.forEach((button) => {
  button.addEventListener("click", function () {
    checkWin("activeX");
    checkWin("activeOval");
    isEndGame();
  });
});

function resetGameBoard() {
  gameButtons.forEach((button) => {
    button.classList.remove(
      "activeX",
      "activeOval",
      "empty",
      "winClassForLine"
    );
    button.innerHTML = "";
    button.classList.add("empty");
  });

  isXTurn = userChoise == "x";
  tieChecked = false;

  updateScoreDisplay();

  document.querySelector(".result_modal").style.display = "none";
  document.querySelector(".tied_modal").style.display = "none";

  if (withCpu && userChoise == "o") {
    cpuRandomTurn(true);
    turnImg.setAttribute("src", "./images/turn-oval.svg");
    isXTurn = false;
  } else if (!withCpu) {
    turnImg.setAttribute("src", "./images/nav-x.svg");
    isXTurn = true;
  }

  hoverEffect(!isXTurn);
}

document
  .querySelector(".restart-btn")
  .addEventListener("click", resetGameBoard);
const nextRaund = document.querySelectorAll(".result_modal-next");

nextRaund.forEach((element) => {
  element.addEventListener("click", resetGameBoard);
});

document.addEventListener("DOMContentLoaded", updateScoreDisplay);

let quitBtns = document.querySelectorAll(".result_modal-quit");
quitBtns.forEach((element) => {
  element.addEventListener("click", () => {
    localStorage.clear();
  });
});
