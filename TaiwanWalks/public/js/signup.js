let Ereg = /^[^\[\]\(\)\\<>:;,@.]+[^\[\]\(\)\\<>:;,@]*@[a-z0-9A-Z]+(([.]?[a-z0-9A-Z]+)*[-]*)*[.]([a-z0-9A-Z]+[-]*)+$/g;
var url = "http://140.112.30.202:3000";


//if already logged in
function callName() {
    let str = localStorage.getItem('myName');
    if (str && str.length > 0) {
        alertBox(str + "已登入");
        $("#yes").click(function () {
            window.location.href = "walk3.html";
        })
    } else {
        window.onload = () => {
            ClossLoading();
        }
    }
}
callName();




//birth year drop-down
let today = new Date();
let thisYear = today.getFullYear() - 1900;
let years = new Array();
const _select = document.getElementById("select");

for (i = 0; i < thisYear; i++) {
    years[i] = i + 1900;
    let _option = document.createElement("option");
    _option.setAttribute("value", years[i]);
    _option.innerHTML = years[i];
    _select.append(_option);
}

const birthYear = document.getElementById("birthyear");
inputSelect(_select, birthYear, 10);

//question drop-down
const _select2 = document.getElementById("select2");
const question = document.getElementById("question");
inputSelect(_select2, question, 5);


//sign up
$("#signup-btn").click(function () {
    let signup = 0;
    let suName = $("input[name='userName']").val();
    let suEmail = $("input[name='userEmail']").val();
    let suPass = $("input[name='userPassword']").val();
    let suYear = $("input[name='userAge']").val();
    let genderM = document.getElementById("radio1");
    let genderF = document.getElementById("radio2");
    let suQuest = $("input[name='question']").val();

    $("p[name='suN_error'], p[name='suP_error'],  p[name='suE_error'], p[name='suG_error'], p[name='suY_error'], p[name='suQ_error']").text("");

    //format check
    if (suName.length < 1) { $("p[name='suN_error']").text("請輸入使用者名稱") } else { signup++ }
    if (Ereg.test(suEmail) == false) { $("p[name='suE_error']").text("請輸入有效的E-mail格式") } else { signup++ }
    if (suPass.length > 20 || suPass.length < 6) { $("p[name='suP_error']").text("請輸入6-20位字元") } else { signup++ }
    if (genderM.checked == false && genderF.checked == false) { $("p[name='suG_error']").text("請選擇性別") } else { signup++ }
    if (suYear < years[0] || suYear > today.getFullYear()) { $("p[name='suY_error']").text("請輸入出生西元年") } else { signup++ }
    if (suQuest.length < 1) { $("p[name='suQ_error']").text("請選擇") } else { signup++ }

    //gender & question info format
    let suGen;
    if (genderM.checked == true) { suGen = "M" } else { suGen = "F" }
    let q1, q2, q3, q4;
    if (suQuest == "水/飲品") { q1 = 1; q2 = 0; q3 = 0; q4 = 0; }
    if (suQuest == "雨具") { q1 = 0; q2 = 1; q3 = 0; q4 = 0; }
    if (suQuest == "手機電量") { q1 = 0; q2 = 0; q3 = 1; q4 = 0; }
    if (suQuest == "登山用具") { q1 = 0; q2 = 0; q3 = 0; q4 = 1; }

    //format check: OK
    if (signup === 6) {
        let data = {};
        data.userName = suName.trim();
        data.userEmail = suEmail.trim();
        data.userPassword = suPass.trim();
        data.userPic = null;
        data.userAge = suYear.trim();
        data.userGender = suGen.trim();
        data.question1 = q1;
        data.question2 = q2;
        data.question3 = q3;
        data.question4 = q4;

        //post / signup / create new user
        $.ajax({
            type: "POST",
            url: url + "/create",
            data: data,
            success: function () {
                login(data);
            },
            error: function () {
                alert("註冊時發生錯誤，請稍後再試");
            }

        });


    }

})
function login(userinfo) {
    let data = {};
    data.userName = userinfo.userName;
    data.userPassword = userinfo.userPassword;
    $.ajax({
        type: "POST",
        url: url + "/auth",
        data: data,
        complete: function () {
            loginCheck();
        },
        success: function (msg) {
            if (msg == "Welcome back") {
                function saveName() {
                    let str = document.querySelector("input[name='userName']").value;
                    localStorage.setItem('myName', str);
                    localStorage.setItem('checkStatusTimes', 0);
                    localStorage.setItem('TemCoins', 0);
                }
                saveName();
                window.location.href = "walk3.html";
            } else {
                $("p[name='suQ_error']").text("請輸入正確的資料");
            }

        },
        error: function () {
            alert("註冊時發生錯誤，請稍後再試");
        },
    });
}



//goto login
$("#backtoSignin").click(function () {
    $("#backtoSignin").animate({ "left": "-75px" }, 300);
    $("#signin-content").animate({ "margin-top": "0vh" }, 300);
    $("p[name='suN_error'], p[name='suP_error'],  p[name='suE_error'], p[name='suG_error'], p[name='suY_error']").text("");
    window.setTimeout("window.location='login.html'", 300);
}).hover(function () {
    $("#backtoSignin").css({ "left": "-30px" }, 100);
}, function () {
    $("#backtoSignin").css({ "left": "-25px" }, 100);
});

//effect
var scene = document.getElementById("scene");
var parallaxInstance = new Parallax(scene);
ChangeDisplay("body", _select, "none");
ChangeDisplay("body", _select2, "none");
ChangeDisplay(question, _select, "none");
ChangeDisplay(birthYear, _select2, "none");
$("input").click(function () { FilterBlur("section"); });
$("section").hover(function () { FilterNone("section"); });

