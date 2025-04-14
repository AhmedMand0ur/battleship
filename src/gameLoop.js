import { Player } from "./player.js";
import { setupBoardClickHandlers, updateShipUI, resetGameStartedFlag } from "./dom.js";

export const gameLoop = (() => {
    const player1 = new Player();
    const player2 = new Player();
    // eslint-disable-next-line no-unused-vars
    let currentPlayer = player1;
    let gameOver = false;
    let aiTargetQueue = [];
    let playerTurnLocked = false;

    function handlePlayerMove(x, y) {
        if (gameOver || playerTurnLocked || !player1.gameboard.areAllShipsPlaced() || player2.gameboard.missedShots.some(shot => shot[0] === x && shot[1] === y) ||
            player2.gameboard.hitShots.some(shot => shot[0] === x && shot[1] === y)) return;
        const hit = player2.gameboard.receiveAttack(x, y);
        const cell = document.querySelector(`#enemy-board .cell[data-x='${x}'][data-y='${y}']`);
        if (hit) {
            cell.classList.add("hit");
            console.log("Player hit!");
        } else {
            cell.classList.add("miss");
            console.log("Player missed!");
        }
        if (player2.gameboard.areAllShipsSunk()) {
            console.log("Player Wins!");
            gameOver = true;
            updateMessage("You win!");
            return;
        }
        playerTurnLocked = true;
        currentPlayer = player2;
        updateMessage("Computer's Turn");
        handleAIMove();
    }

    function handleAIMove() {
        if (gameOver) return;
        let x, y;
        if (aiTargetQueue.length > 0) {
            const target = aiTargetQueue.shift();
            x = target.x;
            y = target.y;
        } else {
            [x, y] = player1.getRandomAttack();
        }
        const hit = player1.gameboard.receiveAttack(x, y);
        const cell = document.querySelector(`#player-board .cell[data-x='${x}'][data-y='${y}']`);
        if (hit) {
            cell.classList.remove("ship");
            cell.classList.add("ship-damaged");
            console.log(`Computer hit at (${x}, ${y})`);
            const adjacent = [
                { x: x - 1, y },
                { x: x + 1, y },
                { x, y: y - 1 },
                { x, y: y + 1 },
            ];
            adjacent.forEach((coord) => {
                if (
                    coord.x >= 0 &&
                    coord.x < 10 &&
                    coord.y >= 0 &&
                    coord.y < 10 &&
                    !player1.gameboard.missedShots.some((shot) => shot[0] === coord.x && shot[1] === coord.y) &&
                    !player1.gameboard.hitShots.some((shot) => shot[0] === coord.x && shot[1] === coord.y) &&
                    !aiTargetQueue.some((queued) => queued.x === coord.x && queued.y === coord.y)
                ) {
                    aiTargetQueue.push(coord);
                }
            });
        } else {
            cell.classList.add("miss");
            console.log(`Computer missed at (${x}, ${y})`);
        }
        if (player1.gameboard.areAllShipsSunk()) {
            console.log("Computer Wins!");
            gameOver = true;
            updateMessage("Computer Wins!");
            return;
        }
        currentPlayer = player1;
        updateMessage("Your Turn");
        playerTurnLocked = false;
    }

    function updateMessage(text) {
        const messageDiv = document.getElementById("message");
        if (player1.gameboard.areAllShipsPlaced()) {
            messageDiv.textContent = text;
        } else {
            messageDiv.textContent = "Place your ships!";
        }
    }

    document
        .getElementById("reset-button")
        .addEventListener("click", resetGame);

    function resetGame() {
        player1.gameboard.resetBoard();
        player2.gameboard.resetBoard();
        aiTargetQueue = [];
        gameOver = false;
        playerTurnLocked = false;
        currentPlayer = player1;
        document.getElementById("player-board").innerHTML = "";
        document.getElementById("enemy-board").innerHTML = "";
        resetGameStartedFlag();
        setupBoardClickHandlers();
        updateShipUI();
        updateMessage("Place your ships!");
    }

    return {
        handlePlayerMove,
        player1,
        player2,
        updateMessage,
    };
})();
