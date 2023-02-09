let xScore = 0;
let oScore = 0;
let currentPlayer = "X";

const cells = document.querySelectorAll(".cell");
const result = document.querySelector("#result");
const score = document.querySelector("#score");
const xScoreDisplay = document.querySelector("#x-score");
const oScoreDisplay = document.querySelector("#o-score");
const restart = document.querySelector("#restart");

for (let i = 0; i < cells.length; i++) {
  cells[i].addEventListener("click", handleClick);
}

function handleClick(e) {
  const cell = e.target;
  cell.innerHTML = currentPlayer;
  cell.removeEventListener("click", handleClick);
  checkWinner();
}

function checkWinner() {
  const combinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];

  for (let i = 0; i < combinations.length; i++) {
    const [a, b, c] = combinations[i];
    if (
      cells[a].innerHTML === currentPlayer &&
      cells[b].innerHTML === currentPlayer &&
      cells[c].innerHTML === currentPlayer
    ) {
      result.style.display = "flex";
      result.innerHTML = `Jogador ${currentPlayer} Ganhou!`;
      updateScore();
      return;
    }
  }

  let isDraw = true;
  for (let i = 0; i < cells.length; i++) {
    if (cells[i].innerHTML === "") {
      isDraw = false;
      break;
    }
  }

  if (isDraw) {
    result.style.display = "flex";
    result.innerHTML = "Deu Empate!";
    return;
  }

  switchPlayer();
}

function switchPlayer() {
  currentPlayer = currentPlayer === "X" ? "O" : "X";
}

function updateScore() {
  if (currentPlayer === "X") {
    xScore++;
    xScoreDisplay.innerHTML = xScore;
  } else {
    oScore++;
    oScoreDisplay.innerHTML = oScore;
  }
}

restart.addEventListener("click", reset);

function reset() {
  result.style.display = "none";
  result.innerHTML = "";

  for (let i = 0; i < cells.length; i++) {
    cells[i].innerHTML = "";
    cells[i].addEventListener("click", handleClick);
  }

  currentPlayer = "X";
}
