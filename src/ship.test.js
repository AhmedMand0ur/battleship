// ship.test.js
import { Ship } from "./ship.js";

test("initializes with correct name and length", () => {
    const ship = new Ship("Destroyer", 2);
    expect(ship.name).toBe("Destroyer");
    expect(ship.length).toBe(2);
    expect(ship.hits).toBe(0);
});

test("registers hits correctly", () => {
    const ship = new Ship("Cruiser", 3);
    ship.hit();
    expect(ship.hits).toBe(1);
    ship.hit();
    expect(ship.hits).toBe(2);
});

test("isSunk returns false if not fully hit", () => {
    const ship = new Ship("Submarine", 3);
    ship.hit();
    ship.hit();
    expect(ship.isSunk()).toBe(false);
});

test("isSunk returns true if fully hit", () => {
    const ship = new Ship("Battleship", 4);
    for (let i = 0; i < 4; i++) {
        ship.hit();
    }
    expect(ship.isSunk()).toBe(true);
});

test("isSunk returns true if hits exceed length", () => {
    const ship = new Ship("Carrier", 5);
    for (let i = 0; i < 6; i++) {
        ship.hit(); // overkill!
    }
    expect(ship.isSunk()).toBe(true);
});
