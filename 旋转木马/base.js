// 获取任意元素样式中任意属性的值
function getStyleAttribute(element, attr) {
    return window.getComputedStyle ? window.getComputedStyle(element, null)[attr] : element.currentStyle[attr];
}
// 匀速动画函数
function moveAnimate(element, json, fn) {
    clearInterval(element.timeId);
    element.timeId = setInterval(function () {
        var flag = true;
        for (var key in json) {
            if (key === 'zIndex') {
                element.style[key] = json[key];
            } else if (key === 'opacity') {
                var current = getStyleAttribute(element, key) * 100;
                var target = json[key] * 100;
                var step = target > current ? 10 : -10;
                current += step;
                if (Math.abs(target - current) > Math.abs(step)) {
                    element.style[key] = current / 100;
                } else {
                    // clearInterval(element.target);
                    element.style[key] = target / 100;
                    // 在获取样式中的属性，为了对比是否当道目标
                    current = getStyleAttribute(element, key) * 100;
                }
            } else {
                var current = parseInt(getStyleAttribute(element, key));
                var target = json[key];
                var step = target > current ? 10 : -10;
                // step = step > 0 ? Math.ceil(step) : Math.floor(step);
                current += step;
                if (Math.abs(target - current) > Math.abs(step)){
                     element.style[key] = current + 'px';
                } else {
                    element.style[key] = target / 100;
                    current = parseInt(getStyleAttribute(element, key));
                }
            }
            if (current !== target){
                flag = false;
            }
        }
        if (flag){
            clearInterval(element.timeId);
            if (fn){
                fn();
            }
        }
        // 测试代码
        console.log('当前值：' + current + '移动的值：' + step + '目标的值：' + target);
    }, 20);
}
// 实现多个元素属性的变化函数-变速动画函数
function veriableSpeedAnimate(element, json, fn) {
    clearInterval(element.timeId);
    element.timeId = setInterval(function () {
        // var current = element.getStyleAttribute()
        var flag = true;
        for (var key in json) {
            if (key === 'zIndex') {
                element.style[key] = json[key];
            } else if (key === 'opacity') {
                var current = getStyleAttribute(element, key) * 100;
                var target = json[key] * 100;
                var step = (target - current) / 10;
                step = step > 0 ? Math.ceil(step) : Math.floor(step);
                current += step;
                element.style[key] = current / 100;
            } else {
                var current = parseInt(getStyleAttribute(element, key));
                var target = json[key];
                var step = (target - current) / 10;
                step = step > 0 ? Math.ceil(step) : Math.floor(step);
                current += step;
                element.style[key] = current + 'px';
            }
            if (current !== target) {
                flag = false;
            }
        }
        if (flag) {
            clearInterval(element.timeId);
            if (fn) {
                fn();
            }
        }
        // 测试代码
        // console.log('当前值：' + current + '移动的值：' + step + '目标的值：' + target);
    }, 20);
}