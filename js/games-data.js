/**
 * Game data for PFinalClub Games
 * Contains information about all available games
 */

const gamesData = [
    {
        id: "2048",
        name: {
            zh: "2048",
            en: "2048"
        },
        description: {
            zh: "合并数字，挑战你的大脑！看看你能否达到2048或更高。",
            en: "Merge numbers and challenge your brain! See if you can reach 2048 or higher."
        },
        image: "https://placehold.co/600x400/indigo/white?text=2048",
        url: "/games/2048/",
        categories: ["puzzle", "popular"],
        tags: ["hot"],
        difficulty: "medium"
    },
    {
        id: "snake",
        name: {
            zh: "贪吃蛇",
            en: "Snake"
        },
        description: {
            zh: "经典的贪吃蛇游戏，控制蛇吃食物并避免碰到墙壁或自己。",
            en: "Classic snake game. Control the snake to eat food and avoid hitting walls or yourself."
        },
        image: "https://placehold.co/600x400/orange/white?text=Snake",
        url: "/games/snake/",
        categories: ["arcade"],
        tags: [],
        difficulty: "easy"
    },
    {
        id: "tetris",
        name: {
            zh: "俄罗斯方块",
            en: "Tetris"
        },
        description: {
            zh: "经典的俄罗斯方块游戏，旋转和移动方块以完成行。",
            en: "Classic Tetris game. Rotate and move blocks to complete rows."
        },
        image: "https://placehold.co/600x400/green/white?text=Tetris",
        url: "/games/tetris/",
        categories: ["arcade", "puzzle"],
        tags: ["new"],
        difficulty: "medium"
    },
    {
        id: "memory",
        name: {
            zh: "记忆翻牌",
            en: "Memory Cards"
        },
        description: {
            zh: "测试你的记忆力，找出所有匹配的卡片对。",
            en: "Test your memory by finding all matching card pairs."
        },
        image: "https://placehold.co/600x400/red/white?text=Memory",
        url: "/games/memory/",
        categories: ["memory"],
        tags: [],
        difficulty: "easy"
    },
    {
        id: "sudoku",
        name: {
            zh: "数独",
            en: "Sudoku"
        },
        description: {
            zh: "填充9x9网格，使每行、每列和每个3x3方块包含数字1-9。",
            en: "Fill the 9x9 grid so each row, column, and 3x3 box contains digits 1-9."
        },
        image: "https://placehold.co/600x400/purple/white?text=Sudoku",
        url: "/games/sudoku/",
        categories: ["puzzle", "strategy"],
        tags: [],
        difficulty: "hard"
    },
    {
        id: "minesweeper",
        name: {
            zh: "扫雷",
            en: "Minesweeper"
        },
        description: {
            zh: "经典的扫雷游戏，避开地雷并清除所有安全区域。",
            en: "Classic minesweeper game. Avoid mines and clear all safe areas."
        },
        image: "https://placehold.co/600x400/blue/white?text=Minesweeper",
        url: "/games/minesweeper/",
        categories: ["puzzle", "strategy"],
        tags: [],
        difficulty: "medium"
    },
    {
        id: "chess",
        name: {
            zh: "国际象棋",
            en: "Chess"
        },
        description: {
            zh: "经典的国际象棋游戏，制定策略，击败对手。",
            en: "Classic chess game. Plan your strategy and defeat your opponent."
        },
        image: "https://placehold.co/600x400/brown/white?text=Chess",
        url: "/games/chess/",
        categories: ["strategy", "board"],
        tags: ["coming-soon"],
        difficulty: "hard"
    },
    {
        id: "hangman",
        name: {
            zh: "猜单词",
            en: "Hangman"
        },
        description: {
            zh: "猜单词游戏，在用完所有机会之前猜出隐藏的单词。",
            en: "Guess the hidden word before you run out of attempts."
        },
        image: "https://placehold.co/600x400/teal/white?text=Hangman",
        url: "/games/hangman/",
        categories: ["word", "puzzle"],
        tags: ["coming-soon"],
        difficulty: "medium"
    }
];

// Helper functions to work with game data
const gamesHelper = {
    // Get all games
    getAllGames: function() {
        return gamesData;
    },
    
    // Get game by ID
    getGameById: function(id) {
        return gamesData.find(game => game.id === id);
    },
    
    // Get games by category
    getGamesByCategory: function(category) {
        if (category === 'all') {
            return gamesData;
        }
        return gamesData.filter(game => game.categories.includes(category));
    },
    
    // Get games by tag
    getGamesByTag: function(tag) {
        return gamesData.filter(game => game.tags.includes(tag));
    },
    
    // Get game name based on current language
    getGameName: function(game, lang) {
        return game.name[lang] || game.name.en;
    },
    
    // Get game description based on current language
    getGameDescription: function(game, lang) {
        return game.description[lang] || game.description.en;
    }
};

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { gamesData, gamesHelper };
}
