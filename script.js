// Game variables
let board = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let gameMode = "";

// Winning combinations
const winningCombinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

// Start the game
function startGame(mode) {
  board = ["", "", "", "", "", "", "", "", ""];
  currentPlayer = "X";
  gameMode = mode;
  document.getElementById(
    "message"
  ).innerText = `Player ${currentPlayer}'s turn`;
  renderBoard();
}

// Handle player move
function handleMove(event) {
  const cellIndex = event.target.dataset.cell;
  if (board[cellIndex] === "" && !checkWinner()) {
    board[cellIndex] = currentPlayer;
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    document.getElementById(
      "message"
    ).innerText = `Player ${currentPlayer}'s turn`;
    renderBoard();

    if (gameMode === "pvai" && currentPlayer === "O") {
      setTimeout(makeAIMove, 500); // Delay AI move for better user experience
    }
  }
}

// AI makes a move (random)
function makeAIMove() {
  const emptyCells = board.reduce((acc, cell, index) => {
    if (cell === "") acc.push(index);
    return acc;
  }, []);

  const randomIndex = Math.floor(Math.random() * emptyCells.length);
  board[emptyCells[randomIndex]] = "O";
  currentPlayer = "X";
  document.getElementById(
    "message"
  ).innerText = `Player ${currentPlayer}'s turn`;
  renderBoard();
  checkWinner();
}

// Check for a winner
function checkWinner() {
  for (const [a, b, c] of winningCombinations) {
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      document.getElementById("message").innerText = `Player ${board[a]} wins!`;
      return true;
    }
  }

  if (!board.includes("")) {
    document.getElementById("message").innerText = "It's a draw!";
    return true;
  }

  return false;
}

// Render the game board
function renderBoard() {
  const boardElement = document.querySelector(".board");
  boardElement.innerHTML = "";
  board.forEach((cell, index) => {
    const cellElement = document.createElement("div");
    cellElement.classList.add("cell");
    cellElement.dataset.cell = index;
    cellElement.innerText = cell;
    boardElement.appendChild(cellElement);
  });
}

startGame("pvp");
