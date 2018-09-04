// 点击×来关闭页面顶部广告栏
var closeAdObject = document.querySelector('.close_ad');
// closeAdObject.addEventListener('click',function(){
//     var adObject = document.querySelector('.J_event');
//     adObject.style.display = 'none';
// })
addEventListener(closeAdObject, 'click', function () {
    var adObject = document.querySelector('.J_event');
    adObject.style.display = 'none';
})
// 搜索框的焦点事件，当搜索框获取焦点是重置里面的vaule值，当离开焦点是恢复
var mainSearch = document.querySelector('.in_search');
addEventListener(mainSearch, 'focus', function () {
    this.placeholder = '';
    this.style.color = '#000000';
});
addEventListener(mainSearch, 'blur', function () {
    if (this.value) {
        this.style.color = '#ccc';
    } else {
        this.placeholder = '12345';
    }
});
// 公告栏tab切换的效果
var boardTitles = document.querySelectorAll('.title_first,.title_second');
console.log(boardTitles);
function clickTitleHandle() {
    var announcementObject = document.querySelector('.announcement');
    var promotionObject = document.querySelector('.promotion');
    for (var i = 0; i < boardTitles.length; i++) {
        boardTitles[i].style.border = 'none';
    }
    this.style.borderBottom = '1px solid #f10219';
    if (this.innerHTML === '促销') {
        announcementObject.classList.add('hidden');
        promotionObject.classList.remove('hidden');
    } else if (this.innerHTML === '公告') {
        promotionObject.classList.add('hidden');
        announcementObject.classList.remove('hidden');
    }
    return false;
}
for (var i = 0; i < boardTitles.length; i++) {
    // addEventListener(boardTitles[i],'click',clickTitleHandle,false);
    boardTitles[i].onclick = clickTitleHandle;
}
