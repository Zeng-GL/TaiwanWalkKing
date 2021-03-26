//偷懶用的function

//一次換很多display
function ChangeDisplay(clickone, items, display, func, funcItems) {
    $(clickone).click(function () {
        $(items).css("display", display);
        if (func == FilterBlur) {
            FilterBlur(funcItems);
        }
        if (func == FilterNone) {
            FilterNone(funcItems);
        }
    });
}

//使用input的select
function stopPropagation(e) {
    if (e.stopPropagation) {
        /*stopPropagation符合W3C標準．適用於FireFox等瀏覽器，不支持IE*/
        e.stopPropagation();
    } else {
        /*cancelBubble方法不符合W3C的標準．且只支持IE瀏覽器*/
        e.cancelBubble = true;
    }
}
function inputSelect(selectName, inputName, selectSize) {
    inputName.onclick = function (e) {
        selectName.style.display = 'block';
        stopPropagation(e);
    }
    selectName.size = selectSize;
    selectName.onchange = function (e) {
        let option = this.options[this.selectedIndex];
        inputName.value = option.innerHTML;
        selectName.style.display = 'none';
    }
}


//date format (YYYY/MM/DD)
function yyyymmdd(date) {
    date = date.toString();
    date = date.slice(4, 15);
    let mon = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
    for(i = 0; i<mon.length;i++){
        if(date.slice(0,3)==mon[i]){
            date = date.slice(7, 11) + "/" + (i+1) + "/" + date.slice(4, 6);
            if(date.length< 10) { date = date.slice(0, 8) + "0" + date.slice(8) } 
        }
    }
    return date;
};
