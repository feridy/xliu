function cal_fontSize(){
    var clientWidth = document.documentElement.clientWidth;
    var docWidth = clientWidth > 780 ? 780 : clientWidth;
    document.documentElement.style.fontSize = 20 * (docWidth / 375) + 'px';
}

cal_fontSize();

window.addEventListener('resize',cal_fontSize);