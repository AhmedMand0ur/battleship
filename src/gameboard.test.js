import { Gameboard } from './gameboard.js';
import { Ship } from './ship.js';

describe('Gameboard', () => {
    let board;

    beforeEach(() => {
        board = new Gameboard();
    });

    test('initializes an empty board', () => {
        expect(board.board.length).toBe(10);
        expect(board.board[0].length).toBe(10);
        expect(board.board.flat().every(cell => cell === null)).toBe(true);
    });

    test('places ship vertically', () => {
        const ship = new Ship('TestShip', 3);
        const placed = board.placeShip(ship, 0, 0, 0); // vertical
        expect(placed).toBe(true);
        expect(board.board[0][0]).toBe(ship);
        expect(board.board[1][0]).toBe(ship);
        expect(board.board[2][0]).toBe(ship);
    });

    test('places ship horizontally', () => {
        const ship = new Ship('TestShip', 3);
        const placed = board.placeShip(ship, 0, 0, 1); // horizontal
        expect(placed).toBe(true);
        expect(board.board[0][0]).toBe(ship);
        expect(board.board[0][1]).toBe(ship);
        expect(board.board[0][2]).toBe(ship);
    });

    test('prevents overlapping ships', () => {
        const ship1 = new Ship('Ship1', 3);
        const ship2 = new Ship('Ship2', 3);
        board.placeShip(ship1, 0, 0, 0);
        const placed = board.placeShip(ship2, 0, 0, 0);
        expect(placed).toBe(false);
    });

    test('registers a hit', () => {
        const ship = new Ship('TestShip', 1);
        board.placeShip(ship, 0, 0, 0);
        const result = board.receiveAttack(0, 0);
        expect(result).toBe(true);
        expect(ship.hits).toBe(1);
        expect(board.hitShots).toContainEqual([0, 0]);
    });

    test('registers a miss', () => {
        const result = board.receiveAttack(5, 5);
        expect(result).toBe(false);
        expect(board.missedShots).toContainEqual([5, 5]);
    });

    test('resets the board properly', () => {
        board.placeShip(board.carrier, 0, 0, 0);
        board.receiveAttack(0, 0);
        board.resetBoard();
        expect(board.board.flat().every(cell => cell === null)).toBe(true);
        expect(board.hitShots.length).toBe(0);
        expect(board.missedShots.length).toBe(0);
        expect(board.carrier.hits).toBe(0);
    });

    test('detects all ships sunk', () => {
        board.ships.forEach((ship, index) => {
            board.placeShip(ship, index, 0, 1);
            for (let i = 0; i < ship.length; i++) {
                board.receiveAttack(index, i);
            }
        });
        expect(board.areAllShipsSunk()).toBe(true);
    });
});
