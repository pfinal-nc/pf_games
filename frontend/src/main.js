//Global JS function for greeting
function greet() {
    //Get user input
    let inputName = document.getElementById("name").value;
    //Call Go Greet function
    window.go.main.App.Greet(inputName).then(result => {
        //Display result from Go
        document.getElementById("result").innerHTML = result;
    }).catch(err => {
    }).catch(err => {
        console.log(err);
    }).finally(() => {
        console.log("finished!")
    });
}
// 获取配置的游戏
function getGames() {
    // Get 获取节点
    let game_list_html = ''
    window.go.main.App.GameData().then(res => {
        let games = JSON.parse(res)
        $.each(games, function (i, game) {
            let li = '<div class="relative flex flex-row items-center p-4 game_li">\n' +
                '                        <div class="flex items-center justify-center h-10 w-10 rounded-full bg-pink-500 text-pink-300 font-bold flex-shrink-0">\n' +
                game.icon +
                '                        </div>\n' +
                '                        <div class="flex flex-col flex-grow ml-3">\n' +
                '                            <div class="flex items-center">\n' +
                '                                <div class="text-sm font-medium"><span class="font-bold">' + game.title +
                '</span></div>\n' +
                '                                <div class="active_status"></div>\n' +
                '                            </div>\n' +
                '                            <div class="text-xs truncate w-40">' +
                game.describe +
                '                            </div>\n' +
                '                        </div>\n' +
                '                    </div>'
            game_list_html += li
        })
        $("#gamesData").html(game_list_html)
        setGameShow()
        // 设置第一个游戏被选中
        $("#gamesData .game_li").first().click()
    }).catch(err => {
        console.log(err);
    }).finally(() => {
        console.log("finished!")
    });

}

// 设置点击
function setGameShow() {
    $("#gamesData .game_li").each(function (index) {
        $(this).on("click",function () {
            $("#gamesData .game_li").removeClass("nav_active")
            $("#gamesData .game_li .active_status").removeClass("nav_active_mark")
            $(this).addClass("nav_active")
            $(this).find('.active_status').addClass("nav_active_mark")
        })
    })
}