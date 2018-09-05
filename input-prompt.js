<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>输入框提示利用JavaScript实现</title>
    <style>
        * {
        margin: 0;
        padding: 0;
    }
    input {
        border: none;
    }
    .input_cont {
        margin: 50px auto;
        width: 600px;
        text-align: center;
    }
    .search {
        float: left;
        padding-left: 5px;
        width: 400px;
        height: 25px;
        font-size: 16px;
        border: 1px solid black;
    }
    .search_btn {
        margin-left: 1px;
        float: left;
        width: 50px;
        height: 25px;
        font-size: 16px;
        border: 1px solid black;
        box-sizing: content-box;
    }
    .show {
        width: 405px;
        border: 1px solid blueviolet;
    }
    .show li {
        padding-left: 10px;
        list-style: none;
        margin-top: 5px;
        text-align: left;
        cursor: pointer;
    }
    .show span {
        color: coral;
    }
    </style>
</head>

<body>
    <div class="input_cont">
        <div>
            <input type="text" value="" placeholder="请输入相关信息" class="search">
            <input type="button" value="搜索" class="search_btn">
            <div style="clear: both;"></div>
        </div>

    </div>
    <!-- <div class="show_prompt"></div> -->
    <script>
        // 设置文本框焦点事件
        var searchObject = document.querySelector('.search');
        var showPrompt = document.querySelector('.input_cont');
        searchObject.onfocus = function () {
            this.removeAttribute('placeholder');
            this.style.color = '#000';
            var ulobj = document.querySelector('.show');
            if (ulobj && this.value){
                ulobj.style.display = 'block';
            }
        };
        searchObject.onblur = function (event) {
            if (!this.value) {
                this.placeholder = '请输入相关信息';
            }
            this.style.color = '#ccc';
            var ulobj = document.querySelector('.show');
            if (ulobj){
                ulobj.style.display = 'none';
            }
            console.log(event.currentTarget);
        };
        // 输入提示框事件
        var people = ['Beck, Glenn', 'Becker, Carl', 'Beckett, Samuel', 'Beddoes, Mick', 'Beecher, Henry',
            'Beethoven, Ludwig', 'Begin, Menachem', 'Belloc, Hilaire', 'Bellow, Saul', 'Benchley, Robert',
            'Benenson, Peter', 'Ben-Gurion, David', 'Benjamin, Walter', 'Benn, Tony', 'Bennington, Chester',
            'Benson, Leana', 'Bent, Silas', 'Bentsen, Lloyd', 'Berger, Ric', 'Bergman, Ingmar', 'Berio, Luciano',
            'Berle, Milton', 'Berlin, Irving', 'Berne, Eric', 'Bernhard, Sandra', 'Berra, Yogi', 'Berry, Halle',
            'Berry, Wendell', 'Bethea, Erin', 'Bevan, Aneurin', 'Bevel, Ken', 'Biden, Joseph', 'Bierce, Ambrose',
            'Biko, Steve', 'Billings, Josh', 'Biondo, Frank', 'Birrell, Augustine', 'Black Elk', 'Blair, Robert',
            'Blair, Tony', 'Blake, William'
        ];
        searchObject.onkeyup = function () {
            var tempArray = [];
            for (var i = 0; i < people.length; i++) {
                if (people[i].indexOf(this.value) === 0 && this.value) {
                    tempArray.push(people[i]);
                }
            }
            var ulElement = document.querySelector('.show');
            // if (tempArray.length !== 0) {
            //     if (!ulElement) {
            //         var ulObject = document.createElement('ul');
            //         showPrompt.appendChild(ulObject);
            //         ulObject.className = 'show';
            //     }
            // } else {
            //     if (ulElement) {
            //         showPrompt.removeChild(ulElement);
            //     }
            // }
            // console.log(tempArray);
            // 如果没有匹配并且输入的内容为空，删除显示匹配列表框，可以实现当删除输入内容是也删除提示框
            if (tempArray.length === 0 || !this.value) {
                if (ulElement) {
                    showPrompt.removeChild(ulElement);
                }
                return;
            }
            // 只创建一个提示框
            if (ulElement) {
                showPrompt.removeChild(ulElement);
            }
            var ulObject = document.createElement('ul');
            ulObject.className = 'show';
            showPrompt.appendChild(ulObject);
            for (var i = 0; i < tempArray.length; i++) {
                var liObject = document.createElement('li');
                // 实现匹配的元素和输入的内容进行确认，输入的内容会在显示匹配的列表中显示成黄色
                liObject.innerHTML = tempArray[i].replace(searchObject.value,'<span>'+searchObject.value+'</span>');
                ulObject.appendChild(liObject);
                liObject.onmouseover = function (){
                    this.style.backgroundColor = 'rgba(0,0,0,0.5)';
                };
                liObject.onmouseout = function (){
                    this.removeAttribute('style');
                };
                liObject.onclick = function (){
                    console.log(this);
                }
            }
        };
    </script>
</body>

</html>
