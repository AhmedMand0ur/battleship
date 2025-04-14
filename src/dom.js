import { gameLoop } from "./gameLoop.js";

export let currentOrientation = 0; // 0 = Vertical, 1 = Horizontal
let gameStarted = false;


export function resetGameStartedFlag() {
    gameStarted = false;
}


export function createBoard(gameboardElement, isPlayerBoard = false) {
    gameboardElement.innerHTML = "";
    for (let i = 0; i < 10; i++) {
        for (let j = 0; j < 10; j++) {
            const cell = document.createElement("div");
            cell.classList.add("cell");
            cell.dataset.x = i;
            cell.dataset.y = j;
            gameboardElement.appendChild(cell);
            if (isPlayerBoard) {
                cell.addEventListener("click", () => {
                    if (gameStarted) return;
                    placeShipOnBoard(i, j);
                });
            }
        }
    }
}

function placeShipOnBoard(x, y) {
    const playerGameboard = gameLoop.player1.gameboard;
    if (playerGameboard.areAllShipsPlaced()) {
        alert("All ships have been placed.");
        return;
    }
    const shipToPlace = playerGameboard.getNextShipToPlace();
    if (playerGameboard.placeShip(shipToPlace, x, y, currentOrientation)) {
        for (let i = 0; i < shipToPlace.length; i++) {
            const cell = document.querySelector(
                `#player-board .cell[data-x='${currentOrientation === 0 ? x + i : x}'][data-y='${currentOrientation === 1 ? y + i : y}']`
            );
            if (cell) cell.classList.add("ship");
        }
        updateShipUI();
        if (playerGameboard.areAllShipsPlaced()) {
            gameLoop.player2.gameboard.placeShipsRandomly();
            gameStarted = true;
            gameLoop.updateMessage("Your Turn");
        }
    } else {
        alert("Invalid ship placement!");
    }
}

export function updateShipUI() {
    const shipsContainer = document.getElementById("ships-container");
    if (!shipsContainer) return;
    // Preserve container size by always rendering five ship entries (even if placed)
    shipsContainer.innerHTML = "";
    gameLoop.player1.gameboard.ships.forEach((ship) => {
        const shipEntry = document.createElement("div");
        shipEntry.classList.add("ship-entry");
        const nameDiv = document.createElement("div");
        nameDiv.classList.add("ship-name");
        nameDiv.textContent = ship.name;
        shipEntry.appendChild(nameDiv);
        if (!gameLoop.player1.gameboard.isShipPlaced(ship)) {
            const previewContainer = document.createElement("div");
            previewContainer.classList.add("ship-preview-container");
            // Always show preview horizontally in shipyard
            for (let i = 0; i < ship.length; i++) {
                const cell = document.createElement("div");
                cell.classList.add("cell", "ship-preview");
                previewContainer.appendChild(cell);
            }
            shipEntry.appendChild(previewContainer);
        }
        shipsContainer.appendChild(shipEntry);
    });
}



export function setupBoardClickHandlers() {
    let enemyBoardElement = document.getElementById("enemy-board");
    createBoard(document.getElementById("player-board"), true);
    createBoard(enemyBoardElement);
    updateShipUI();
    enemyBoardElement.addEventListener("click", (event) => {
        if (!gameStarted) return;
        if (event.target.classList.contains("cell")) {
            const x = parseInt(event.target.dataset.x, 10);
            const y = parseInt(event.target.dataset.y, 10);
            gameLoop.handlePlayerMove(x, y);
        }
    });
}

export function setupOrientationToggle() {
    const toggleButton = document.getElementById("toggle-orientation");
    const orientationMsg = document.getElementById("orientation-message");
    toggleButton.addEventListener("click", () => {
        // Toggle: 0 means Vertical; 1 means Horizontal.
        currentOrientation = currentOrientation === 0 ? 1 : 0;
        orientationMsg.textContent = `Orientation: ${currentOrientation === 0 ? "Vertical" : "Horizontal"}`;
    });
}
