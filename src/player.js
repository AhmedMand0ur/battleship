import { Gameboard } from "./gameboard.js";

export class Player {
    constructor() {
        this.gameboard = new Gameboard();
    }

    getRandomAttack() {
        let x, y;
        do {
            x = Math.floor(Math.random() * 10);
            y = Math.floor(Math.random() * 10);
        } while (
            this.gameboard.missedShots.some((shot) => shot[0] === x && shot[1] === y) ||
            this.gameboard.hitShots.some((shot) => shot[0] === x && shot[1] === y)
        );
        return [x, y];
    }
}
