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
                if (Math.abs(target - current) > Math.abs(step)) {
                    element.style[key] = current + 'px';
                } else {
                    element.style[key] = target + 'px';
                    current = parseInt(getStyleAttribute(element, key));
                }
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
        console.log('当前值：' + current + '移动的值：' + step + '目标的值：' + target);
    }, 20);
}
// 1.将事件处理参数e与window.envent进行兼容-兼容IE8
// 2.clientX和clientY使用的兼容
// 3.页面卷曲的scrollLeft和scrollTop兼容代码
// 4.事件处理参数e.pageX和e.pageY的兼容代码
// 5.事件监听函数，为了使用window.addEventListener ---兼容IE8
var eventObject = {
    addEventListener: function (element,eventName,fn){
        if (window.addEventListener){
            element.addEventListener(eventName,fn,false);
        } else if (window.attachEvent){
            element.attachEvent(('on'+eventName),fn);
        } else {
            element['on' + eventName] = fn;
        }
    },
    getEventParam: function (e) {
        return window.event || e;
    },
    getClientX: function (e) {
        return this.getEventParam(e).clientX;
    },
    getClientY: function (e) {
        return this.getEventParam(e).clientY;
    },
    getScrollLeft: function () {
        return window.pageXOffset || document.documentElement.scrollLeft || document.body.scrollLeft || 0;
    },
    getScrollTop: function () {
        return window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
    },
    getPageX: function (e) {
        return this.getEventParam(e).pageX ? this.getEventParam(e).pageX : this.getClientX(e) + this.getScrollLeft();
    },
    getPageY: function (e) {
        return this.getEventParam(e).pageY ? this.getEventParam(e).pageY : this.getClientY(e) + this.getScrollTop();
    }
};