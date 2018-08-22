function cal_fontSize(){
    const docElement = document.documentElement;
    const clientWidth = docElement.clientWidth > 750? 750 : docElement.clientWidth;
    docElement.style.fontSize = 20 * (clientWidth / 375) + 'px';
}

cal_fontSize();
window.addEventListener('resize',cal_fontSize);