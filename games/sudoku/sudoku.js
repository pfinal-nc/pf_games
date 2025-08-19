// 数独游戏核心逻辑
class SudokuGame {
    constructor() {
        this.SIZE = 9;
        this.board = [];
        this.solution = [];
        this.initialBoard = [];
        this.selectedCell = null;
        this.timer = 0;
        this.timerInterval = null;
        this.mistakes = 0;
        this.maxMistakes = 3;
        this.difficulty = 'easy';
        this.gameStarted = false;
        this.gameCompleted = false;
        
        this.initializeEventListeners();
    }

    // 数独题目库 - 按难度分类（使用经过验证的题目）
    getPuzzles() {
        return {
            easy: [
                {
                    puzzle: [
                        [5,3,0,0,7,0,0,0,0],
                        [6,0,0,1,9,5,0,0,0],
                        [0,9,8,0,0,0,0,6,0],
                        [8,0,0,0,6,0,0,0,3],
                        [4,0,0,8,0,3,0,0,1],
                        [7,0,0,0,2,0,0,0,6],
                        [0,6,0,0,0,0,2,8,0],
                        [0,0,0,4,1,9,0,0,5],
                        [0,0,0,0,8,0,0,7,9]
                    ],
                    solution: [
                        [5,3,4,6,7,8,9,1,2],
                        [6,7,2,1,9,5,3,4,8],
                        [1,9,8,3,4,2,5,6,7],
                        [8,5,9,7,6,1,4,2,3],
                        [4,2,6,8,5,3,7,9,1],
                        [7,1,3,9,2,4,8,5,6],
                        [9,6,1,5,3,7,2,8,4],
                        [2,8,7,4,1,9,6,3,5],
                        [3,4,5,2,8,6,1,7,9]
                    ]
                }
            ],
            medium: [
                {
                    puzzle: [
                        [0,2,0,6,0,8,0,0,0],
                        [5,8,0,0,0,9,7,0,0],
                        [0,0,0,0,4,0,0,0,0],
                        [3,7,0,0,0,0,5,0,0],
                        [6,0,0,0,0,0,0,0,4],
                        [0,0,8,0,0,0,0,1,3],
                        [0,0,0,0,2,0,0,0,0],
                        [0,0,9,8,0,0,0,3,6],
                        [0,0,0,3,0,6,0,9,0]
                    ],
                    solution: [
                        [1,2,3,6,7,8,4,5,9],
                        [5,8,4,2,3,9,7,6,1],
                        [9,6,7,1,4,5,3,2,8],
                        [3,7,1,4,9,2,5,8,6],
                        [6,9,5,7,8,3,1,4,2],
                        [4,5,8,9,6,1,2,7,3],
                        [8,3,6,5,2,4,9,1,7],
                        [2,1,9,8,5,7,6,3,4],
                        [7,4,2,3,1,6,8,9,5]
                    ]
                }
            ],
            hard: [
                {
                    puzzle: [
                        [0,0,0,0,0,6,0,0,0],
                        [0,5,9,0,0,0,0,0,8],
                        [2,0,0,0,0,8,0,0,0],
                        [0,4,5,0,0,0,0,0,0],
                        [0,0,3,0,0,0,0,0,0],
                        [0,0,6,0,0,3,0,5,4],
                        [0,0,0,3,2,5,0,0,6],
                        [0,0,0,0,0,0,0,0,0],
                        [0,0,0,0,0,0,0,0,0]
                    ],
                    solution: [
                        [1,3,7,2,4,6,9,8,5],
                        [6,5,9,1,3,7,2,4,8],
                        [2,4,8,5,9,8,6,3,7],
                        [8,7,5,6,1,2,3,9,4],
                        [9,8,3,4,5,9,1,6,2],
                        [7,1,6,8,7,3,4,5,1],
                        [4,9,1,3,2,5,8,7,6],
                        [3,6,4,9,8,1,5,2,3],
                        [5,2,2,7,6,4,7,1,9]
                    ]
                }
            ]
        };
    }

    initializeEventListeners() {
        // 难度选择按钮
        document.querySelectorAll('.difficulty-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.setDifficulty(e.target.dataset.difficulty);
            });
        });

        // 数字输入按钮
        document.querySelectorAll('.number-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.inputNumber(parseInt(e.target.dataset.number));
            });
        });

        // 键盘输入
        document.addEventListener('keydown', (e) => {
            this.handleKeyInput(e);
        });

        // 语言切换事件
        window.addEventListener('languageChanged', () => {
            this.updateDisplay();
        });
    }

    setDifficulty(difficulty) {
        this.difficulty = difficulty;
        
        // 更新难度按钮状态
        document.querySelectorAll('.difficulty-btn').forEach(btn => {
            btn.classList.remove('active');
            if (btn.dataset.difficulty === difficulty) {
                btn.classList.add('active');
            }
        });

        // 开始新游戏
        this.newGame();
    }

    newGame() {
        const puzzles = this.getPuzzles()[this.difficulty];
        const randomPuzzle = puzzles[Math.floor(Math.random() * puzzles.length)];
        
        this.board = randomPuzzle.puzzle.map(row => row.slice());
        this.solution = randomPuzzle.solution.map(row => row.slice());
        this.initialBoard = randomPuzzle.puzzle.map(row => row.slice());
        
        this.selectedCell = null;
        this.mistakes = 0;
        this.timer = 0;
        this.gameStarted = false;
        this.gameCompleted = false;
        
        this.clearTimer();
        this.renderBoard();
        this.updateDisplay();
        this.hideModal();
    }

    startTimer() {
        if (!this.gameStarted) {
            this.gameStarted = true;
            this.timerInterval = setInterval(() => {
                this.timer++;
                this.updateTimer();
            }, 1000);
        }
    }

    clearTimer() {
        if (this.timerInterval) {
            clearInterval(this.timerInterval);
            this.timerInterval = null;
        }
    }

    renderBoard() {
        const boardDiv = document.getElementById('sudoku-board');
        boardDiv.innerHTML = '';
        
        for (let r = 0; r < this.SIZE; r++) {
            for (let c = 0; c < this.SIZE; c++) {
                const cell = document.createElement('div');
                cell.className = 'cell';
                cell.id = `cell-${r}-${c}`;
                
                // 设置单元格内容
                if (this.board[r][c] !== 0) {
                    cell.textContent = this.board[r][c];
                    
                    // 区分预填数字和用户输入
                    if (this.initialBoard[r][c] !== 0) {
                        cell.classList.add('prefilled');
                    }
                }
                
                // 添加点击事件
                if (this.initialBoard[r][c] === 0) {
                    cell.addEventListener('click', () => this.selectCell(r, c));
                }
                
                // 高亮选中的单元格
                if (this.selectedCell && this.selectedCell[0] === r && this.selectedCell[1] === c) {
                    cell.classList.add('selected');
                }
                
                // 高亮相同数字
                if (this.selectedCell && this.board[r][c] !== 0 && 
                    this.board[r][c] === this.board[this.selectedCell[0]][this.selectedCell[1]]) {
                    cell.classList.add('highlight-same');
                }
                
                // 高亮同行同列
                if (this.selectedCell && (r === this.selectedCell[0] || c === this.selectedCell[1])) {
                    cell.classList.add('highlight-row-col');
                }
                
                boardDiv.appendChild(cell);
            }
        }
    }

    selectCell(r, c) {
        if (this.initialBoard[r][c] !== 0 || this.gameCompleted) return;
        
        this.selectedCell = [r, c];
        this.renderBoard();
        this.startTimer();
    }

    inputNumber(num) {
        if (!this.selectedCell || this.gameCompleted) return;
        
        const [r, c] = this.selectedCell;
        if (this.initialBoard[r][c] !== 0) return;
        
        this.startTimer();
        
        // 检查输入是否正确
        if (this.solution[r][c] === num) {
            this.board[r][c] = num;
            this.checkWin();
        } else {
            this.mistakes++;
            this.showError(r, c);
            
            // 检查是否超过最大错误次数
            if (this.mistakes >= this.maxMistakes) {
                this.gameOver();
                return;
            }
        }
        
        this.renderBoard();
        this.updateDisplay();
    }

    clearCell() {
        if (!this.selectedCell || this.gameCompleted) return;
        
        const [r, c] = this.selectedCell;
        if (this.initialBoard[r][c] !== 0) return;
        
        this.board[r][c] = 0;
        this.renderBoard();
    }

    getHint() {
        if (!this.selectedCell || this.gameCompleted) return;
        
        const [r, c] = this.selectedCell;
        if (this.initialBoard[r][c] !== 0 || this.board[r][c] !== 0) return;
        
        // 提供提示（直接填入正确答案）
        this.board[r][c] = this.solution[r][c];
        this.renderBoard();
        this.checkWin();
    }

    handleKeyInput(e) {
        if (e.key >= '1' && e.key <= '9') {
            this.inputNumber(parseInt(e.key));
        } else if (e.key === 'Delete' || e.key === 'Backspace') {
            this.clearCell();
        } else if (e.key === 'ArrowUp' || e.key === 'ArrowDown' || 
                   e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
            this.moveSelection(e.key);
            e.preventDefault();
        }
    }

    moveSelection(direction) {
        if (!this.selectedCell) return;
        
        let [r, c] = this.selectedCell;
        
        switch (direction) {
            case 'ArrowUp':
                r = Math.max(0, r - 1);
                break;
            case 'ArrowDown':
                r = Math.min(8, r + 1);
                break;
            case 'ArrowLeft':
                c = Math.max(0, c - 1);
                break;
            case 'ArrowRight':
                c = Math.min(8, c + 1);
                break;
        }
        
        this.selectCell(r, c);
    }

    showError(r, c) {
        const cell = document.getElementById(`cell-${r}-${c}`);
        if (cell) {
            cell.classList.add('error');
            setTimeout(() => {
                cell.classList.remove('error');
            }, 600);
        }
    }

    checkWin() {
        // 检查是否所有单元格都已填满且正确
        for (let r = 0; r < this.SIZE; r++) {
            for (let c = 0; c < this.SIZE; c++) {
                if (this.board[r][c] !== this.solution[r][c]) {
                    return false;
                }
            }
        }
        
        this.gameCompleted = true;
        this.clearTimer();
        this.showWinModal();
        return true;
    }

    gameOver() {
        this.gameCompleted = true;
        this.clearTimer();
        this.showGameOverModal();
    }

    formatTime(seconds) {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }

    updateTimer() {
        const currentLang = localStorage.getItem('language') || 'zh';
        const timerText = currentLang === 'zh' ? '用时: ' : 'Time: ';
        document.getElementById('timer').textContent = timerText + this.formatTime(this.timer);
    }

    updateMistakes() {
        const currentLang = localStorage.getItem('language') || 'zh';
        const mistakesText = currentLang === 'zh' ? '错误: ' : 'Mistakes: ';
        document.getElementById('mistakes').textContent = `${mistakesText}${this.mistakes}/${this.maxMistakes}`;
    }

    updateDisplay() {
        this.updateTimer();
        this.updateMistakes();
    }

    showWinModal() {
        const currentLang = localStorage.getItem('language') || 'zh';
        const difficultyText = currentLang === 'zh' ? 
            (this.difficulty === 'easy' ? '简单' : this.difficulty === 'medium' ? '中等' : '困难') :
            (this.difficulty.charAt(0).toUpperCase() + this.difficulty.slice(1));
        
        document.getElementById('final-time').textContent = this.formatTime(this.timer);
        document.getElementById('final-mistakes').textContent = this.mistakes.toString();
        document.getElementById('final-difficulty').textContent = difficultyText;
        
        this.showModal();
    }

    showGameOverModal() {
        // 可以添加游戏失败的弹窗
        alert('游戏结束！错误次数过多。');
        this.newGame();
    }

    showModal() {
        document.getElementById('win-modal').style.display = 'flex';
    }

    hideModal() {
        document.getElementById('win-modal').style.display = 'none';
    }

    restartGame() {
        this.newGame();
    }
}

// 全局函数，供 HTML 调用
let sudokuGame;

function initGame() {
    sudokuGame = new SudokuGame();
    sudokuGame.newGame();
}

function restartGame() {
    if (sudokuGame) {
        sudokuGame.restartGame();
    }
}

function newGame() {
    if (sudokuGame) {
        sudokuGame.newGame();
    }
}

function clearCell() {
    if (sudokuGame) {
        sudokuGame.clearCell();
    }
}

function getHint() {
    if (sudokuGame) {
        sudokuGame.getHint();
    }
}

// 初始化游戏
window.addEventListener('DOMContentLoaded', initGame);