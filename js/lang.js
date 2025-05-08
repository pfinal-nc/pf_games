/**
 * Language data for PFinalClub Games
 * Contains translations for all UI elements in Chinese and English
 */

const languages = {
    zh: {
        'siteName': 'PFinalClub Games',
        'nav.home': '首页',
        'nav.allGames': '全部游戏',
        'nav.leaderboard': '排行榜',
        'nav.about': '关于我们',
        'hero.title': '欢迎来到 PFinalClub 游戏世界',
        'hero.subtitle': '探索我们精心挑选的小游戏合集，随时随地享受游戏的乐趣！',
        'hero.button': '开始探索',
        'games.title': '热门游戏',
        'games.hot': '热门',
        'games.new': '新游戏',
        'games.2048.desc': '合并数字，挑战你的大脑！看看你能否达到2048或更高。',
        'games.snake.title': '贪吃蛇',
        'games.snake.desc': '经典的贪吃蛇游戏，控制蛇吃食物并避免碰到墙壁或自己。',
        'games.tetris.title': '俄罗斯方块',
        'games.tetris.desc': '经典的俄罗斯方块游戏，旋转和移动方块以完成行。',
        'games.memory.title': '记忆翻牌',
        'games.memory.desc': '测试你的记忆力，找出所有匹配的卡片对。',
        'games.sudoku.title': '数独',
        'games.sudoku.desc': '填充9x9网格，使每行、每列和每个3x3方块包含数字1-9。',
        'games.minesweeper.title': '扫雷',
        'games.minesweeper.desc': '经典的扫雷游戏，避开地雷并清除所有安全区域。',
        'games.playButton': '开始游戏',
        'games.viewAll': '查看全部游戏',
        'categories.title': '游戏分类',
        'categories.puzzle': '益智游戏',
        'categories.action': '动作游戏',
        'categories.casual': '休闲游戏',
        'categories.strategy': '策略游戏',
        'footer.title': 'PFinalClub Games',
        'footer.description': '提供最好玩的在线小游戏合集，随时随地享受游戏的乐趣！',
        'footer.quickLinks': '快速链接',
        'footer.contact': '联系我们',
        'footer.contactText': '有任何问题或建议？请联系我们！',
        'footer.copyright': '© 2023 PFinalClub Games. 保留所有权利。',
        'terms': '使用条款',
        'privacy': '隐私政策',
        'cookies': 'Cookie 政策',
        'sitemap': '网站地图'
    },
    en: {
        'siteName': 'PFinalClub Games',
        'nav.home': 'Home',
        'nav.allGames': 'All Games',
        'nav.leaderboard': 'Leaderboard',
        'nav.about': 'About Us',
        'hero.title': 'Welcome to PFinalClub Games World',
        'hero.subtitle': 'Explore our carefully selected collection of mini-games and enjoy gaming anytime, anywhere!',
        'hero.button': 'Start Exploring',
        'games.title': 'Popular Games',
        'games.hot': 'HOT',
        'games.new': 'NEW',
        'games.2048.desc': 'Merge numbers and challenge your brain! See if you can reach 2048 or higher.',
        'games.snake.title': 'Snake',
        'games.snake.desc': 'Classic snake game. Control the snake to eat food and avoid hitting walls or yourself.',
        'games.tetris.title': 'Tetris',
        'games.tetris.desc': 'Classic Tetris game. Rotate and move blocks to complete rows.',
        'games.memory.title': 'Memory Cards',
        'games.memory.desc': 'Test your memory by finding all matching card pairs.',
        'games.sudoku.title': 'Sudoku',
        'games.sudoku.desc': 'Fill the 9x9 grid so that each row, column, and 3x3 box contains digits 1-9.',
        'games.minesweeper.title': 'Minesweeper',
        'games.minesweeper.desc': 'Classic minesweeper game. Avoid mines and clear all safe areas.',
        'games.playButton': 'Play Now',
        'games.viewAll': 'View All Games',
        'categories.title': 'Game Categories',
        'categories.puzzle': 'Puzzle Games',
        'categories.action': 'Action Games',
        'categories.casual': 'Casual Games',
        'categories.strategy': 'Strategy Games',
        'footer.title': 'PFinalClub Games',
        'footer.description': 'Providing the best online mini-games collection for you to enjoy anytime, anywhere!',
        'footer.quickLinks': 'Quick Links',
        'footer.contact': 'Contact Us',
        'footer.contactText': 'Have questions or suggestions? Contact us!',
        'footer.copyright': '© 2023 PFinalClub Games. All Rights Reserved.',
        'terms': 'Terms of Service',
        'privacy': 'Privacy Policy',
        'cookies': 'Cookie Policy',
        'sitemap': 'Sitemap'
    }
};

// Helper functions for game names
function getChineseGameName(type) {
    const names = {
        'snake': '贪吃蛇',
        'tetris': '俄罗斯方块',
        'memory': '记忆翻牌',
        'sudoku': '数独',
        'minesweeper': '扫雷'
    };
    return names[type] || type;
}

function getEnglishGameName(type) {
    const names = {
        'snake': 'Snake',
        'tetris': 'Tetris',
        'memory': 'Memory Cards',
        'sudoku': 'Sudoku',
        'minesweeper': 'Minesweeper'
    };
    return names[type] || type;
}

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { languages, getChineseGameName, getEnglishGameName };
}
