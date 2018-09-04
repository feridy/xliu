// 通用的兼容性代码
// 1.兼容性的事件函数
function addEventListener(element,type,fn,vertify){
    if (element.addEventListener){
        element.addEventListener(type,fn,vertify);
    } else if (element.attechEvent){
        element.attachEvent('on'+type,fn);
    } else {
        element['on' + type] = fn; 
    }
}
