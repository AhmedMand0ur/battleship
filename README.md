# 🛳️ Battleship Game

This is a classic **Battleship** game built using **HTML**, **CSS**, and **JavaScript** as part of the learning journey through [The Odin Project](https://www.theodinproject.com/). It emphasizes **modular JavaScript**, **DOM manipulation**, and **unit testing with Jest**.

## 📚 About

The game allows a player to:
- Place their ships onto a 10x10 grid.
- Play against a basic AI that randomly attacks the player's grid.
- Restart the game and reset the board.
- Enjoy a clean and modern UI designed for a great experience.

This project was a great way to practice:
- JavaScript classes and modularization.
- DOM interaction and game flow management.
- Writing unit tests with **Jest**.
- Handling edge cases like valid ship placement and preventing duplicate attacks.

## 🎮 Features

- 🔁 Resettable game board.
- 🎯 Visual indicators for hits and misses.
- ⚙️ AI opponent with random attack logic.
- 🧪 Fully tested core logic (Gameboard, Ship, Player).


## 🧱 Technologies Used

- JavaScript (ES6 Modules)
- HTML5
- CSS3
- Webpack
- ESLint
- Jest

## 🧪 Testing

This project uses **Jest** for unit testing. You can run the test suite using:

```bash
npm install
npm run test
```

## 📁 File Structure

```
src/
├── index.js             # Entry point
├── ship.js              # Ship class
├── gameboard.js         # Gameboard logic
├── player.js            # Player and AI logic
├── gameLoop.js          # Game flow management
├── dom.js               # UI rendering and DOM interactions
├── template.html        # HTML template
├── styles.css           # Styling
├── __tests__/           # Jest test files
│   ├── ship.test.js
│   └── gameboard.test.js
```

## 🚀 Getting Started

1. Clone the repo:
   ```bash
   git clone https://github.com/AhmedMand0ur/battleship.git
   cd battleship-game
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   ```

4. Build for production:
   ```bash
   npm run build
   ```



## 🧠 What I Learned

- Implementing object-oriented programming in JavaScript.
- Separating concerns using modules.
- Writing effective unit tests with Jest.
- Using Webpack for bundling JavaScript projects.
- Handling user input and game state transitions.

## ✅ To-Do (Optional Enhancements)

- Add animations and sound effects.
- Add multiplayer support (local or online).
- Implement difficulty levels.

## 👨‍💻 Author

Made with ❤️ while learning through [The Odin Project](https://www.theodinproject.com/).

---

> “You sunk my battleship!” – Not you (hopefully 😉)
