// 记忆卡牌游戏核心逻辑
const CARD_PAIRS = 8;
const CARD_SYMBOLS = ['🍎','🍌','🍇','🍉','🍓','🍒','🥝','🍋','🍍','🥑','🥕','🍆','🍑','🥥','🍊','🍈'];
let cards = [];
let flipped = [];
let matched = [];
let moves = 0;
let score = 0;
let lock = false;
let timer = null;

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function initGame() {
    // 生成卡牌
    let symbols = shuffle(CARD_SYMBOLS.slice(0, CARD_PAIRS).concat(CARD_SYMBOLS.slice(0, CARD_PAIRS)));
    cards = symbols.map((symbol, i) => ({ id: i, symbol, flipped: false, matched: false }));
    flipped = [];
    matched = [];
    moves = 0;
    score = 0;
    lock = false;
    renderBoard();
    updateScore();
    updateMoves();
    hideModal();
}

function renderBoard() {
    const board = document.getElementById('game-board');
    board.innerHTML = '';
    cards.forEach(card => {
        const cardDiv = document.createElement('div');
        cardDiv.className = 'card' + (card.flipped || card.matched ? ' flipped' : '');
        if (card.matched) cardDiv.classList.add('matched');
        cardDiv.dataset.id = card.id;
        cardDiv.onclick = () => flipCard(card.id);
        cardDiv.innerHTML = `
            <span class="front">${card.flipped || card.matched ? card.symbol : ''}</span>
            <span class="back"></span>
        `;
        board.appendChild(cardDiv);
    });
}

function flipCard(id) {
    if (lock) return;
    const card = cards[id];
    if (card.flipped || card.matched) return;
    card.flipped = true;
    flipped.push(card);
    renderBoard();
    if (flipped.length === 2) {
        lock = true;
        moves++;
        updateMoves();
        if (flipped[0].symbol === flipped[1].symbol) {
            flipped[0].matched = true;
            flipped[1].matched = true;
            matched.push(flipped[0], flipped[1]);
            score += 10;
            updateScore();
            flipped = [];
            lock = false;
            if (matched.length === cards.length) {
                setTimeout(showModal, 500);
            }
        } else {
            setTimeout(() => {
                flipped[0].flipped = false;
                flipped[1].flipped = false;
                flipped = [];
                renderBoard();
                lock = false;
            }, 800);
        }
    }
}

function updateScore() {
    document.getElementById('score').textContent = score;
    document.getElementById('final-score').textContent = score;
}
function updateMoves() {
    document.getElementById('moves').textContent = moves;
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
// 多语言切换时同步更新分数/步数
window.addEventListener('languageChanged', function() {
    updateScore();
    updateMoves();
});
// 初始化
window.onload = initGame; 