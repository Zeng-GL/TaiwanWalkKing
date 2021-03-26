//login status
function callName() {
    let str = localStorage.getItem('myName');
    let csk = localStorage.getItem('checkStatusTimes');
    if (str && str.length > 0) {
        window.onload = () => {
            ClossLoading();
            start();
        }
        if (csk == 1) {
            // alert('Welcome back！' + str);
            csk++;
            localStorage.setItem('checkStatusTimes', csk);
        }
        if (csk == 0) {
            alert('歡迎加入台灣步道王！' + str);
            csk = csk + 2;
            localStorage.setItem('checkStatusTimes', csk);
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

// 1. 設定卡片樣式 & 圖片大小 & 卡片內容(詳細介紹 & 進入遊戲的按鈕)

// 3. 天氣API(要準備幾種天氣情況的圖片，然後判斷抓到的API是哪種天氣型態，再決定用哪種圖片，可用switch case)
// 4. 卡片要計算點擊次數，算瀏覽人次




function start() {

    $(window).on("scroll resize",function(){
        // let moveShow = window.scrollTop()-$("#secondhead").scrollTop()
        var $this = $(this);
        var $this_top = $(this).scrollTop();
        if($this_top >100){
            $("#move-navbar").stop().animate({top:"0px"})
        }else{
            $("#move-navbar").stop().animate({top:"-65px"})
        }
    })

    $.ajax({
        url: 'http://140.112.30.202:3000/walkPlaceList',
        type: 'GET',
        dataType : "json",
        success: function(data){
                // console.log(data);
                $("#north").click(function(){
                var norths = data.filter(p => p.walkCity == '北');
                // console.log(norths);

                $("#box").empty();
                const container = document.createElement('div');
                container.setAttribute('class','container');
                $("#box").append(container);
                
                let $body  = (window.opera) ? (document.compatMode == "CSS1Compat" ? $('html') : $('body')) : $('html,body');
                $body.animate({
                    scrollTop:$("#box").offset().top
                },100);
              
                for (var i in norths) {
                    // console.log(norths[i].walkPlaceName);

                    

                    const card = document.createElement('div');
                    card.setAttribute('class','card');

                    const cardHeader = document.createElement('div');
                    cardHeader.setAttribute('class','card_header');
    
                    const cardBody =document.createElement('div');
                    cardBody.setAttribute('class','card_body');

                    const button = document.createElement('input');
                    button.setAttribute('type','button');
                    button.setAttribute('value','詳細介紹')
                    button.setAttribute('id','card_button')
                    button.className = "btn btn-outline-primary";
                    button.onclick = exampleOnclick;
                    // button.onclick = sendnumber;

                    const walkDetail = document.createElement('p'); 
                    walkDetail.textContent = norths[i].walkDetial;

                    const pic = document.createElement('img');
                    pic.setAttribute('class','pic');
                    pic.src = norths[i].walkPic1;
                    pic.alt="Picture";

                    console.log(pic);
                    // 瀏覽人次 : 和button被點擊次數結合
                    const viewTimes = document.createElement('small');
                    // viewTimes.textContent = (button被點擊次數結合)

                    // function sendnumber(){
                    //     $.ajax({
                    //         url:'/records/id',
                    //         type:'PUT',
                    //         data:{
                    //             "walkId": norths[i].walkId,
                    //             "walkPlaceName": "test",
                    //             "walkCity": "test",
                    //             "walkAddress": "test",
                    //             "walkDetial": "test",
                    //             "walkTel": "test886-2-24991115",
                    //             "walkLength": "test",
                    //             "walkTime": "1",
                    //             "walkPic1": null,
                    //             "walkPic2": null,
                    //             "addressLat": null,
                    //             "addressLng": null,
                    //             "iconLat1": null,
                    //             "iconLng1": null,
                    //             "iconLat2": null,
                    //             "iconLng2": null,
                    //             "iconLat3": null,
                    //             "iconLng3": null,
                    //             "iconLat4": null,
                    //             "iconLng4": "test",
                    //             "walkArea": "test",
                    //             "visited": 100
                    //         }
                    //     })
                    // }
                    
                  
                    function exampleOnclick() {
                        // console.log(pic)

                        var exampleModal = getExampleModal();
                        
                        // Init the modal if it hasn't been already.
                        if (!exampleModal) { exampleModal = initExampleModal(); }
            
                        var html =
                        '<div class="modal-header">' +
                        '<h5 class="modal-title" id="exampleModalCenter">'+
                        walkPlaceName.innerHTML+
                        '</h5>' +
                        '<button type="button" class="close" data-dismiss="modal" aria-label="Close" id="X_close">' +
                        '<span aria-hidden="true">&times;</span>' +
                        '</button>' +
                        '</div>' +
                        '<div class="modal-body">' +
                        walkDetail.innerHTML+
                        '</div>' +
                        '<div class="modal-footer">' +
                        '<button type="button" class="btn btn-secondary" data-dismiss="modal" id="Button_close">關閉</button>' +
                        '<button type="button" class="btn btn-primary" id="start_game"><a href="./mapTest3.html">前往遊戲畫面</a></button>' +
                       
                        '</div>';
                            
            
                        setExampleModalContent(html);
            
                        // Show the modal.
                        $("#exampleModalCenter").modal('show');
            
            
                        $("#Button_close").click(function(){
                            $("#exampleModalCenter").modal('hide');
                        });
            
                        $("#X_close").click(function(){
                            $("#exampleModalCenter").modal('hide');
                        });

                    }
            
                    function getExampleModal() {
                        return document.getElementById('exampleModalCenter');
                    }
            
                    function setExampleModalContent(html) {
                        getExampleModal().querySelector('.modal-content').innerHTML = html;
                    }
            
                    function initExampleModal() {
                        var modal = document.createElement('div');
                        modal.classList.add('modal', 'fade');
                        modal.setAttribute('id', 'exampleModalCenter');
                        modal.setAttribute('tabindex', '-1');
                        modal.setAttribute('role', 'dialog');
                        modal.setAttribute('aria-labelledby', 'exampleModalCenterTitle');
                        modal.setAttribute('aria-hidden', 'true');
                        modal.innerHTML =
                            '<div class="modal-dialog modal-dialog-centered" role="document">' +
                            '<div class="modal-content"></div>' +
                            '</div>';
                        document.body.appendChild(modal);
                        return modal;
                    }

                    const picFrame = document.createElement('div');
                    picFrame.setAttribute('class','card_frame col-8  align-self-center');

    
                    const walkPlaceName = document.createElement('h2');
                    walkPlaceName.textContent = norths[i].walkPlaceName;

                    

                    const walkLength = document.createElement('p');
                    walkLength.textContent = norths[i].walkLength;

                    const walkTime = document.createElement('p');
                    walkTime.textContent = norths[i].walkTime;

                    
                    const walkAddress = document.createElement('small');
                    walkAddress.textContent = norths[i].walkAddress;

                    

                    container.appendChild(card);
                    card.appendChild(cardHeader);
                    cardHeader.appendChild(walkPlaceName);
                    card.appendChild(picFrame);
                    picFrame.appendChild(pic);
                    // cardBody.appendChild(pic);
                    card.appendChild(cardBody);
                    walkLength.prepend("步道長度 :");
                    walkLength.append("m");
                    walkTime.prepend("行走時間 :");
                    walkTime.append("小時");
                    cardBody.appendChild(walkLength);
                    cardBody.appendChild(walkTime );
                    cardBody.appendChild(walkAddress);
                    cardBody.appendChild(button);
                
                    
                }
            });





















            $("#center").click(function(){
                var norths = data.filter(p => p.walkCity == '中');
                console.log(norths);

                $("#box").empty();
                const container = document.createElement('div');
                container.setAttribute('class','container');
                $("#box").append(container);

                let $body  = (window.opera) ? (document.compatMode == "CSS1Compat" ? $('html') : $('body')) : $('html,body');
                $body.animate({
                    scrollTop:$("#box").offset().top
                },100);
              
                for (var i in norths) {
                    // console.log(norths[i].walkPlaceName);

                    

                    const card = document.createElement('div');
                    card.setAttribute('class','card');

                    const cardHeader = document.createElement('div');
                    cardHeader.setAttribute('class','card_header');
    
                    const cardBody =document.createElement('div');
                    cardBody.setAttribute('class','card_body');

                    const button = document.createElement('input');
                    button.setAttribute('type','button');
                    button.setAttribute('value','詳細介紹')
                    button.setAttribute('id','card_button')
                    button.className = "btn btn-outline-primary";
                    button.onclick = exampleOnclick;

                    const walkDetail = document.createElement('p'); 
                    walkDetail.textContent = norths[i].walkDetial;
                  
                    function exampleOnclick() {

                        
                       
                        var exampleModal = getExampleModal();
            
                        // Init the modal if it hasn't been already.
                        if (!exampleModal) { exampleModal = initExampleModal(); }
            
                        var html =
                            '<div class="modal-header">' +
                            '<h5 class="modal-title" id="exampleModalCenterTitle">'+
                            walkPlaceName.innerHTML+
                            '</h5>' +
                            '<button type="button" class="close" data-dismiss="modal" aria-label="Close" id="X_close">' +
                            '<span aria-hidden="true">&times;</span>' +
                            '</button>' +
                            '</div>' +
                            '<div class="modal-body">' +
                            walkDetail.innerHTML+
                            '</div>' +
                            '<div class="modal-footer">' +
                            '<button type="button" class="btn btn-secondary" data-dismiss="modal" id="Button_close">關閉</button>' +
                            '<button type="button" class="btn btn-primary" id="start_game"><a href="./mapTest3.html">前往遊戲畫面</a></button>' +
                           
                            '</div>';
            
                        setExampleModalContent(html);
            
                        // Show the modal.
                        $("#exampleModalCenter").modal('show');
            
            
                        $("#Button_close").click(function(){
                            $("#exampleModalCenter").modal('hide');
                        });
            
                        $("#X_close").click(function(){
                            $("#exampleModalCenter").modal('hide');
                        });


                    }
            
                    function getExampleModal() {
                        return document.getElementById('exampleModalCenter');
                    }
            
                    function setExampleModalContent(html) {
                        getExampleModal().querySelector('.modal-content').innerHTML = html;
                    }
            
                    function initExampleModal() {
                        var modal = document.createElement('div');
                        modal.classList.add('modal', 'fade');
                        modal.setAttribute('id', 'exampleModalCenter');
                        modal.setAttribute('tabindex', '-1');
                        modal.setAttribute('role', 'dialog');
                        modal.setAttribute('aria-labelledby', 'exampleModalCenterTitle');
                        modal.setAttribute('aria-hidden', 'true');
                        modal.innerHTML =
                            '<div class="modal-dialog modal-dialog-centered" role="document">' +
                            '<div class="modal-content"></div>' +
                            '</div>';
                        document.body.appendChild(modal);
                        return modal;
                    }

                    const picFrame = document.createElement('div');
                    picFrame.setAttribute('class','card_frame col-8  align-self-center');

    
                    const walkPlaceName = document.createElement('h2');
                    walkPlaceName.textContent = norths[i].walkPlaceName;

                    

                    const walkLength = document.createElement('p');
                    walkLength.textContent = norths[i].walkLength;

                    const walkTime = document.createElement('p');
                    walkTime.textContent = norths[i].walkTime;

                    
                    const walkAddress = document.createElement('small');
                    walkAddress.textContent = norths[i].walkAddress;

                    // 瀏覽人次 : 和button被點擊次數結合
                    // const viewTimes = document.createElement('small');
                    // viewTimes.textContent = (button被點擊次數結合)

                    const pic = document.createElement('img');
                    pic.setAttribute('class','pic');
                    pic.src = norths[i].walkPic1;
                    pic.alt="Picture",

                    container.appendChild(card);
                    card.appendChild(cardHeader);
                    cardHeader.appendChild(walkPlaceName);
                    card.appendChild(picFrame);
                    picFrame.appendChild(pic);
                    cardBody.appendChild(pic);
                    card.appendChild(cardBody);
                    walkLength.prepend("步道長度 :");
                    walkLength.append("m");
                    walkTime.prepend("行走時間 :");
                    walkTime.append("小時");
                    cardBody.appendChild(walkLength);
                    cardBody.appendChild(walkTime );
                    cardBody.appendChild(walkAddress);
                    cardBody.appendChild(button);
                    
                }
                
            });

            $("#south").click(function(){
                var norths = data.filter(p => p.walkCity == '南');
                console.log(norths);

                $("#box").empty();
                const container = document.createElement('div');
                container.setAttribute('class','container');
                $("#box").append(container);
                
                let $body  = (window.opera) ? (document.compatMode == "CSS1Compat" ? $('html') : $('body')) : $('html,body');
                $body.animate({
                    scrollTop:$("#box").offset().top
                },100);
              
                for (var i in norths) {
                    // console.log(norths[i].walkPlaceName);

                    

                    const card = document.createElement('div');
                    card.setAttribute('class','card');

                    const cardHeader = document.createElement('div');
                    cardHeader.setAttribute('class','card_header');
    
                    const cardBody =document.createElement('div');
                    cardBody.setAttribute('class','card_body');

                    const button = document.createElement('input');
                    button.setAttribute('type','button');
                    button.setAttribute('value','詳細介紹')
                    button.setAttribute('id','card_button')
                    button.className = "btn btn-outline-primary";
                    button.onclick = exampleOnclick;

                    const walkDetail = document.createElement('p'); 
                    walkDetail.textContent = norths[i].walkDetial;
                  
                    function exampleOnclick() {

                        // const walkDetail = document.createTextNode('p'); 
                        // walkDetail.textContent = norths[i].walkDetial;
                       
                        var exampleModal = getExampleModal();
            
                        // Init the modal if it hasn't been already.
                        if (!exampleModal) { exampleModal = initExampleModal(); }
            
                        var html =
                        '<div class="modal-header">' +
                        '<h5 class="modal-title" id="exampleModalCenterTitle">'+
                        walkPlaceName.innerHTML+
                        '</h5>' +
                        '<button type="button" class="close" data-dismiss="modal" aria-label="Close" id="X_close">' +
                        '<span aria-hidden="true">&times;</span>' +
                        '</button>' +
                        '</div>' +
                        '<div class="modal-body">' +
                        walkDetail.innerHTML+
                        '</div>' +
                        '<div class="modal-footer">' +
                        '<button type="button" class="btn btn-secondary" data-dismiss="modal" id="Button_close">關閉</button>' +
                        '<button type="button" class="btn btn-primary" id="start_game"><a href="./mapTest3.html">前往遊戲畫面</a></button>' +
                       
                        '</div>';
            
                        setExampleModalContent(html);
            
                        // Show the modal.
                        $("#exampleModalCenter").modal('show');
            
            
                        $("#Button_close").click(function(){
                            $("#exampleModalCenter").modal('hide');
                        });
            
                        $("#X_close").click(function(){
                            $("#exampleModalCenter").modal('hide');
                        });
                    }
            
                    function getExampleModal() {
                        return document.getElementById('exampleModalCenter');
                    }
            
                    function setExampleModalContent(html) {
                        getExampleModal().querySelector('.modal-content').innerHTML = html;
                    }
            
                    function initExampleModal() {
                        var modal = document.createElement('div');
                        modal.classList.add('modal', 'fade');
                        modal.setAttribute('id', 'exampleModalCenter');
                        modal.setAttribute('tabindex', '-1');
                        modal.setAttribute('role', 'dialog');
                        modal.setAttribute('aria-labelledby', 'exampleModalCenterTitle');
                        modal.setAttribute('aria-hidden', 'true');
                        modal.innerHTML =
                            '<div class="modal-dialog modal-dialog-centered" role="document">' +
                            '<div class="modal-content"></div>' +
                            '</div>';
                        document.body.appendChild(modal);
                        return modal;
                    }

                    const picFrame = document.createElement('div');
                    picFrame.setAttribute('class','card_frame col-8  align-self-center');

    
                    const walkPlaceName = document.createElement('h2');
                    walkPlaceName.textContent = norths[i].walkPlaceName;

                    

                    const walkLength = document.createElement('p');
                    walkLength.textContent = norths[i].walkLength;

                    const walkTime = document.createElement('p');
                    walkTime.textContent = norths[i].walkTime;

                    
                    const walkAddress = document.createElement('small');
                    walkAddress.textContent = norths[i].walkAddress;

                    // 瀏覽人次 : 和button被點擊次數結合
                    // const viewTimes = document.createElement('small');
                    // viewTimes.textContent = (button被點擊次數結合)

                    const pic = document.createElement('img');
                    pic.setAttribute('class','pic');
                    pic.src = norths[i].walkPic1;
                    pic.alt="Picture",

                    container.appendChild(card);
                    card.appendChild(cardHeader);
                    cardHeader.appendChild(walkPlaceName);
                    card.appendChild(picFrame);
                    picFrame.appendChild(pic);
                    cardBody.appendChild(pic);
                    card.appendChild(cardBody);
                    walkLength.prepend("步道長度 :");
                    walkLength.append("m");
                    walkTime.prepend("行走時間 :");
                    walkTime.append("小時");
                    cardBody.appendChild(walkLength);
                    cardBody.appendChild(walkTime );
                    cardBody.appendChild(walkAddress);
                    cardBody.appendChild(button);
                    
                }
            });

            $("#east").click(function(){
                var norths = data.filter(p => p.walkCity == '東');
                // console.log(norths);
                $("#box").empty();
                const container = document.createElement('div');
                container.setAttribute('class','container');
                $("#box").append(container);
                
                let $body  = (window.opera) ? (document.compatMode == "CSS1Compat" ? $('html') : $('body')) : $('html,body');
                $body.animate({
                    scrollTop:$("#box").offset().top
                },100);
              
                for (var i in norths) {
                    // console.log(norths[i].walkPlaceName);

                    

                    const card = document.createElement('div');
                    card.setAttribute('class','card');

                    const cardHeader = document.createElement('div');
                    cardHeader.setAttribute('class','card_header');
    
                    const cardBody =document.createElement('div');
                    cardBody.setAttribute('class','card_body');

                    const button = document.createElement('div');
                    button.setAttribute('class','card_button');
                    const buttonWord = document.createTextNode("詳細介紹")
                    $("card_button").click(function(){
                        //浮出步道詳細介紹視窗 + 進入遊戲 & 關閉視窗按鈕

                        // 送瀏覽人次API回去
                    })
                    

                    const picFrame = document.createElement('div');
                    picFrame.setAttribute('class','card_frame');

    
                    const walkPlaceName = document.createElement('h2');
                    walkPlaceName.textContent = norths[i].walkPlaceName;

                    const walkDetail = document.createElement('p');
                    walkDetail.textContent = norths[i].walkDetial;

                    const walkLength = document.createElement('p');
                    walkLength.textContent = norths[i].walkLength;

                    const walkTime = document.createElement('p');
                    walkTime.textContent = norths[i].walkTime;

                    
                    const walkAddress = document.createElement('small');
                    walkAddress.textContent = norths[i].walkAddress;

                    // 瀏覽人次 : 和button被點擊次數結合
                    // const viewTimes = document.createElement('small');
                    // viewTimes.textContent = (button被點擊次數結合)

                    const pic = document.createElement('img');
                    pic.src = norths[i].walkPic1;
                    pic.alt="Picture",

                    container.appendChild(card);
                    card.appendChild(cardHeader);
                    cardHeader.appendChild(walkPlaceName);
                    // card.appendChild(picFrame);
                    // picFrame.appendChild(pic);
                    cardBody.appendChild(pic);
                    card.appendChild(cardBody);
                    walkLength.prepend("步道長度 :");
                    walkLength.append("m");
                    walkTime.prepend("行走時間 :");
                    walkTime.append("小時");
                    cardBody.appendChild(walkLength);
                    cardBody.appendChild(walkTime );
                    cardBody.appendChild(walkAddress);
                    cardBody.appendChild(button);
                    button.appendChild(buttonWord);
                }
            });

            $("#getArea").click(function(){
                
                let select = $("#area").val();
                let selectOK = data.filter(p => p.walkArea == select);
                console.log(selectOK);

                $("#box").empty();
                const container = document.createElement('div');
                container.setAttribute('class','container');
                $("#box").append(container);
                
                let $body  = (window.opera) ? (document.compatMode == "CSS1Compat" ? $('html') : $('body')) : $('html,body');
                $body.animate({
                    scrollTop:$("#box").offset().top
                },100);
              
                for (var i in selectOK) {
                                              

                    const card = document.createElement('div');
                    card.setAttribute('class','card');

                    const cardHeader = document.createElement('div');
                    cardHeader.setAttribute('class','card_header');
    
                    const cardBody =document.createElement('div');
                    cardBody.setAttribute('class','card_body');

                    const button = document.createElement('input');
                    button.setAttribute('type','button');
                    button.setAttribute('value','詳細介紹')
                    button.setAttribute('id','card_button')
                    button.className = "btn btn-outline-primary";
                    button.onclick = exampleOnclick;

                    const walkDetail = document.createElement('p'); 
                    walkDetail.textContent = selectOK[i].walkDetial;
                   

                    function exampleOnclick() {

                        // const walkDetail = document.createTextNode('p'); 
                        // walkDetail.textContent = norths[i].walkDetial;
                       
                        var exampleModal = getExampleModal();
            
                        // Init the modal if it hasn't been already.
                        if (!exampleModal) { exampleModal = initExampleModal(); }
            
                        var html =
                        '<div class="modal-header">' +
                        '<h5 class="modal-title" id="exampleModalCenterTitle">'+
                        walkPlaceName.innerHTML+
                        '</h5>' +
                        '<button type="button" class="close" data-dismiss="modal" aria-label="Close" id="X_close">' +
                        '<span aria-hidden="true">&times;</span>' +
                        '</button>' +
                        '</div>' +
                        '<div class="modal-body">' +
                        walkDetail.innerHTML+
                        '</div>' +
                        '<div class="modal-footer">' +
                        '<button type="button" class="btn btn-secondary" data-dismiss="modal" id="Button_close">關閉</button>' +
                        '<button type="button" class="btn btn-primary" id="start_game"><a href="./mapTest3.html">前往遊戲畫面</a></button>' +
                       
                        '</div>';
            
                        setExampleModalContent(html);
            
                        // Show the modal.
                        $("#exampleModalCenter").modal('show');
            
            
                        $("#Button_close").click(function(){
                            $("#exampleModalCenter").modal('hide');
                        });
            
                        $("#X_close").click(function(){
                            $("#exampleModalCenter").modal('hide');
                        });
                    }
            
                    function getExampleModal() {
                        return document.getElementById('exampleModalCenter');
                    }
            
                    function setExampleModalContent(html) {
                        getExampleModal().querySelector('.modal-content').innerHTML = html;
                    }
            
                    function initExampleModal() {
                        var modal = document.createElement('div');
                        modal.classList.add('modal', 'fade');
                        modal.setAttribute('id', 'exampleModalCenter');
                        modal.setAttribute('tabindex', '-1');
                        modal.setAttribute('role', 'dialog');
                        modal.setAttribute('aria-labelledby', 'exampleModalLabel');
                        modal.setAttribute('aria-hidden', 'true');
                        modal.innerHTML =
                            '<div class="modal-dialog modal-dialog-centered" role="document">' +
                            '<div class="modal-content"></div>' +
                            '</div>';
                        document.body.appendChild(modal);
                        return modal;
                    }
                    // $("card_button").click(function(){
                        //浮出步道詳細介紹視窗 + 進入遊戲 & 關閉視窗按鈕

                        // 送瀏覽人次API回去
                    // })
                    

                    const picFrame = document.createElement('div');
                    picFrame.setAttribute('class','card_frame col-8  align-self-center');

    
                    const walkPlaceName = document.createElement('h2');
                    walkPlaceName.textContent = selectOK[i].walkPlaceName;

                    // const walkDetail = document.createElement('p');
                    // walkDetail.textContent = selectOK[i].walkDetial;

                    const walkLength = document.createElement('p');
                    walkLength.textContent = selectOK[i].walkLength;

                    const walkTime = document.createElement('p');
                    walkTime.textContent = selectOK[i].walkTime;

                    
                    const walkAddress = document.createElement('small');
                    walkAddress.textContent = selectOK[i].walkAddress;

                    // 瀏覽人次 : 和button被點擊次數結合
                    // const viewTimes = document.createElement('small');
                    // viewTimes.textContent = (button被點擊次數結合)

                    const pic = document.createElement('img');
                    pic.setAttribute('class','pic');
                    pic.src = selectOK[i].walkPic1;
                    pic.alt="Picture",

                    container.appendChild(card);
                    card.appendChild(cardHeader);
                    cardHeader.appendChild(walkPlaceName);
                    // card.appendChild(picFrame);
                    // picFrame.appendChild(pic);
                    cardBody.appendChild(pic);
                    card.appendChild(cardBody);
                    walkLength.prepend("步道長度 :");
                    walkLength.append("m");
                    walkTime.prepend("行走時間 :");
                    walkTime.append("小時");
                    cardBody.appendChild(walkLength);
                    cardBody.appendChild(walkTime );
                    cardBody.appendChild(walkAddress);
                    cardBody.appendChild(button);
                    
                }
            })
                
          },

          error: function (xhr) { alert("發生錯誤: " + xhr.status + " " + xhr.statusText); }
        });
    
}


