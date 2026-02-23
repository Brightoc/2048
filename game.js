// Game logic for 2048

class Game2048 {
    constructor(size = 4) {
        this.size = size;
        this.board = this.createBoard();
        this.score = 0;
        this.isGameOver = false;
    }

    createBoard() {
        let board = Array.from({length: this.size}, () => Array(this.size).fill(0));
        this.addRandomTile(board);
        this.addRandomTile(board);
        return board;
    }

    addRandomTile(board) {
        let emptyTiles = [];
        for (let r = 0; r < this.size; r++) {
            for (let c = 0; c < this.size; c++) {
                if (board[r][c] === 0) {
                    emptyTiles.push({r, c});
                }
            }
        }
        const {r, c} = emptyTiles[Math.floor(Math.random() * emptyTiles.length)];
        board[r][c] = Math.random() < 0.9 ? 2 : 4;
    }

    move(direction) {
        if (this.isGameOver) return;
        let moved = false;
        switch (direction) {
            case 'up':
                moved = this.moveUp();
                break;
            case 'down':
                moved = this.moveDown();
                break;
            case 'left':
                moved = this.moveLeft();
                break;
            case 'right':
                moved = this.moveRight();
                break;
        }
        if (moved) {
            this.addRandomTile(this.board);
            this.checkGameOver();
        }
    }

    // Movement functions
    moveUp() { return this.moveTiles((r, c) => [r-1, c], (r, c) => [r, c]); }
    moveDown() { return this.moveTiles((r, c) => [r+1, c], (r, c) => [r, c]); }
    moveLeft() { return this.moveTiles((r, c) => [r, c-1], (r, c) => [r, c]); }
    moveRight() { return this.moveTiles((r, c) => [r, c+1], (r, c) => [r, c]); }

    moveTiles(newPosFunc, currentPosFunc) {
        let moved = false;
        for (let i = 0; i < this.size; i++) {
            let mergedRow = [];
            for (let j = 0; j < this.size; j++) {
                let [r, c] = currentPosFunc(i, j);
                if (this.board[r][c] !== 0) {
                    let newPos = newPosFunc(r, c);
                    if (newPos[0] < 0 || newPos[0] >= this.size || newPos[1] < 0 || newPos[1] >= this.size) continue;
                    while (this.board[newPos[0]] && this.board[newPos[0]][newPos[1]] === 0) {
                        this.board[newPos[0]][newPos[1]] = this.board[r][c];
                        this.board[r][c] = 0;
                        moved = true;
                        r = newPos[0];
                        c = newPos[1];
                        newPos = newPosFunc(r, c);
                    }
                    if (this.board[newPos[0]] && this.board[newPos[0]][newPos[1]] === this.board[r][c] && !mergedRow.includes(newPos[1])) {
                        this.board[newPos[0]][newPos[1]] *= 2;
                        this.score += this.board[newPos[0]][newPos[1]];
                        this.board[r][c] = 0;
                        moved = true;
                        mergedRow.push(newPos[1]);
                    }
                }
            }
        }
        return moved;
    }

    checkGameOver() {
        for (let r = 0; r < this.size; r++) {
            for (let c = 0; c < this.size; c++) {
                if (this.board[r][c] === 0 || 
                    (r < this.size - 1 && this.board[r][c] === this.board[r+1][c]) || 
                    (c < this.size - 1 && this.board[r][c] === this.board[r][c+1])) {
                    return;
                }
            }
        }
        this.isGameOver = true;
    }
}

// Example of creating a game
const game = new Game2048();
console.log(game.board); // Log the initial board

// Use game.move('up') to move tiles up
