// 数独游戏核心逻辑
const SIZE = 9;
let board = [];
let solution = [];
let selectedCell = null;
let timer = 0;
let timerInterval = null;
let mistakes = 0;

// 简单数独题目（可扩展为随机生成）
const PUZZLE = [
  [5,3,null,null,7,null,null,null,null],
  [6,null,null,1,9,5,null,null,null],
  [null,9,8,null,null,null,null,6,null],
  [8,null,null,null,6,null,null,null,3],
  [4,null,null,8,null,3,null,null,1],
  [7,null,null,null,2,null,null,null,6],
  [null,6,null,null,null,null,2,8,null],
  [null,null,null,4,1,9,null,null,5],
  [null,null,null,null,8,null,null,7,9]
];
const SOLUTION = [
  [5,3,4,6,7,8,9,1,2],
  [6,7,2,1,9,5,3,4,8],
  [1,9,8,3,4,2,5,6,7],
  [8,5,9,7,6,1,4,2,3],
  [4,2,6,8,5,3,7,9,1],
  [7,1,3,9,2,4,8,5,6],
  [9,6,1,5,3,7,2,8,4],
  [2,8,7,4,1,9,6,3,5],
  [3,4,5,2,8,6,1,7,9]
];

function initGame() {
  board = PUZZLE.map(row => row.slice());
  solution = SOLUTION;
  selectedCell = null;
  mistakes = 0;
  timer = 0;
  clearInterval(timerInterval);
  timerInterval = setInterval(() => {
    timer++;
    updateTimer();
  }, 1000);
  renderBoard();
  updateMistakes();
  updateTimer();
  hideModal();
}

function renderBoard() {
  const boardDiv = document.getElementById('sudoku-board');
  boardDiv.innerHTML = '';
  for (let r = 0; r < SIZE; r++) {
    for (let c = 0; c < SIZE; c++) {
      const cell = document.createElement('div');
      cell.className = 'cell';
      if (PUZZLE[r][c] !== null) {
        cell.textContent = PUZZLE[r][c];
        cell.classList.add('prefilled');
      } else {
        cell.tabIndex = 0;
        cell.onclick = () => selectCell(r, c);
        cell.onkeydown = (e) => handleInput(e, r, c);
        if (selectedCell && selectedCell[0] === r && selectedCell[1] === c) {
          cell.classList.add('selected');
        }
      }
      cell.id = `cell-${r}-${c}`;
      boardDiv.appendChild(cell);
    }
  }
}

function selectCell(r, c) {
  selectedCell = [r, c];
  renderBoard();
  document.getElementById(`cell-${r}-${c}`).focus();
}

function handleInput(e, r, c) {
  if (e.key >= '1' && e.key <= '9') {
    const val = parseInt(e.key);
    if (solution[r][c] === val) {
      board[r][c] = val;
      checkWin();
    } else {
      mistakes++;
      updateMistakes();
      showError(r, c);
    }
    renderBoard();
  }
}

function showError(r, c) {
  const cell = document.getElementById(`cell-${r}-${c}`);
  if (cell) {
    cell.classList.add('error');
    setTimeout(() => cell.classList.remove('error'), 600);
  }
}

function updateMistakes() {
  document.getElementById('mistakes').textContent = mistakes;
}
function updateTimer() {
  document.getElementById('timer').textContent = timer + 's';
}
function checkWin() {
  for (let r = 0; r < SIZE; r++) {
    for (let c = 0; c < SIZE; c++) {
      if (board[r][c] !== solution[r][c]) return;
    }
  }
  clearInterval(timerInterval);
  document.getElementById('final-time').textContent = timer + 's';
  showModal();
}
function showModal() {
  document.getElementById('win-modal').style.display = 'flex';
}
function hideModal() {
  document.getElementById('win-modal').style.display = 'none';
}
function restartGame() {
  initGame();
}
window.addEventListener('languageChanged', function() {
  updateMistakes();
  updateTimer();
});
window.onload = initGame;

// 监听全局键盘输入，只有选中单元格时才响应
function globalKeyHandler(e) {
  if (!selectedCell) return;
  if (e.key >= '1' && e.key <= '9') {
    const [r, c] = selectedCell;
    if (PUZZLE[r][c] !== null) return; // 预填不可改
    const val = parseInt(e.key);
    if (solution[r][c] === val) {
      board[r][c] = val;
      checkWin();
    } else {
      mistakes++;
      updateMistakes();
      showError(r, c);
    }
    renderBoard();
  }
}
document.addEventListener('keydown', globalKeyHandler); 