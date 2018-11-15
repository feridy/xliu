// 这个页面有三个js行为
// 1.搜索顶部栏，根据页面卷曲出去的高度，进行背景颜色透明度变化
// 1.1 透明度默认为为透明色
// 1.2 根据页面卷曲出去的高度，透明度一点点增加
// 1.3 当卷曲出去的高度等于轮播图的高度时，透明达到0.84 并固定不变
// 2. 轮播图动画效果
// 2.1 触摸移动图片切换图片
// 2.2 图片更换完，改变当前的点的背景
// 2.3 自动播放切换图片
window.onload = function (){
    changeOpacity();
    changeBanner();
};
// 改变顶部搜索框容器的背景颜色透明度
changeOpacity = function (){
    var jdHead = document.querySelector('.jd_head');
    var jdBanner = document.querySelector('.jd_banner');
    var bannerHeight = jdBanner.offsetHeight;
    // 页面滚动事件
    window.addEventListener('scroll',function (){
        var scrollTop = document.body.scrollTop || document.documentElement.scrollTop || window.pageYOffset || 0;
        // console.log(scrollTop);
        var opacity = 0.84;
         if (scrollTop <= bannerHeight){
            opacity = (scrollTop / bannerHeight) * opacity;
            // console.log(opacity);
         }
        //  console.log(opacity);
         jdHead.style.backgroundColor = 'rgba(201,21,35,'+ opacity +')';
    });
};
// 轮播图
changeBanner = function (){
    var timeId;
    var jdBanner = document.querySelector('.jd_banner');
    var bannerContain = document.querySelector('.jd_banner > ul:first-child');
    var bannerList = document.querySelectorAll('.jd_banner > ul:first-child > li');
    var bannerWidth = bannerList[0].offsetWidth;
    var index = 1;
    var startX, moveX,currentX,targetX;

    jdBanner.addEventListener('touchstart',function (e){
        if (timeId){
            clearInterval(timeId);
        }
        startX = e.changedTouches[0].clientX;
    });
    jdBanner.addEventListener('touchmove',function (e) {
       moveX = e.changedTouches[0].clientX - startX;
       currentX = -index * bannerWidth + moveX;
       targetX = currentX;
       bannerContain.style.transform = 'translateX(' + targetX + 'px)';
    });
    jdBanner.addEventListener('touchend',function (e){
        // moveX > 0 向右滑动
        // moveX < 0 向左滑动
        if (moveX > 0){
            if (moveX >= bannerWidth / 4){
                if ( index === 1){
                    // index 是从8 到 1
                    index = bannerList.length - 1;
                }
                index--;
                // currentX = -index * bannerWidth + moveX;
                targetX = currentX + bannerWidth - moveX; 
                animation(bannerContain,currentX,targetX);
                // bannerContain.style.transform = 'translateX(' + targetX + 'px)';
                console.log(targetX);
            } else {
                targetX = currentX -moveX;
                animation(bannerContain,currentX,targetX);
            }
            console.log(targetX);
        } else {
          if (-moveX >= bannerWidth / 4){
              // index 是从1 到 8
              if(index === bannerList.length - 2) {
                  index = 0;
              }
              index++;
              console.log(index);
              targetX = currentX - bannerWidth - moveX;
              animation(bannerContain,currentX,targetX);
            //bannerContain.style.transform = 'translateX('+ targetX + 'px)';
            //console.log(targetX);
          } else {
              targetX = currentX - moveX;
              animation(bannerContain,currentX,targetX);
          }
        }
        var pointList = document.querySelectorAll('.jd_banner > ul:last-child > li');
        for (var i = 0; i < pointList.length; i++){
            pointList[i].classList.remove('current');
        }
        pointList[index-1].classList.toggle('current');

       timeId = autoToggleImage();
    });
    
    // 自动轮播图片
    var autoToggleImage = function (){
        var timeId = setInterval(function (){
            currentX = -index * bannerWidth;
            targetX = currentX - bannerWidth;
            animation(bannerContain,currentX,targetX);
            var pointList = document.querySelectorAll('.jd_banner > ul:last-child > li');
            for (var i = 0; i < pointList.length; i++){
                pointList[i].classList.remove('current');
            }
            index++;
            if (index == bannerList.length - 1){
                index = 1;
            }
            console.log(index);
            if (index <= 8){
                pointList[index - 1].classList.toggle('current');
            }
        },3000);
        return timeId;
    };
    timeId = autoToggleImage();
    // 动画函数
    function animation (element,current,target){
        if (element.timeId){
            clearInterval(element.timeId);
        }
        element.timeId = setInterval(function (){
            var step = (target - current) / 10;
            step = step > 0 ? Math.ceil(step) : Math.floor(step);
            current = current + step;
            element.style.transform = 'translate(' + current + 'px)';
            if (Math.abs(target - current) < 1){
                clearInterval(element.timeId);
                element.style.transform = 'translate(' + target + 'px)';
            }
        },20);
    }
};