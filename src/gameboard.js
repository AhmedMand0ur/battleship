import { Ship } from "./ship.js";

export class Gameboard {
    constructor() {
        this.board = Array.from({ length: 10 }, () => Array(10).fill(null));

        this.carrier = new Ship("Carrier", 5);
        this.battleship = new Ship("Battleship", 4);
        this.cruiser = new Ship("Cruiser", 3);
        this.submarine = new Ship("Submarine", 3);
        this.destroyer = new Ship("Destroyer", 2);

        this.ships = [
            this.carrier,
            this.battleship,
            this.cruiser,
            this.submarine,
            this.destroyer,
        ];
        this.missedShots = [];
        this.hitShots = [];
    }

    getNextShipToPlace() {
        return this.ships.find((ship) => !this.isShipPlaced(ship));
    }

    isShipPlaced(ship) {
        for (let i = 0; i < this.board.length; i++) {
            for (let j = 0; j < this.board[i].length; j++) {
                if (this.board[i][j] === ship) return true;
            }
        }
        return false;
    }

    areAllShipsPlaced() {
        return this.ships.every((ship) => this.isShipPlaced(ship));
    }

    // Not sure if variable placed is useful or not ?!
    placeShipsRandomly() {
        this.ships.forEach((ship) => {
            let placed = false;
            while (!placed) {
                const x = Math.floor(Math.random() * 10);
                const y = Math.floor(Math.random() * 10);
                // here we treat 0 as vertical, 1 as horizontal
                const orientation = Math.random() > 0.5 ? 0 : 1;
                if (this.placeShip(ship, x, y, orientation)) placed = true;
            }
        });
    }

    placeShip(ship, posX, posY, orientation) {
        // orientation: 0 = Vertical, 1 = Horizontal
        if (orientation === 0 && posX + ship.length > this.board.length) return false;
        if (orientation === 1 && posY + ship.length > this.board[0].length) return false;

        for (let i = 0; i < ship.length; i++) {
            if (orientation === 0 && this.board[posX + i][posY] !== null) return false;
            if (orientation === 1 && this.board[posX][posY + i] !== null) return false;
        }

        for (let i = 0; i < ship.length; i++) {
            if (orientation === 0) {
                this.board[posX + i][posY] = ship;
            } else {
                this.board[posX][posY + i] = ship;
            }
        }
        return true;
    }

    receiveAttack(posX, posY) {
        const target = this.board[posX][posY];
        if (target !== null) {
            target.hit();
            this.hitShots.push([posX, posY]);
            return true;
        } else {
            this.missedShots.push([posX, posY]);
            return false;
        }
    }

    areAllShipsSunk() {
        return this.ships.every((ship) => ship.isSunk());
    }

    resetBoard() {
        this.board = Array.from({ length: 10 }, () => Array(10).fill(null));
        this.missedShots = [];
        this.hitShots = [];

        this.ships.forEach((ship) => {
            ship.hits = 0;
        });
    }
}
