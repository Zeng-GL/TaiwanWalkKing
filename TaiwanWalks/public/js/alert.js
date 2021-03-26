//blur
function FilterBlur(items){
    $(items).css("filter","blur(5px)");
}
function FilterNone(items){
    $(items).css("filter","blur(0px)");
}
FilterBlur("body > * :not(#loading, #login-msg)");

//loading effect
loadingEffect();
function loadingEffect(){
    let loading = document.createElement("div");
    loading.setAttribute("id","loading");
    loading.setAttribute("class","loading");
    let div2 = document.createElement("div");
    let p0 = document.createElement("p");
    p0.setAttribute("id","p0");
    p0.textContent = "Loading";
    let p1 = document.createElement("p");
    p1.setAttribute("id","p1");
    p1.textContent = "∎";
    let p2 = document.createElement("p");
    p2.setAttribute("id","p2");
    p2.textContent = "∎";
    let p3 = document.createElement("p");
    p3.setAttribute("id","p3");
    p3.textContent = "∎";
    document.body.appendChild(loading);
    loading.appendChild(div2);
    div2.appendChild(p0);
    div2.appendChild(p1);
    div2.appendChild(p2);
    div2.appendChild(p3);
}

function ClossLoading(){
    $('#loading').css("display", "none");
    FilterNone("body > * :not(#loading, #login-msg)");
}

//login status alert window
function alertBox(content){
    $("body").css("overflow","hidden");
    let div = document.createElement("div");
    div.setAttribute("class","prompt alertbox bg-white font-black border-black");
    let p = document.createElement("p");
    p.textContent = content;
    let div2 = document.createElement("div");
    let btn = document.createElement("button");
    btn.setAttribute("id","yes");
    btn.setAttribute("type","button");
    btn.setAttribute("class","l-btn font-white border-black bg-gray hover-bg-yellow hover-font-black hover-border-black");
    btn.textContent = "確定";
    document.body.appendChild(div);
    div.appendChild(p);
    div.appendChild(div2);
    div2.appendChild(btn);
}