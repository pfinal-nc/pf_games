// 俄罗斯方块核心逻辑
const ROWS = 20;
const COLS = 10;
const COLORS = [
    '#eee4da', '#f2b179', '#f59563', '#f67c5f', '#f65e3b', '#edcf72', '#edc850', '#edc53f', '#edc22e',
    '#a9d18e', '#6fa8dc', '#8e7cc3', '#e06666', '#ffd966', '#93c47d', '#76a5af'
];
const SHAPES = [
    // I
    [[1, 1, 1, 1]],
    // J
    [[1, 0, 0], [1, 1, 1]],
    // L
    [[0, 0, 1], [1, 1, 1]],
    // O
    [[1, 1], [1, 1]],
    // S
    [[0, 1, 1], [1, 1, 0]],
    // T
    [[0, 1, 0], [1, 1, 1]],
    // Z
    [[1, 1, 0], [0, 1, 1]]
];

let board, current, currentX, currentY, currentShape, currentColor, score, highScore, timer, gameOver;

function randomShape() {
    const idx = Math.floor(Math.random() * SHAPES.length);
    return {
        shape: SHAPES[idx],
        color: COLORS[idx % COLORS.length]
    };
}

function initBoard() {
    board = Array.from({ length: ROWS }, () => Array(COLS).fill(null));
}

function drawBoard() {
    const gameBoard = document.getElementById('game-board');
    gameBoard.innerHTML = '';
    for (let y = 0; y < ROWS; y++) {
        for (let x = 0; x < COLS; x++) {
            const cell = document.createElement('div');
            cell.className = 'cell';
            if (board[y][x]) {
                const block = document.createElement('div');
                block.className = 'block';
                block.style.background = board[y][x];
                cell.appendChild(block);
            }
            gameBoard.appendChild(cell);
        }
    }
    // 绘制当前下落方块
    if (current) {
        for (let y = 0; y < current.shape.length; y++) {
            for (let x = 0; x < current.shape[y].length; x++) {
                if (current.shape[y][x]) {
                    const idx = (currentY + y) * COLS + (currentX + x);
                    if (currentY + y >= 0 && idx >= 0 && idx < ROWS * COLS) {
                        const cell = gameBoard.children[idx];
                        if (cell) {
                            const block = document.createElement('div');
                            block.className = 'block';
                            block.style.background = current.color;
                            cell.appendChild(block);
                        }
                    }
                }
            }
        }
    }
}

function canMove(shape, x, y) {
    for (let i = 0; i < shape.length; i++) {
        for (let j = 0; j < shape[i].length; j++) {
            if (shape[i][j]) {
                let nx = x + j;
                let ny = y + i;
                if (nx < 0 || nx >= COLS || ny >= ROWS) return false;
                if (ny >= 0 && board[ny][nx]) return false;
            }
        }
    }
    return true;
}

function merge() {
    for (let y = 0; y < current.shape.length; y++) {
        for (let x = 0; x < current.shape[y].length; x++) {
            if (current.shape[y][x]) {
                let nx = currentX + x;
                let ny = currentY + y;
                if (ny >= 0) board[ny][nx] = current.color;
            }
        }
    }
}

function clearLines() {
    let lines = 0;
    for (let y = ROWS - 1; y >= 0; y--) {
        if (board[y].every(cell => cell)) {
            board.splice(y, 1);
            board.unshift(Array(COLS).fill(null));
            lines++;
            y++;
        }
    }
    if (lines > 0) {
        score += lines * 100;
        if (score > highScore) {
            highScore = score;
            localStorage.setItem('tetris_high_score', highScore);
        }
        updateScore();
    }
}

function rotate(shape) {
    const rows = shape.length, cols = shape[0].length;
    let newShape = Array.from({ length: cols }, () => Array(rows).fill(0));
    for (let y = 0; y < rows; y++)
        for (let x = 0; x < cols; x++)
            newShape[x][rows - 1 - y] = shape[y][x];
    return newShape;
}

function drop() {
    if (canMove(current.shape, currentX, currentY + 1)) {
        currentY++;
    } else {
        merge();
        clearLines();
        spawn();
        if (!canMove(current.shape, currentX, currentY)) {
            endGame();
            return;
        }
    }
    drawBoard();
}

function move(dx) {
    if (canMove(current.shape, currentX + dx, currentY)) {
        currentX += dx;
        drawBoard();
    }
}

function hardDrop() {
    while (canMove(current.shape, currentX, currentY + 1)) {
        currentY++;
    }
    drop();
}

function rotateCurrent() {
    const rotated = rotate(current.shape);
    if (canMove(rotated, currentX, currentY)) {
        current.shape = rotated;
        drawBoard();
    }
}

function spawn() {
    const { shape, color } = randomShape();
    current = { shape: shape, color: color };
    currentX = Math.floor((COLS - shape[0].length) / 2);
    currentY = -shape.length + 1;
}

function updateScore() {
    document.getElementById('score').textContent = score;
    document.getElementById('high-score').textContent = highScore;
}

function gameLoop() {
    if (!gameOver) {
        drop();
        timer = setTimeout(gameLoop, 500);
    }
}

function endGame() {
    gameOver = true;
    clearTimeout(timer);
    document.getElementById('final-score').textContent = score;
    document.getElementById('win-modal').style.display = 'flex';
}

function restartGame() {
    clearTimeout(timer);
    score = 0;
    highScore = parseInt(localStorage.getItem('tetris_high_score') || '0');
    gameOver = false;
    initBoard();
    spawn();
    updateScore();
    drawBoard();
    document.getElementById('win-modal').style.display = 'none';
    gameLoop();
}

document.addEventListener('keydown', function (e) {
    if (gameOver) return;
    if (e.key === 'ArrowLeft') move(-1);
    else if (e.key === 'ArrowRight') move(1);
    else if (e.key === 'ArrowDown') drop();
    else if (e.key === 'ArrowUp') rotateCurrent();
    else if (e.key === ' ') hardDrop();
});

window.onload = restartGame; 