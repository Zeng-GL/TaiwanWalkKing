

let Ereg = /^[^\[\]\(\)\\<>:;,@.]+[^\[\]\(\)\\<>:;,@]*@[a-z0-9A-Z]+(([.]?[a-z0-9A-Z]+)*[-]*)*[.]([a-z0-9A-Z]+[-]*)+$/g;
var url = "http://140.112.30.202:3000";


// if already logged in
function callName() {
    let str = localStorage.getItem('myName');
    if (str && str.length > 0) {
        alertBox(str + "已登入");
        $("#yes").click(function () {
            window.location.href = "walk3.html";
        });
    } else {
        window.onload = () => {
            ClossLoading();
        }
    }
}
callName();


//login
$("#signin-btn").click(function () {
    let siName = $("input[name='userName']").val();
    let siPass = $("input[name='userPassword']").val();

    $("p[name='siN_error'], p[name='siP_error']").text("");

    //format check
    if (siName.length < 1) { $("p[name='siN_error']").text("請輸入使用者名稱") }
    if (siPass.length === 0) { $("p[name='siP_error']").text("請輸入密碼") }

    //format check: OK
    if (siName.length > 0 && siPass.length > 0) {
        let data = {};
        data.userName = siName.trim();
        data.userPassword = siPass.trim();

        //post / login
        $.ajax({
            type: "POST",
            url: url + "/auth",
            data: data,
            success: function (msg) {
                if (msg == "Welcome back") {
                    function saveName() {
                        let str = document.querySelector("input[name='userName']").value;
                        localStorage.setItem('myName', str);
                        localStorage.setItem('checkStatusTimes', 1);
                        localStorage.setItem('TemCoins', 0);
                    }
                    saveName();
                    window.location.href = "walk3.html";
                } else {
                    $("p[name='siP_error']").text("請輸入正確的帳號密碼");
                }
            },
            error: function () {
                alert("登入時發生錯誤，請稍後再試");
            },
        });
    }
})


//forgot password
$("#send-btn").click(function (e) {
    let foEmail = $("input[name='forgot_Email']").val();
    $("p[name='foE_error']").text("");
    if (Ereg.test(foEmail) == false) {
        $("p[name='foE_error']").text("請輸入有效的E-mail格式")
    } else {
        //post
        // let email = foEmail.trim();
        // let data = { email };
        // $.post('/email', data, function () {

        // })

        $("#forgot-msg").css("display", "none");
        $("#check").css("display", "block");
        forgotPassword = 1;
        $("#forgotPassword").hover(function () {
            $(this).css("background-color", " rgba(0, 0, 0, 0.5)")
        });
    }
})


//goto signup
$("#create-account").click(function () {
    $("#signin-content").animate({ "margin-top": "120vh" }, 300);
    $("#backtoSignin").css({ "left": "-25px" }, 100);
    $("p[name='siE_error'], p[name='siP_error']").text("");
    window.setTimeout("window.location='signup.html'", 300);

})

//effect
var scene = document.getElementById("scene");
var parallaxInstance = new Parallax(scene);
$(".user-input").click(function () { FilterBlur("section"); });
$("section").hover(function () { FilterNone("section"); });
ChangeDisplay("#forgotPassword", ".alertbg-white, #forgot-msg", "block", FilterBlur, "#signup-content, #signin-content, section");
ChangeDisplay(".alertbg-white", ".alertbg-white, #forgot-msg, #check", "none", FilterNone, "#signup-content, #signin-content, section");
ChangeDisplay("#check-btn", ".alertbg-white, #check", "none", FilterNone, "#signup-content, #signin-content, section");




