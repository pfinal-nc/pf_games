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

function checkLogin() {
    window.go.main.App.CheckLogin().then(result => {
        if (result) {

        } else {
            $("#app").load("/login.html")
        }
        // if (result) {
        //     $("#login_btn").hide()
        //     $("#logout_btn").show()
        // }
    }).catch(err => {
        console.log(err);
    }).finally(() => {
        console.log("finished!")
    });
}

function Login() {
    var userName = $('#UserName').val()
    var PassWord = $('#PassWord').val()
    if (userName === "") {
        $("#UserName").addClass("border-red-500")
        return false;
    }
    if (PassWord === "") {
        $("#PassWord").addClass("border-red-500")
        return false;
    }
    window.go.main.App.Login(userName, PassWord).then(result => {
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

        } else {
            let no_data_tr = "<tr class='text-white'><td class='text-white/20 mx-auto p-2 text-center' colspan='4'><span class='text-white/50'>没有保存密码</span></td></tr>"
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
    setTimeout(function (){
        MsgClose();
    },1500)
}
