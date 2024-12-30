/* script.js */
const cells = document.querySelectorAll("[data-cell]");
const winningMessage = document.getElementById("winning-message");
const winningText = document.getElementById("winning-text");
const restartButton = document.getElementById("restart-button");

let isCircleTurn = false;

const WINNING_COMBINATIONS = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];

function startGame() {
    isCircleTurn = false;
    cells.forEach(cell => {
        cell.classList.remove("x");
        cell.classList.remove("circle");
        cell.classList.remove("taken");
        cell.removeEventListener("click", handleClick);
        cell.addEventListener("click", handleClick, { once: true });
    });
    winningMessage.classList.add("hide");
}

function handleClick(e) {
    const cell = e.target;
    const currentClass = isCircleTurn ? "circle" : "x";
    placeMark(cell, currentClass);

    if (checkWin(currentClass)) {
        endGame(false);
    } else if (isDraw()) {
        endGame(true);
    } else {
        swapTurns();
    }
}

function placeMark(cell, currentClass) {
    cell.classList.add(currentClass);
    cell.classList.add("taken");
}

function swapTurns() {
    isCircleTurn = !isCircleTurn;
}

function checkWin(currentClass) {
    return WINNING_COMBINATIONS.some(combination => {
        return combination.every(index => {
            return cells[index].classList.contains(currentClass);
        });
    });
}

function isDraw() {
    return [...cells].every(cell => {
        return cell.classList.contains("x") || cell.classList.contains("circle");
    });
}

function endGame(draw) {
    if (draw) {
        winningText.textContent = "It's a Draw!";
    } else {
        winningText.textContent = isCircleTurn ? "O Wins!" : "X Wins!";
    }
    winningMessage.classList.remove("hide");
}

restartButton.addEventListener("click", startGame);

startGame();
