const gameBoard = document.getElementById('gameBoard');
const gameStatus = document.getElementById('gameStatus');
const restartButton = document.getElementById('restartButton');
const cells = document.querySelectorAll('[data-cell]');
let currentPlayer = 'X';
let gameState = ["", "", "", "", "", "", "", "", ""];
const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

const handleCellClick = (e) => {
    const cell = e.target;
    const cellIndex = Array.from(cells).indexOf(cell);

    if (gameState[cellIndex] !== "" || checkWin() || checkTie()) {
        return;
    }

    gameState[cellIndex] = currentPlayer;
    cell.textContent = currentPlayer;

    if (checkWin()) {
        gameStatus.textContent = `Player ${currentPlayer} wins!`;
        return;
    }

    if (checkTie()) {
        gameStatus.textContent = "It's a tie!";
        return;
    }

    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    gameStatus.textContent = `Player ${currentPlayer}'s turn`;
};

const checkWin = () => {
    return winningConditions.some(condition => {
        return condition.every(index => {
            return gameState[index] === currentPlayer;
        });
    });
};

const checkTie = () => {
    return gameState.every(cell => cell !== "");
};

const restartGame = () => {
    currentPlayer = 'X';
    gameState = ["", "", "", "", "", "", "", "", ""];
    gameStatus.textContent = `Player ${currentPlayer}'s turn`;
    cells.forEach(cell => cell.textContent = "");
};

cells.forEach(cell => cell.addEventListener('click', handleCellClick));
restartButton.addEventListener('click', restartGame);
