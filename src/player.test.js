import { Player } from './player.js';

describe('Player', () => {
    let player;

    beforeEach(() => {
        player = new Player();
    });

    test('should create a player with a gameboard', () => {
        expect(player.gameboard).toBeDefined();
        expect(player.gameboard.board.length).toBe(10);
        expect(player.gameboard.board[0].length).toBe(10);
    });

    test('getRandomAttack returns coordinates within board limits', () => {
        const [x, y] = player.getRandomAttack();
        expect(x).toBeGreaterThanOrEqual(0);
        expect(x).toBeLessThan(10);
        expect(y).toBeGreaterThanOrEqual(0);
        expect(y).toBeLessThan(10);
    });

    test('getRandomAttack does not return a previously attacked coordinate', () => {
        // Simulate some missed and hit shots
        player.gameboard.missedShots.push([2, 3]);
        player.gameboard.hitShots.push([4, 5]);

        // Call it a few times to verify it avoids those
        for (let i = 0; i < 10; i++) {
            const [x, y] = player.getRandomAttack();
            expect((x === 2 && y === 3)).toBe(false);
            expect((x === 4 && y === 5)).toBe(false);
        }
    });

    test('getRandomAttack eventually returns a fresh spot if nearly full board is used', () => {
        // Fill up all but one spot
        for (let i = 0; i < 10; i++) {
            for (let j = 0; j < 10; j++) {
                if (!(i === 9 && j === 9)) {
                    player.gameboard.missedShots.push([i, j]);
                }
            }
        }

        const [x, y] = player.getRandomAttack();
        expect(x).toBe(9);
        expect(y).toBe(9);
    });
});
