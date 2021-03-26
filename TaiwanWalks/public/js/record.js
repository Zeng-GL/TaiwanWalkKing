var url = "http://140.112.30.202:3000";

//-login status-
function callName() {
    let str = localStorage.getItem('myName');
    if (str && str.length > 0) {
        $("#per-username").text(str);
        appendTitle(str);
        getUserId(str);
        window.onload = () => {
            ClossLoading();
            effect();
        }
   
    } else {
        //back to login page
        alertBox("尚未登入，將轉跳至登入畫面");
        $("#yes").click(function () {
            window.location.href = "login.html";
        })

    }
}
callName();


//-web page title / user name-
function appendTitle(user) {
    $("title").text("台灣尋寶王｜個人專區-" + user);
    $("#bg-name").text("Welcome, " + user + "!");
    $("#cont-name").text(user);
    $("#logout-p").text("登出" + user);
}


//-logout-
$("#logout-yes").click(function () {
    localStorage.removeItem("myName");
    localStorage.removeItem("TemCoins");
    window.location.href = "login.html";
})

//-get userID-
function getUserId(user) {
    $.ajax({
        type: "GET",
        url: url + "/users/" + user,
        dataType: "json",
        success: function (data) {
            let userid = data.userID;
            let count = data.userAllcount;
            returncount(userid, count);
            if (userid == 6) {
                getStep();
                $(".chart-container span").css("display", "none");
                $(".chart-container").css("border", "none");
            } else {
                CreateBlankStock();
                $(".chart-container canvas").css("display", "none");
            }
        }
    })
}


//-today in YYYY/MM/DD-
//// let date = new Date();
//// let today = yyyymmdd(date);
// let date = moment().format("YYYY/MM/DD");
//-yesterday in YYYY/MM/DD-
//// let yesterday = today.slice(0, 8) + (today.slice(8, 10) - 1);
//// if (yesterday.length < 10) { yesterday = yesterday.slice(0, 8) + "0" + yesterday.slice(8) };
let yesterday = moment().subtract(1, 'days').format("YYYY/MM/DD");
$("#sleep-title").text("昨天的睡眠狀況(" + yesterday + ")");


//-step-
//get step records
function getStep() {
    $.ajax({
        type: "GET",
        url: url + "/watch",
        dataType: "json",
        complete: function () {
        },
        success: function (data) {
            CreateStepRecord(data);
            let stepCount = data.length
            $("#span").text(stepCount);
        }
    })
}

//create step records & other health records
const recordBox = document.getElementById("record");
const records = document.getElementById("records");
const hbBox = document.getElementById("heart-beat");
const hb_records = document.getElementById("hb-records");
let r_c = 0;
let r_cl;
let distance = 0;
let floors = 0;
function CreateStepRecord(data) {
    //sort
    data.sort(function (a, b) {
        return Number(new Date(b.calendardate)) - Number(new Date(a.calendardate));
    });
    $("#step-p").text("從" + data[data.length - 1].calendardate + "至今，");
    data.forEach(divs => {
        let recorditem = document.createElement("div");
        recorditem.setAttribute("class", "recorditem");
        let calories = Math.round(((divs.steps / 2000) * 100) * 100) / 100;
        recorditem.setAttribute("title", "約消耗" + calories + "卡路里");

        let re_date = document.createElement("p");
        re_date.setAttribute("class", "re-date");
        re_date.textContent = divs.calendardate;

        let re_count = document.createElement("div");
        re_count.setAttribute("class", "re-count");

        let re_count_div = document.createElement("div");
        re_count_div.setAttribute("class", "re-count-div");
        let re_count_div_img = document.createElement("img");
        re_count_div_img.setAttribute("src", "imgs/btn-record.svg");

        let re_count_p = document.createElement("p");
        re_count_p.textContent = "x " + divs.steps;

        records.appendChild(recorditem);
        recorditem.appendChild(re_date);
        recorditem.appendChild(re_count);
        re_count.appendChild(re_count_div);
        re_count.appendChild(re_count_p);
        re_count_div.appendChild(re_count_div_img);

        r_c += divs.steps;

        if (divs.calendardate == yesterday) {
            $("#deep-sleep").text(Math.round(((divs.deepsleepdurationinseconds) / 60) * 100) / 100);
            let sleepPer = (divs.deepsleepdurationinseconds / divs.sleepdurationinseconds) * 100;
            let _sleepPer = Math.round((sleepPer * 100) / 100);
            $("#deep-sleep-per").text(_sleepPer);
        }
    });
    for (var i = 0; i < 4; i++) {
        distance += data[i].distanceinmeters;
        floors += data[i].floorsclimbed;

        let recorditem = document.createElement("div");
        recorditem.setAttribute("class", "recorditem");

        let re_date = document.createElement("p");
        re_date.setAttribute("class", "re-date");
        re_date.textContent = data[i].calendardate;

        let re_count = document.createElement("div");
        re_count.setAttribute("class", "re-count");

        let re_count_div = document.createElement("div");
        re_count_div.setAttribute("class", "re-count-div");

        let re_count_p = document.createElement("p");
        re_count_p.textContent = data[i].restingheartrateinbeatsperminute + " bpm";

        hb_records.appendChild(recorditem);
        recorditem.appendChild(re_date);
        recorditem.appendChild(re_count);
        re_count.appendChild(re_count_div);
        re_count.appendChild(re_count_p);
    }
    CreateSpace(records);
    ChangeStepText();
    CreateStock(data)
}

function ChangeStepText() {
    $("#hb-records span").css("display", "none");
    $("#records span").css("display", "none");
    $("#step-c span").text(r_c);
    let r_cl = r_c % 100000;
    let r_cm = 100000 - r_cl;
    $("#step-time h5").text("再走" + r_cm + "步解鎖下個階段的金幣獎勵");
    $("#t p").text(r_cl + "/100000步");
    $("#stl-in").css("width", (300 / 100000) * r_cl + "px");
    $("#step-line img").attr("title", r_cl + "/100000");
    $("#distance-total").text(Math.round((distance / 1000) * 100) / 100);
    $("#distance-aver").text(Math.round(((distance / 1000) / 7) * 100) / 100);
    $("#floors-total").text(floors);
    $("#floors-aver").text(Math.round((floors / 7) * 10) / 10);
};

//show step stock
const ctx = document.getElementById('chart').getContext('2d');
function CreateStock(ar) {
    ar.sort(function (a, b) {
        return Number(new Date(b.calendardate)) - Number(new Date(a.calendardate));
    });
    var chart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: [
                ar[0].calendardate.slice(5, 10),
                ar[1].calendardate.slice(5, 10),
                ar[2].calendardate.slice(5, 10),
                ar[3].calendardate.slice(5, 10),
                ar[4].calendardate.slice(5, 10),
                ar[5].calendardate.slice(5, 10),
                ar[6].calendardate.slice(5, 10),
                ar[7].calendardate.slice(5, 10),
                ar[8].calendardate.slice(5, 10),
                ar[9].calendardate.slice(5, 10),
            ],
            datasets: [{
                label: '每日目標10000步',
                data: [
                    ar[0].steps / 1,
                    ar[1].steps / 1,
                    ar[2].steps / 1,
                    ar[3].steps / 1,
                    ar[4].steps / 1,
                    ar[5].steps / 1,
                    ar[6].steps / 1,
                    ar[7].steps / 1,
                    ar[8].steps / 1,
                    ar[9].steps / 1,
                ],
                backgroundColor: [
                    'rgba(27,27,27,0.8)',
                    'rgba(27,27,27,0.8)',
                    'rgba(27,27,27,0.8)',
                    'rgba(27,27,27,0.8)',
                    'rgba(27,27,27,0.8)',
                    'rgba(27,27,27,0.8)',
                    'rgba(27,27,27,0.8)',
                    'rgba(27,27,27,0.8)',
                    'rgba(27,27,27,0.8)',
                    'rgba(27,27,27,0.8)',
                ],
                borderColor: [
                    '#272727',
                    '#272727',
                    '#272727',
                    '#272727',
                    '#272727',
                    '#272727',
                    '#272727',
                    '#272727',
                    '#272727',
                    '#272727',
                ],
                borderWidth: 1
            }]
        }
    });
}


//-coin-
//userAllcount in users-list convert to number
function returncount(userid, count) {
    count = 0;
    getUserRecords(userid, count);
}

//get user coin records
function getUserRecords(userid, count) {
    console.log("User ID = " + userid);
    $.ajax({
        type: "GET",
        url: url + "/records/walk_lists/" + userid,
        dataType: "json",
        success: function (data) {
            reorganizeData(data, count);
        },
    })
}

//reorganize data
function reorganizeData(data, count) {
    //olddata sort by date & place
    data.sort(function (a, b) {
        if (a.recordDate.slice(5, 10) == b.recordDate.slice(5, 10)) {
            return a.walkId - b.walkId;
        }
        return Number(new Date(b.recordDate)) - Number(new Date(a.recordDate));
    })

    //newdata
    let newrecord = [];
    let l = 0;
    newrecord.push(new Object());
    newrecord[0].recordDate = data[0].recordDate.slice(0, 10);
    newrecord[0].recordCount = data[0].recordCount;
    newrecord[0].walkPlaceName = data[0].walkPlaceName;
    newrecord[0].walkAddress = data[0].walkAddress.slice(0, 6);
    newrecord[0].walkId = data[0].walkId;

    //merge olddata in same location & save in newdata
    for (var i = 1; i < data.length; i++) {
        if (data[i].walkId == 1474) {
            continue;
        }
        if (data[i].walkId == 1261) {
            data[i].walkAddress = "新北市雙溪區";
        }
        if (data[i].walkId == 1262) {
            data[i].walkAddress = "新北市貢寮區";
        }
        if (data[i].walkId == 1263) {
            data[i].walkAddress = "宜蘭縣頭城鎮";
        }
        if (data[i].walkId == 1463) {
            data[i].walkId = 1471;
            data[i].walkPlaceName = "佛光蘭陽別院";
            data[i].walkAddress = "宜蘭縣宜蘭市";
        }
        if (data[i].recordDate.slice(5, 10) == data[i - 1].recordDate.slice(5, 10)) {
            if (data[i].walkPlaceName == data[i - 1].walkPlaceName) {
                newrecord[l].recordDate = data[i].recordDate.slice(0, 10);
                newrecord[l].recordCount += data[i].recordCount;
                newrecord[l].walkPlaceName = data[i].walkPlaceName;
                newrecord[l].walkAddress = data[i].walkAddress.slice(0, 6);
                newrecord[l].walkId = data[i].walkId;
            } else {
                l++;
                newrecord.push(new Object());
                newrecord[l].recordDate = data[i].recordDate.slice(0, 10);
                newrecord[l].recordCount = data[i].recordCount;
                newrecord[l].walkPlaceName = data[i].walkPlaceName;
                newrecord[l].walkAddress = data[i].walkAddress.slice(0, 6);
                newrecord[l].walkId = data[i].walkId;
            }
        } else {
            l++;
            newrecord.push(new Object());
            newrecord[l].recordDate = data[i].recordDate.slice(0, 10);
            newrecord[l].recordCount = data[i].recordCount;
            newrecord[l].walkPlaceName = data[i].walkPlaceName;
            newrecord[l].walkAddress = data[i].walkAddress.slice(0, 6);
            newrecord[l].walkId = data[i].walkId;
        }
    }
    showCoin(newrecord, count);
    CoinSort(newrecord);
}

//create coin records
const coin_recordBox = document.getElementById("coin-record");
const coin_records = document.getElementById("coin-records");
function showCoin(data, count) {
    data.forEach(divs => {
        let recorditem = document.createElement("div");
        recorditem.setAttribute("class", "recorditem");
        recorditem.setAttribute("title", divs.walkAddress);

        let re_date = document.createElement("p");
        re_date.setAttribute("class", "re-date");
        re_date.textContent = divs.recordDate;

        let re_place = document.createElement("p");
        re_place.setAttribute("class", "re-place");
        re_place.textContent = divs.walkPlaceName;

        let re_count = document.createElement("div");
        re_count.setAttribute("class", "re-count");

        let re_count_div = document.createElement("div");
        re_count_div.setAttribute("class", "re-count-div");

        let re_count_div_img = document.createElement("img");
        re_count_div_img.setAttribute("src", "imgs/btn-money.svg");

        let re_count_p = document.createElement("p");
        re_count_p.textContent = "x " + divs.recordCount;

        coin_records.appendChild(recorditem);
        recorditem.appendChild(re_date);
        recorditem.appendChild(re_place);
        recorditem.appendChild(re_count);
        re_count.appendChild(re_count_div);
        re_count.appendChild(re_count_p);
        re_count_div.appendChild(re_count_div_img);
        //all coins
        if (divs.recordCount > 0) count += divs.recordCount;
    });
    CreateSpace(coin_records);
    $("#coin-records span").css("display", "none");
    $("#coin-all span").text(count);
}
 
//walk place get coins top three
function CoinSort(data) {
    data.sort(function (a, b) {
        return b.walkPlaceName - a.walkPlaceName;
    });
    let newar = []
    let l = 0;
    newar.push(new Object());
    newar[0].recordCount = data[0].recordCount;
    newar[0].walkPlaceName = data[0].walkPlaceName;
    for (var i = 1; i < data.length; i++) {
        if (data[i].walkPlaceName == data[i - 1].walkPlaceName) {
            if (data[i].walkPlaceName == data[i - 1].walkPlaceName) {
                newar[l].recordCount += data[i].recordCount;
                newar[l].walkPlaceName = data[i].walkPlaceName;
            } else {
                l++;
                newar.push(new Object());
                newar[l].recordCount = data[i].recordCount;
                newar[l].walkPlaceName = data[i].walkPlaceName;
            }
        } else {
            l++;
            newar.push(new Object());
            newar[l].recordCount = data[i].recordCount;
            newar[l].walkPlaceName = data[i].walkPlaceName;
        }
    }
    newar.sort(function (a, b) {
        return b.recordCount - a.recordCount;
    });
    $("#no1-p").text(newar[0].walkPlaceName);
    $("#no1-c").text(newar[0].recordCount);
    $("#no2-p").text(newar[1].walkPlaceName);
    $("#no2-c").text(newar[1].recordCount);
    $("#no3-p").text(newar[2].walkPlaceName);
    $("#no3-c").text(newar[2].recordCount);
};

//-shop-
//create foundation list
let foundation = [];
foundation[0] = {
    "name": "台灣蠻野心足生態協會",
    "logo": "imgs/社團法人台灣蠻野心足生態協會.jpg",
    "intro": "以法律相關行動作為促進環境或棲地保護的平台，支援經濟、社會與自然環境的草根運動。期望透過訴訟、立法和行政救濟等法律機制，及與社區、公部門及民間團體共同合作，挑戰現行「犧牲環境以獲得短期政治經濟利益」所導致的不合理作為，拒絕消耗性的經濟發展，倡議與自然環境共生的永續性經濟。",
    "link": "http://zh.wildatheart.org.tw/"
}
foundation[1] = {
    "name": "台北市野鳥學會",
    "logo": "imgs/社團法人台北市野鳥學會.jpg",
    "intro": "以促進國民保護野生鳥類及其棲生環境，並倡導有關野生鳥類之「欣賞、研究與保育」工作；期許培養國民高雅知性情操與保護自然環境觀念，共同維護野鳥族群的繁衍及自然環境的保育為宗旨。",
    "link": "https://www.wbst.org.tw/"
}
foundation[2] = {
    "name": "台中縣大甲溪生態環境維護協會",
    "logo": "imgs/台中縣大甲溪生態環境維護協會.jpg",
    "intro": "草根性之保育團體，成立之目的在於保護大甲溪流域之河川、水質、森林、環境、生態之優良品質。持續推動防治毒、電、炸魚之魚類保護，河川垃圾、廢棄物之防治工作，水污染之防治、取締工作，環境教育之推廣工作，魚類棲息環境之改善協助。",
    "link": "http://discover5towns.com/a.asp?from=A12A02"
}
foundation[3] = {
    "name": "台南縣黑面琵鷺保育協會",
    "logo": "imgs/台南縣黑面琵鷺保育協會.jpg",
    "intro": "為保育全球瀕臨絕種野生動物黑面琵鷺，以學術研究、解說教育以及生態活動等方法，進行關於黑面琵鷺生態研究，保護黑面琵鷺棲息地，以及教育民眾養成注重生態保育之觀念。",
    "link": "https://www.bfsa.org.tw/"
}
foundation[4] = {
    "name": "台灣濕地保護聯盟",
    "logo": "imgs/台灣濕地保護聯盟.jpg",
    "intro": "藉由倡導、推動濕地之保育等相關工作，以保護濕地上豐富的生物多樣性。透過認養、環境信託甚至承租、購買重要之濕地，在濕地經營管理之過程中推動濕地政策法制之擬訂、濕地廊道之建構、瀕危或受脅物種之保育、並且進行教育宣導以提昇公眾之環境意識。",
    "link": "http://www.wetland.org.tw/"
}
let donate = document.getElementById("do-appe");
function createFoundation(list) {
    list.forEach(fd => {
        let box = document.createElement("div");
        box.setAttribute("class", "fd-box");

        let img_div = document.createElement("div");
        img_div.setAttribute("class", "img-div border-black bg-white");

        let img = document.createElement("img");
        img.setAttribute("src", fd.logo);

        let info = document.createElement("div");
        info.setAttribute("class", "fd-info border-black bg-white font-black");

        let title = document.createElement("h3");
        title.textContent = fd.name;

        let intro = document.createElement("p");
        intro.textContent = fd.intro;

        let link = document.createElement("a");
        link.setAttribute("href", fd.link);
        link.setAttribute("class", "font-green hover-font-yellow");
        link.textContent = "網站連結";

        let inp_div = document.createElement("div");
        inp_div.setAttribute("class", "fd-input");

        let p_i1 = document.createElement("p");
        p_i1.textContent = "贊助";

        let input = document.createElement("input");
        input.setAttribute("class", "bg-white");

        let p_i2 = document.createElement("p");
        p_i2.textContent = "個金幣";

        let enter = document.createElement("button");
        enter.setAttribute("class", "enter-btn l-btn bg-green font-white hover-bg-black hover-font-yellow border-black");
        enter.textContent = "送出";

        donate.appendChild(box);
        box.appendChild(img_div);
        box.appendChild(info);
        img_div.appendChild(img);
        info.appendChild(title);
        info.appendChild(intro);
        info.appendChild(link);
        info.appendChild(inp_div);
        info.appendChild(enter);
        inp_div.appendChild(p_i1);
        inp_div.appendChild(input);
        inp_div.appendChild(p_i2);
    })
}
createFoundation(foundation);


//-bottom space-
function CreateSpace(thisarea) {
    const space = document.createElement("div");
    space.setAttribute("id", "space");
    thisarea.appendChild(space);
}


//-previous page-
$("#back").click(function () {
    window.location.href = "walk3.html";
})


//-menu-
const coinBox = document.getElementById("coin");
const stepBox = document.getElementById("step");
const shopBox = document.getElementById("shop");
const hethBox = document.getElementById("health");
coinBox.style.display = "block";
shopBox.style.display = "none";
stepBox.style.display = "none";
hethBox.style.display = "none";
$("#menu-give").css("border-right", "#A39B86 1.5px solid");
$("#menu-shop").css("border-right", "#272727 1.5px solid");
$("#menu-record").css("border-right", "#272727 1.5px solid");
$("#menu-health").css("border-right", "#272727 1.5px solid");
let Areas = [];
Areas[0] = {
    "menuitem": "#menu-give",
    "btn": "#btngive img",
    "imgName": "btn-money",
    "area": coinBox,
}
Areas[1] = {
    "menuitem": "#menu-shop",
    "btn": "#btnshop img",
    "imgName": "btn-give",
    "area": shopBox,
}
Areas[2] = {
    "menuitem": "#menu-record",
    "btn": "#btnrecord img",
    "imgName": "btn-record",
    "area": stepBox,
}
Areas[3] = {
    "menuitem": "#menu-health",
    "btn": "#btnhealth img",
    "imgName": "btn-health",
    "area": hethBox,
}
for (let i = 0; i < Areas.length; i++) {
    clickMenu(i);
}
function clickMenu(which) {
    $(Areas[which].menuitem).click(function () {
        $(Areas[which].menuitem).css("border-right", "#A39B86 1.5px solid").css("color", "#A39B86");
        $(Areas[which].btn).attr("src", "imgs/" + Areas[which].imgName + "-click.svg");
        (Areas[which].area).style.display = "block";
        for (let i = 0; i < Areas.length; i++) {
            if (i == which) { continue; }
            $(Areas[i].menuitem).css("border-right", "#272727 1.5px solid").css("color", "#272727");
            $(Areas[i].btn).attr("src", "imgs/" + Areas[i].imgName + ".svg");
            (Areas[i].area).style.display = "none";
        }
    })
}


//-effect-
//opening animation
let outscroH = $(document).scrollTop();
let outviewH = $(window).height();
function effect() {
    $("#bg-text").css("opacity", "1");
    $("#bg-text").animate({ "top": "20px" }, 1700);
    $("#bg-p").css({ "top": "10px" }, 100);
    $("#bg-p").css({ "color": "#F5CB5C" }, 300);
    $("#bg-p").animate({ "top": "60px" }, 1700);
    setTimeout(() => {
        $('html, body').animate({ scrollTop: outviewH }, 700);
        $("#content").animate({ "top": "5vh" }, 700);
        setTimeout(() => {
            $("#logout").css("display", "block");
            $("#bg-text").animate({ "opacity": "0" }, 500)
            $("#bg-p").css({ "top": "0px" }, 100);
            $("#navbar, #logout, #navbar-border").animate({ "top": "0" }, 300);
            $("#navbar-bg").animate({ "left": "-200px" }, 500);
        }, 700)
    }, 1000)
}

//logout bg blur
ChangeDisplay("#logout", ".alertbg-black, #logout-msg", "block", FilterBlur, "#logout, #bg-text, #navbar, #content, #shop-window, #donate-window");
ChangeDisplay(".alertbg-black", ".alertbg-black, #logout-msg", "none", FilterNone, "#logout, #bg-text, #navbar, #content, #shop-window, #donate-window");
ChangeDisplay("#logout-no", ".alertbg-black, #logout-msg", "none", FilterNone, "#logout, #bg-text, #navbar, #content, #shop-window, #donate-window");

//step: walking goal progress bar
$("#menu-record").click(function () {
    $("#stl-in").css("left", "-300px");
    $("#stl-in").animate({ "left": "0" }, 1000);
});

//tooltip
$(function () {
    $(document).tooltip({
        position: { my: "center bottom", at: "center+90 top+10" }
    });
});

//walking knowledge auto slide
let walkinfo = document.getElementById("walk-i");
let walkInfoList = [];
walkInfoList[0]="每天走10000步，一星期可以瘦0.5公斤";
walkInfoList[1]="每走2000步，約消耗熱量100卡路里";
walkInfoList[2]="打30分鐘的桌球或排球，相當於走了3750步";
walkInfoList[3]="登山或游泳30分鐘，相當於走了4500步";
walkInfoList[4]="慢跑或打羽球30分鐘，相當於走了5400步";
walkInfoList.forEach(p =>{
    let info = document.createElement("p");
    info.setAttribute("class","font-black walkinfo-p");
    info.textContent = "▶" + p;
    walkinfo.appendChild(info);
});
let slideNum = 0;
let slideCount = $("#walk-i p").length;
let lastIndex = slideCount - 1;
function walkInfo() {
    setInterval(function () {
        slideNum++;
        if (slideNum > lastIndex) { slideNum = 0 };
        walkInfoSlide();
    }, 5000);
}
function walkInfoSlide() {
    let slidemove = 0 - 20 * slideNum;
    $("#walk-i").animate({"top": slidemove + "px"},200);
}
walkInfo();

//shop alert window
$("#shop-s").click(function () {
    $("#shop-window").css("display", "block");

    FilterBlur("#text, #content");
})
$("#donate-s").click(function () {
    $("#donate-window").css("display", "block");
    FilterBlur("#text, #content");
})
$(".backtoshop").click(function () {
    $("#shop-window, #donate-window").css("display", "none");
    FilterNone("#text, #content");
})