//Global JS function for greeting
// 定时调用 每隔 5s 调用一次 检测是否登录
// 自执行
$(function () {
    checkLogin().then(result => {
        if (!result) {
            clearInterval(timer)
            $("#app").load("/login.html")
        }else {
            initLoadPage();
        }
    })
})
// 检测登录状态
let timer = setInterval(() => {
    console.log("checkLogin")
    checkLogin().then(result => {
        if (!result) {
            clearInterval(timer)
            $("#app").load("/login.html")
        }
    })
}, 5000)
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

function checkLogin() {
    return window.go.main.App.CheckLogin().then(result => {
        return result
        // if (result) {
        //
        // } else {
        //     $("#app").load("/login.html")
        // }
        // if (result) {
        //     $("#login_btn").hide()
        //     $("#logout_btn").show()
        // }
    }).catch(err => {
        console.log(err);
        return false;
    });
}

function Login() {
    console.log("点击登录")
    let userName = $('#UserName').val()
    let PassWord = $('#PassWord').val()
    if (userName === "") {
        $("#UserName").addClass("border-red-500")
        return false;
    }
    if (PassWord === "") {
        $("#PassWord").addClass("border-red-500")
        return false;
    }
    window.go.main.App.Login(userName, PassWord).then(result => {
        console.log("登录:".result)
        //Display result from Go
        if (result == true) {
            window.location.href = "index.html"
        }
    }).catch(err => {
        console.log(err);
    }).finally(() => {
        console.log("finished!")
    });
}

function LoginOut() {
    window.go.main.App.LoginOut().then(result => {
        //Display result from Go
        if (result == true) {
            window.location.href = "index.html"
        }
    }).catch(err => {
        console.log(err);
    }).finally(() => {
        console.log("finished!")
    });
}

function LoadPage(activePage) {
    $("#content").load("./" + activePage + ".html")
}

function initLoadPage() {
    var activePage = localStorage.getItem("activePage")
    if (!activePage) {
        activePage = "pass_list"
        localStorage.setItem("activePage", activePage)
    }
    LoadPage(activePage)
}

function GetPassList() {
    window.go.main.App.GetPassList().then(result => {
        if (result !== "") {
            let data_tr = ''
            $.each(JSON.parse(result), function (i, item) {
                data_tr += ' <tr class="text-white border border-gray-400 hover:bg-gray-400">\n' +
                    '   <td class="px-4 py-3">' + item.mark + '</td>' +
                    '                            <td class="px-4 py-3 text-ms font-semibold">' + item.username + '</td>\n' +
                    '                            <td class="px-4 py-3 text-xs">\n' +
                    '                                <span class="px-2 py-1 font-semibold leading-tight text-green-700 bg-green-100 rounded-sm"> ' + item.password + ' </span>\n' +
                    '                            </td>\n' +
                    '                            <td class="px-4 py-3 text-sm">' + item.created + '</td>\n' +
                    '                            <td class="px-4 py-3 text-sm">' +
                    '<div><a class="text-xs float-left hover:text-green-500"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4">\n' +
                    '  <path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />\n' +
                    '</svg>\n</a>' +
                    '<a class="text-xs float-left ml-2 hover:text-red-500 pwdDelete" data="' + item.pid + '"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4">\n' +
                    '  <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />\n' +
                    '</svg>\n</a></div>' +
                    '</td>\n' +
                    '</tr>'
            })
            $("#password_list").html(data_tr)
            bindEvent()
        } else {
            let no_data_tr = "<tr class='text-white'><td class='text-white/20 mx-auto p-2 text-center' colspan='5'><span class='text-white/50'>没有保存密码</span></td></tr>"
            $("#password_list").html(no_data_tr)
        }
    }).catch(err => {
        console.log(err);
    }).finally(() => {
        console.log("finished!")
    });
}

function CreatePassword() {
    var mark = $('#grid-mark').val()
    if (mark === "") {
        $("#grid-mark").addClass("border-red-500")
        $("#grid-mark-msg").text("* mark不能为空！！")
        return false
    }
    var username = $('#grid-username').val()
    var password = $('#grid-password').val()
    if (mark === "") {
        $("#grid-password").addClass("border-red-500")
        $("#grid-password-msg").text("* 密码不能为空！！")
        return false
    }
    window.go.main.App.SavePass(mark, username, password).then(result => {
        if (result) {
            window.location.reload()
        }
    }).catch(err => {
        console.log(err);
    }).finally(() => {
        console.log("finished!")
    });
}

function MsgClose() {
    $("#global_message").fadeOut("slow");
}

function AlertMsg(msg) {
    $("#global_message #msg").text(msg)
    $("#global_message").fadeIn("slow");
    setTimeout(function () {
        MsgClose();
    }, 1500)
}

function DelPwd(pwd) {

}

function bindEvent() {
    $(".pwdDelete").each(function (v, item) {
        $(item).on("click", function () {
            DelPwd($(this).attr("data"))
        })
    })
}
