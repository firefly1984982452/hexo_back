---
title: JavaScript之进阶总结
date: 2020-12-07 14:19:32
categories: 
- program
---

# `<script>`标签

## `<noscript>`

`<noscript>`标签：当页面不支持`script`或禁用了`script`时会显示`<noscript>`里面的内容。


## `<script>`中的`async`和`defer`

```
1.`<script src="script.js"></script>`

读到就立即执行。

2.`<script async src="script.js"></script>`

和DOM并行进行（异步）。

2.`<script defer src="script.js"></script>`

和DOM并行进行（异步），但在所有`script.js`的执行解析完后，`DOMContentLoaded`事件触发完成之前。
```

---

# 递归

## arguments.callee：函数自身

用`arguments.callee`实现递归

```
function test(num) {
    console.log(num)
    if(num!==0){
        --num;
        arguments.callee(num)
    }
}
test(3)
3
2
1
```

但是`arguments.callee`已经被弃用了，所以可以尝试其它方法。

## 命名一个function

```
function test(num) {
    (function fn (){
        console.log(num)
        if(num !== 0) {
            --num;
            fn();
        }
    })();
}
test(3)
```

---

# 防抖和节流

[可视化在线demo](http://demo.nimius.net/debounce_throttle/)
[滚动栏在线demo](https://wall-wxk.github.io/blogDemo/2017/02/15/throttleAndDebounce.html)

[学习链接1](https://www.jianshu.com/p/f9f6b637fd6c)
[学习链接2](https://www.jianshu.com/p/b73c2acad696)

## 【1】概念

- 防抖：（停止后才1次）触发事件后n秒内只执行1次，如果n秒内又触发了事件，则会重新计算时间。
- 节流：（几秒1次）一定时间内只能执行1次。

## 【2】应用场景

防抖：

- 搜索框搜索输入，只有用户停止输入时，才发送请求；
- 手机号、邮箱号验证输入检测；
- 窗口resize，只需等窗口调整完成后计算大小，防止重复渲染。

节流：

- 表单验证时重复点击提交按钮；
- 滚动加载；
- 浏览器搜索框联想功能。

## 【3】实现原理

1、防抖

正常情况下，我希望它多久执行，假设邮箱验证正常情况是每隔1秒向后台发送请求，然后用户一直不停的在输入框输入，此时会不断的清除Timeout，直到停止调用方法1秒后才正常去向后台发送请求。

```
// 防抖【防止多次触发滚动事件】
var time = '';
handleDebounce () {
    console.log('调用')
    // 清除未执行的代码，重置回初始化状态
    if(timer){clearTimeout(timer);} 
    //开始一个新的任务
    timer = setTimeout(()=>{
        console.log('函数防抖');
    }, 1000);
},
```
![image.png](https://wx2.sinaimg.cn/mw690/0069qZtTgy1gho47acnm9j303q03ndfo.jpg)

2、节流

假设浏览器一直在不停滚动，我不可能等停止了再请求，也不可能一直请求。

```
var flag = false;
handleThrottle () {
  console.log('调用')
  if(flag){return}
  flag = false;
  setTimeout(()=>{
    console.log('函数节流');
    flag = true;
  },1000)
}
```
![image.png](https://wx4.sinaimg.cn/mw690/0069qZtTgy1gho487f7lnj305904omx1.jpg)

---

# 事件委托（事件代理）

如下代码：因为`li`的点击事件一定会事件冒泡到`ul`上，所以将点击事件写在`ul`上即可委托。

```
<ul id="ul">
  <li>1</li>
  <li>2</li>
  <li>3</li>
  <li>4</li>
  <li>5</li>
</ul>
<script>
  let ul = document.querySelector('##ul')
  ul.addEventListener('click', event => {
    console.log(event.target)
  })
</script>
```

vue中使用

```
<div  @click="handleClick">
    <span 
        v-for="(item,index) of 10000"  
        :key="index">
        {{item}}
    </span>
</div>

...

handleClick(e){
    console.log(e.target.innerText);
},
```

事件代理的方式相对于直接给目标注册事件来说，有以下优点

- 节省内存
- 不需要给子节点注销事件

---

---

# 冒泡事件和阻止默认事件

- `event.stopProgation`能阻止冒泡事件
- `event.preventDefault`能阻止如`<a>`的默认`href`事件

# let和闭包

## let劫持作用域

**用var时**

```
console.log(str);
var str = 'hello';
```

打印出`undefined`。

相当于

```
var str ;
console.log(str);
str = 'hello';
```

用var 的话，变量名会提升，但并不会赋值。

**用let时**

```
console.log(str);
let str = 'hello';
```

报错`VM67161:1 Uncaught ReferenceError: str is not defined`

这里相当于直接`console.log('未定义变量名')`，此时的let已经劫持了var的作用域。

## 用闭包作用域解释为什么用let的for循环可以劫持数据。

假设我们想每隔1秒分别打印1、2、3、4、5。

```
for (var i = 1; i < 6; i++) {
    console.log(i)
    setTimeout(() => {
        console.log('print'+i)
    }, 1000 * i)
}
```

会打印1、2、3、4、5，然后每隔1秒打印一次`'print6'`.

因为`任务流`的关系，console.log(i)会先于setTimeout执行，等for循环的6次console执行完之后，队列里的setTimeout才会依次执行，而这个时候的i已经是6了。

用let可以劫持i的作用域。

```
for (var i = 1; i < 6; i++) {
    let j = i;
    console.log(j)
    setTimeout(() => {
        console.log('print'+j)
    }, 1000 * j)
}
```

此时就是先打印1、2、3、4、5，然后每隔1秒打印'print1'、'print2'...'print5'。但是，每次都会有新的j替代原来的j，所以可以直接在for循环里面定义let i = 1;

```
for (let i = 1; i < 6; i++) {
    console.log(i)
    setTimeout(() => {
        console.log('print'+i)
    }, 1000 * i)
}
```

---

# return和闭包

## 直接return

```
var a = 0;
function fn(){
    var a = 12;
    return a;
}
console.log(fn()); // 12
console.log(a); // 0
```

## return function

```
var a = 0;
function fn() {
    var a = 12;
    return function(){
        return a
    };
}
console.log(fn()()); // 12
console.log(a); // 0
```

## return 闭包

```
var a = 0;
function fn() {
    var a = 12;
    return (function(){
        return a
    })();
}
console.log(fn()); // 12
console.log(a); // 0
```
## 区别

- 1.直接`return`返回的是变量，闭包返回的是执行环境（所以在`return function`部分就要`fn()()`这样调用2次）。
- 2.闭包不是为了让函数外部拿到内部变量，而是为了保护私有变量不被更改。
- 3.`return`出来的是一个值（`12`），不是变量本身（`a`），此处的`return`是取得私有变量值的一种方法，跟闭包没有严格关系。

---

# valueOf、toString和Symbol.toPrimitive

对象转基本类型时，先调用`valueOf`,再调用`toString`，如果有`Symbol.toPrimitive`的话优先级是最高的。

## valueOf

如果有valueOf和toString时，valueOf的优先级高：

```
let a = {
    valueOf() {
        return 1;
    },
    toString() {
        return '2';
    },
}
console.log( a + '10'); // 110
```

## toString

当只有toString时，才会调用它：

```
let a = {
    toString() {
        return '2';
    },
}
console.log(a+203); // 2203
```

## Symbol.toPrimitive

优先级最高，还可根据不同的类型转换成Number类型和String类型：

```

let obj = {
    [Symbol.toPrimitive](hint) {
        switch (hint) {
        case 'number':
            return 1234;
            break;
            
        case 'string':
            return 'str';
            break;
            
        case 'default':
            return 'default';
            break;
            
        
        default:
            break;
        }
    }
}
console.log(2 * obj); // 2468
console.log(2 + obj); // 2default
console.log('default' === obj); // false
console.log(String(obj)); /// str
```

---

# JSON的更多参数用法

## JSON.stringify

新建一个普通对象

```
var settings = {
  username: 'lydiahallie',
  level: 19,
  health: 90,
};
```

### 普通用法

```
var data = JSON.stringify(settings); // "{"username":"lydiahallie","level":19,"health":90}"
```

### 参数2：参数过滤

```
var data = JSON.stringify(settings, ['level', 'health']); // "{"level":19,"health":90}"
```

### 参数3：参数排版

```
var data = JSON.stringify(settings, undefined, 2);

```
打印出来：

```
"{
  "username": "lydiahallie",
  "level": 19,
  "health": 90
}"
```
不再是一行，而是有了排版的字符串。

## JSON.parse

## 参数1：普通用法

```
JSON.parse('{"p": 5}'); // {p: 5}
```

## 参数2：过滤函数

```
JSON.parse('{"p": 5}',((key,value)=>{
    console.log(key,value);
    return value*20;
}))
```

返回：

```
p 5
{p: 100}
```

---


# JavaScript相等操作符（==）

参考：
[链接1](https://www.cnblogs.com/wisewrong/p/10396002.html)
[链接2](https://blog.csdn.net/magic_xiang/article/details/83686224)
[链接3](https://yuchengkai.cn/docs/frontend/#%E6%93%8D%E4%BD%9C%E7%AC%A6)

## 两组操作符

相等：`==`（先转换再比较）
全等：`===`（仅比较不转换）

## 相等（`==`）规则

**Boolean规则：Boolean(val)**：如果有一个操作数是`Boolean`值，则在比较前先将其转换为数值——`false`为`0`，`true`为`1`。
**String&Number规则：Number(string)**：如果一个是`String`，一个是`Number`，则先将`String`转为`Number`。
**Object规则：valueOf(obj)**：如果有一个是对象，则调用`valueOf`方法（数组调`toString()`方法）。

![](https://yck-1254263422.cos.ap-shanghai.myqcloud.com/blog/2019-06-01-043719.png)

## 问题探讨

```
[] == []; // false
{} == {}; // false
[] == ![]; // true
{} == !{}; // false
```

`[] == []`和`{} == {}`是因为引用的对象指向不同的指针，所以不会相等。

**一、`[] == ![]`**

- 1：逻辑非（`!`）的优先级高于相等操作符（`==`），所以先计算`![]`的`boolean`值`false`，此时比较的是：`[] == false`；
- 2：根据上面提到的**boolean规则**，则需要把 `false` 转成 `0`，此时比较的是：`[] == 0`；
- 3：根据上面提到的**Object规则**，调用空数组的toString方法，即`[].toString()`的值为`''`，此时比较的是：`'' == 0`；
- 4：根据上面提到的**String规则**，将字符串转为数字，即`Number('')`的值为`0`，此时比较的是：`0 == 0`。

简化：
`[] == ![]` 转化：`[] == false` 转化： `[] == 0` 转化`'' == 0` 转化： `0 == 0`。

**二、`{} == !{}`**

- 1：先计算`!{}`得到`false`，此时比较的是：`{} == false`；
- 2：调用**Booean规则**，计算`Boolean({})`得到`true`，此时比较的是`true == false`。

简化：
`{} == !{}` 转化：`{} == false` 转化：`true == false`。

---


# `try...catch`无法用于异步代码

## 同步代码

```
try {
    foo();
} catch (error) {
    console.log('异常是：'+error)
}
```

此时会由catch捕捉到异常：

```
异常是：ReferenceError: foo is not defined
```

## 异步代码

```
function foo(){
    setTimeout(()=>{
        bar.arr();
    },100);
};
try {
    foo();
} catch (error) {
    console.log(error)
}
```

此时无法捕捉，而是浏览器控制台报出未捕捉异常。

```
Uncaught ReferenceError: bar is not defined
```

## 对比图

![image](https://wx2.sinaimg.cn/mw690/0069qZtTgy1gho3yuu5lpj30au09n74t.jpg)

---


# HTML渲染过程

- 1、解析HTML，构成DOM
- 2、解析CSS，形成CSS对象模型
- 3、将CSS和DOM合并，构成渲染模型
- 4、绘制


- 重绘：corlor、borde、visibility，只会小变动；
- 重排（回流）：DOM操作、CSS属性改变、伪类操作，会大变动。

---

# 前端路由和后端路由

- 前端路由（#）：hash值或pushStatu
- 后端路由（/）：通过URL跳转到具体的html页面，每次跳转都重新访问服务端，服务端返回页面。

---

# localStorage标签页通信

page1

```
localStorage.setItem('send','sendValue');
```

page2

```
window.addEventListener('storage', (e) => {
    console.log(e)
})
```

---

# webSocekt多人通信

[学习链接-基础通信](http://www.imooc.com/article/286001)
[学习链接-多人通信(ws)](https://www.cnblogs.com/lihaohua/p/12410511.html)
[学习链接-多人通信(nodejs-websocket)](https://zhuanlan.zhihu.com/p/64906193)


![效果](https://wx2.sinaimg.cn/large/0069qZtTgy1gls4a0l7fej30ge0agtap.jpg)

## 服务端

```
var ws = require("nodejs-websocket");
console.log('开始建立连接...');

// 向所有连接的客户端广播
function boardcast(obj) {
    server.connections.forEach(function (conn) {
        conn.sendText(JSON.stringify(obj));
    })
}
var server = ws.createServer(function (conn) {
    conn.on('text', function (str) {
        var obj = JSON.parse(str);
        console.log("message: " + str);
        boardcast({
            type: 2,
            msg: obj.msg,
            uid: obj.uid,
            nickname: obj.nickname
        });
    })

    conn.on('close', function (code, reason) {
        console.log('关闭连接!');
    })

    conn.on('error', function (code, reason) {
        console.log('异常关闭！');
    })
}).listen(8001);
console.log('webSocket建立完毕！');
```

## 客户端

**客户端1：**

```
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
  </head>
  <body>
    <div id="content"></div>
    <input type="text" id="sendTxt" />
    <button id="sendBtn">发送</button>
    <script>
      var dom = document.getElementById("content");
      var ws = new WebSocket("ws://localhost:8001?userName=1");
      ws.onopen = function (e) {
        console.log("连接服务器成功");
      };
      ws.onclose = function (e) {
        console.log("服务器关闭");
      };
      ws.onerror = function () {
        console.log("连接出错");
      };
      // 接收服务器的消息
      ws.onmessage = function (e) {
        console.log(e);
        let message = JSON.parse(e.data);
        if (message.nickname !== 1) {
          dom.innerHTML +=
            "<p style='color: green;'>接收：" + message.msg + "</p>";
        }
      };

      document.getElementById("sendBtn").onclick = function () {
        var txt = document.getElementById("sendTxt").value;
        dom.innerHTML += "<p style='color: red;'>发送：" + txt + "</p>";
        ws.send(
          JSON.stringify({
            uid: 1,
            type: 2,
            nickname: 1,
            msg: txt,
          })
        );
      };
    </script>
  </body>
</html>
```

**客户端2（将用户1改为用户2）：**

```
...

var ws = new WebSocket("ws://localhost:8001?userName=2");

...

ws.send(
    JSON.stringify({
    uid: 2,
    type: 2,
    nickname: 2,
    msg: txt,
    })
);
```

## 运行服务端

`node server.js`

此时，一个运行在chrome，一个运行在firefox，就已经能实现通信。

---

# JavaScript编码规范


## 不要在块内函数声明

不推荐：

```
if (x) {
    function foo() {}
}
```

推荐：

```
if (x) {
    var foo = function() {}
}
```

## 不要封装基本类型

会导致异常，如：

```
var x = new Boolean(false);
false === false; // false
```

## for-in循环

### 只用于object/map/hast的遍历

```
var obj = {
    name: '小明'
}
for(var i in obj) {
    console.log(obj.hasOwnProperty(i))
}
```

### 遍历对象时用hasOwnPropery

```
for(var i in obj) {
    console.log(obj.hasOwnProperty(i))
}
```

## 检查null和0

如果你想检查字符串是否为 null 或空:

`if (y != null && y != '') {`

但这样会更好:

`if (y) {`

## 使用三元操作符

三元操作符用于替代下面的代码:

```
if (val != 0) {
  return foo();
} else {
  return bar();
}
```

你可以写成:

```
return val ? foo() : bar();
```

---


# 与JAVA相通的概念

## 【1】MVC、MVVM

### 【1.1】MVC

Model层:模型层，比如图片放一个类，标题放一个类
View层：显示页面，如xml
Controller层：控制Model的读取、存储。如MainActivity

### 【1.2】MVVM

MVVM实现了View和Model的自动同步，当Model的属性改变时，我们不再手动操作DOM，也就是双向绑定。

Model层：后端传递的数据
View层：页面
ViewModel层：视图模型，连接Model和View的桥梁。将Model转为View（将后端数据显示给前端）用的是数据绑定，将View转为Model（将前端数据转给后端）用的DOM监听，这种实现方法称为为**数据的双向绑定**。

## 【2】类

js里面的类和其它OOP里面的类概念是一样的。（比如，所有的车是一个类，房子是一个类）


---

# hybird混合式开发
## jsBridge

js与android的通信

### android代码：

java发消息给js：
`webview.send()`
java收js的消息
`webview.registerHander('name',new Bridge(){})`


### javaScript代码：

js发消息给java
`window.WebViewJavaScriptBridge.send()`
js收java的消息
`document.addEventListener('WebViewJavaScriptBridgeReady',()=>{})`

### 示例

```
$(".company_color").click(function(){
  var u = navigator.userAgent;
  var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1; //android终端或者uc浏览器
  var isIos = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
  var company_name = $(this).text();
  if(isAndroid) {
    var msg = window.mrlou.androidIs("2",company_name);
  } else if(isIos) {
    //iosPhone()这个方法，ios会自动监听，并接收我传过来的值，用msg接收它传给我的值
    broker("2",company_name);
  }
})
```
---

# Blob实现下载文件

[参考链接](https://zhuanlan.zhihu.com/p/97768916)

DOM:

```
<a id="download" @click="download">下载</a>
```

JS:

```
download(){
    var blob = new Blob(['hello world']);
    var url = window.URL.createObjectURL(blob);
    var a = document.getElementById('download');
    a.download = 'helloworld.txt';
    a.href = url;
},
```

---

# 打开下载后立马关闭

- 1.excel

```
var adom = document.createElement("a");
adom.setAttribute("href",url);
adom.width = "0px";
adom.height = "0px";
adom.setAttribute("target","_blank")
document.body.appendChild(adom)
adom.click();
adom.remove();
```
- 2.image

```
fetch(url).then(res => res.blob()).then((blob) => {
  // 创建隐藏的可下载链接
  const a = document.createElement('a');
  a.style.display = 'none';
  a.href = URL.createObjectURL(blob);
  a.download = this.peopleList[i].peopleName;
  document.body.appendChild(a);
  a.click();
  // 移除元素
  document.body.removeChild(a);
})
```

---


# `typeof null`为什么返回`object`

`null`是空对象指针，所以`typeof null`返回的是`object`，

`'null'`变为`null`：`JSON.parse('null')`

---


# lighthouse前端性能优化工具

```
npm install -g lighthouse

lighthouse https://www.cnblogs.com/
```

生成html页面

---