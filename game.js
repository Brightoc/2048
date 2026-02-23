// game.js

// Constants
const SIZE = 4; // Board size
const START_TILES = 2; // Number of tiles to start with
const WINNING_TILE = 2048; // Tile value to win

let board = [];
let score = 0;
let isGameOver = false;

// Initialize the game
function initGame() {
    board = createEmptyBoard();
    for (let i = 0; i < START_TILES; i++) {
        addRandomTile();
    }
    score = 0;
    isGameOver = false;
    render();
}

// Create an empty board
function createEmptyBoard() {
    return Array.from({ length: SIZE }, () => Array(SIZE).fill(0));
}

// Add a random tile (2 or 4) to the board
function addRandomTile() {
    let emptyTiles = [];
    for (let r = 0; r < SIZE; r++) {
        for (let c = 0; c < SIZE; c++) {
            if (board[r][c] === 0) {
                emptyTiles.push({ r, c });
            }
        }
    }
    if (emptyTiles.length > 0) {
        let { r, c } = emptyTiles[Math.floor(Math.random() * emptyTiles.length)];
        board[r][c] = Math.random() < 0.9 ? 2 : 4;
    }
}

// Handle user input
document.addEventListener('keydown', handleKey);
function handleKey(event) {
    if (isGameOver) return;
    switch (event.key) {
        case 'ArrowUp':
            moveUp();
            break;
        case 'ArrowDown':
            moveDown();
            break;
        case 'ArrowLeft':
            moveLeft();
            break;
        case 'ArrowRight':
            moveRight();
            break;
    }
    addRandomTile();
    if (checkWin()) {
        alert("You win!");
        isGameOver = true;
    }
    if (checkLose()) {
        alert("Game over!");
        isGameOver = true;
    }
    render();
}

// Render board to the screen (simple text representation for now)
function render() {
    console.clear();
    console.log(`Score: ${score}`);
    board.forEach(row => console.log(row.join(' | ')));
}

// Movement, merging and score tracking functionality
function moveUp() { /* Movement logic */ }
function moveDown() { /* Movement logic */ }
function moveLeft() { /* Movement logic */ }
function moveRight() { /* Movement logic */ }

// Check for win condition
function checkWin() {
    return board.some(row => row.includes(WINNING_TILE));
}

// Check for lose condition
function checkLose() {
    return board.every(row => !row.includes(0) && !canMerge());
}

// Check if a move can be made
function canMerge() {
    for (let r = 0; r < SIZE; r++) {
        for (let c = 0; c < SIZE; c++) {
            if (c < SIZE - 1 && board[r][c] === board[r][c + 1]) return true;
            if (r < SIZE - 1 && board[r][c] === board[r + 1][c]) return true;
        }
    }
    return false;
}

// Restart the game functionality
function restartGame() {
    initGame();
}

// Initialize the game when the script loads
initGame();