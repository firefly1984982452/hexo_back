---
title: JavaScript之进阶总结
date: 2020-12-07 14:19:32
categories: 
- program
---

# 基本概念

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

## `typeof null`为什么返回`object`

`null`是空对象指针，所以`typeof null`返回的是`object`，

`'null'`变为`null`：`JSON.parse('null')`


# 防篡改对象

`preventExtensions`：不能增，能删改
`seal`：不能增删，能改
`freeze`:不能增删改

|对象属性|增|删|改|
|:--:|:--:|:--:|:--:|
|preventExtensions|×|✓|✓|
|seal|×|×|✓|
|freeze|×|×|×|

## 不可扩展对象preventExtensions

**Object.preventExtensions**不能增，能删改

```
var obj = {a:1,b:2};
Object.preventExtensions(obj);
obj.c = 3;
console.log(obj.c); // undefined
delete obj.a;
console.log(obj); // {b: 2} 删除成功
obj.b = 'hello'
console.log(obj); // {b: "hello"} 修改成功
```

检测是否不可扩展**Object.isExtensible(obj)**

(false是不可扩展，true是正常对象)

```
Object.isExtensible(obj);// false
```

## 密封的对象seal

**Object.seal**不能增删，能改

```
var obj = {a:1,b:2};
Object.seal(obj);
obj.c = 3;
console.log(obj.c); // undefined
delete obj.a;
console.log(obj); // {a:1,b:2} 删除失败
obj.b = 'hello'
console.log(obj); // {a:1,b: "hello"} 修改成功
```

检测是否密封**Object.isSealed(obj)**

(false是正常，true是已经密封了)

```
Object.isSealed(obj);// true
```

## 冻结的对象freeze

**Object.freeze**不能增删改

```
var obj = {a:1,b:2};
Object.freeze(obj);
obj.c = 3;
console.log(obj.c); // undefined
delete obj.a;
console.log(obj); // {a:1,b:2} 删除失败
obj.b = 'hello'
console.log(obj); // {a:1,b:2} 修改失败
```

检测是否冻结**Object.isFrozen(obj)**

(false是正常，true是已经冻结了)

```
Object.isFrozen(obj);// true
```


# setTimeout

// setTimeout的时间假设设置为1000，不是说1秒后立马会执行，而是尽快执行，把任务添加到了队列中，如果排到它了，就立马执行。


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

1.直接return返回的是变量，闭包返回的是执行环境（所以在return function部分就要fn()()这样调用2次）。
2.闭包不是为了让函数外部拿到内部变量，而是为了保护私有变量不被更改。
3.return出来的是一个值（12），不是变量本身（a），此处的return是取得私有变量值的一种方法，跟闭包没有严格关系。

# 防抖和节流

[可视化在线demo](http://demo.nimius.net/debounce_throttle/)
[滚动栏在线demo](https://wall-wxk.github.io/blogDemo/2017/02/15/throttleAndDebounce.html)

[学习链接1](https://www.jianshu.com/p/f9f6b637fd6c)
[学习链接2](https://www.jianshu.com/p/b73c2acad696)

### 概念

防抖：（停止后才1次）触发事件后n秒内只执行1次，如果n秒内又触发了事件，则会重新计算时间。
节流：（几秒1次）一定时间内只能执行1次。

### 应用场景

防抖：

- 搜索框搜索输入，只有用户停止输入时，才发送请求；
- 手机号、邮箱号验证输入检测；
- 窗口resize，只需等窗口调整完成后计算大小，防止重复渲染。

节流：

- 表单验证时重复点击提交按钮；
- 滚动加载；
- 浏览器搜索框联想功能。

### 实现原理

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

# prototype 和 hasOwnProperty

```
Array.prototype.arr = function(){console.log('print arr')};
var a = [1,2,3];
a.arr(); // 'print arr'
Array.prototype.hasOwnProperty('arr'); // true
a.hasOwnProperty('arr'); // false
Array.hasOwnProperty('arr'); // false
```


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

# function和object

## function

```
var str = (()=> {
    var count = 0;
    function sum () { return ++count; };
    function reduce () {return --count;};
    return {
        sum,
        reduce
    }
})
```
此时的str是个function

简化下：

```
var str = (()=> {
    var count = 0;
    return {
        sum : ()=>{return ++count;},
        reduce : ()=>{return --count;}
    }
})();
str.sum(); // 1
```
此时的str是已经立即执行函数了，返回的是Object，是{sum:f,reduce:f}，注意，这里的str是获取不到count的，只有return的数据能获取到。

## Object

```
var obj = {
    count:0,
    sum : ()=>{return ++obj.count;},
    reduce : ()=>{return --obj.count;}
}
obj.sum(); // 1
```

这里的obj是Object，不同于str的是，它能获取到count，object里面的所有数据都能获取到。

## 区别

- Function只有return的方法才能获取到（闭包）
- Function执行后返回的是对象


# JavaScript函数调用及this参数

JS有4种方式调用函数

- 作为一个函数(`function`)——`fn()`直接被调用
- 作为一个方法(`methods`)——`obj.fn()`，关联在对象上调用，实现面向对象编程
- 作为一个构造函数(`constructor`)——`new Fn()`，实例化一个新的对象
- 通过`apply`或`call`方法调用

对应的this的指向：

- 函数调用：`window`或`undefined`
- 方法调用：obj对象
- 构造函数调用：实例化的对象
- `aplly`或`call`：第一个参数

详解：

## 函数调用

```
function fn(){
    console.log(this);
}
fn(); // window
```

严格模式下：

```
function fn(){
    "use strict"
    console.log(this);
}
fn(); // undefined
```

## 方法调用

```
var obj = {
    fn : function(){
        console.log(this);
    }
};
obj.fn() // 返回obj对象：{fn: ƒ}
```

## 构造函数调用

```
function Cat(x,y){
    this.x = x;
    this.y = y;
    console.log(this);
}
var c = new Cat(1,2);

c // Cat{x:1,y:2} 指向c对象
```

es6写法

```
class Point{
    constructor(x,y){
        this.x = x;
        this.y = y;
        console.log(this);
    }
}
var p = new Point(1,2)

p // Point{x:1,y:2} 指向p对象
```

## aplly或call

```
var name = '张三';
var age = '24';
var obj = {
    name: this.name, // 此处的this指向window
    objAge: this.age, // 此处的this指向window
    fun: function(fm,t){
        console.log(this)
        console.log(this.name+'年龄 '+this.age + ' 来自'+fm+' 去往'+t); // 此处的fm和t就是要传入的参数
    }
}
var pd = {
    name: '彭丹',
    age:18
}
obj.fun.call(pd,'长沙','上海'); // 彭丹 年龄18 来自长沙 去往上海
obj.fun.apply(pd,['长沙','上海']); // 彭丹 年龄18 来自长沙 去往上海
obj.fun.bind(pd,'长沙','上海')(); // 彭丹 年龄18 来自长沙 去往上海
obj.fun.bind(pd,['长沙','上海'])(); // 彭丹 年龄18 来自长沙上海 去往undefined
```

`this`打印出来全都是`{name: "彭丹", age: 18}`，就是第一个参数。

# 函数构造器

与`构造函数`名字类似，但无太大关系。

普通生成

```
var p = new Function('x','y','return x+y');
p(2,3)
```

动态生成

```
createFunction(){
    let arr = Array.from(arguments);
    var params = arr.splice(0,arr.length-1);
    var body = arr[0];
    return new Function(params,body);
},
test(){
    var sum = this.createFunction('x','y','return x + y');
    var chen = this.createFunction('x','y','return x * y');
    console.log(sum(3,2)) // 5
    console.log(chen(3,2)) // 6
},
```

---

# 函数生成器(generator)

```
function* test(){
    console.log(1);
    yield;
    console.log(2);
}
let item = test();
item.next();
setTimeout(()=>{
    item.next();
},3000)
1
隔3秒后
2
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

# MessageChannel

## MessageChannel的基本使用

```
const {port1, port2} = new MessageChannel();
port1.onmessage = function(d) {
    console.log(`port1接收的消息是：${d.data}`);
}
port2.onmessage = function(d) {
    console.log(`port2接收的消息是：${d.data}`);
}
port1.postMessage('port1发送的消息');
port2.postMessage('port2发送的消息');
```

port1发送的由port2接收，port2发送的由port1接收。

也就是说，传过去的对象，接收到的时候已经不是原来的引用和指针了，这个时候再return出来，就是一个新的对象，所以肯定能实现深拷贝。

## 使用MessageChannel实现深拷贝

```
var obj = {id:1,name:{a:'xx'}};

function structuralClone(obj) {
    return new Promise((resolve) => {
        const {port1, port2} = new MessageChannel();
        port2.onmessage = ev => resolve(ev.data);
        port1.postMessage(obj);
    })
}
structuralClone(obj).then(res=>{
    console.log(res);
    var obj3 = res;
    obj3.name.a = 'obj3';
    console.log(obj,obj3);
})

<!-- 用promise是为了好传数据 -->
```

---

# 使用lodash.cloneDeep实现深拷贝

```
import _ from 'lodash'
var obj = {id:1,name:{a:'xx'},fn:function(){},un:undefined};
var obj2 = _.cloneDeep(obj);
obj2.name.a = 'obj2';
console.log(obj,obj2)
```

![image](https://img2020.cnblogs.com/blog/919128/202007/919128-20200731100645239-764277941.png)

![image](https://wx2.sinaimg.cn/mw690/0069qZtTgy1ghcrk94yhdj30dm033aa5.jpg)

# `arguments`参数的3种转数组方法

**方法1：Array.prototype.slice.apply**
**方法2：Array.from**
**方法3：[...arguments]**

```
var test3 = function(){
    console.log(arguments);
    var list1 = Array.prototype.slice.apply(arguments);
    console.log(list1);
    var list2 = Array.from(arguments);
    console.log(list2);
    var list3 = [...arguments];
    console.log(list3);
}
test3(1,2,3,4);
```

![image](https://wx2.sinaimg.cn/mw690/0069qZtTgy1ghdl1udru0j309o068dfy.jpg)

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

# JS运行机制

[链接](https://www.cnblogs.com/cangqinglang/p/8963557.html)


**异步**：现在和将来的时间间隙
**并行**：能够同时发生的事情

并行：比如进程与线程，独立运行并且能同时运行。

```
fun : function(){
	func1();
	func2();
	http1();
	http2();
}
```

## 多进程

每个tab标签页有一个独立的进程（有的可能会合并）

比如：
- Browser进程：主进程；
- 第三方插件进程；
- GPU进程；
- 浏览器渲染进程。

## 单线程

浏览器的渲染进程是`多个线程`的，是多个，这些线程还是一个一个执行完了才执行下一个，所以`JS引擎是单线程`的。

比如：
- GUI渲染线程
- JS引擎线程
- 事件触发线程
- 定时触发器线程

## 浏览器渲染流程

**沉浸树（render树）**：

- 1.处理HTML标签构建DOM树；
- 2.处理CSS标签构建CSSOM树；
- 3.DOM和CSSOM树被组合形成渲染树（render树）；
- 4.布局render树，计算尺寸、位置；
- 5.绘制render树，绘制页面像素信息；
- 6.发给图形处理器（GPU），显示在屏幕上。

**CSS是否会阻塞dom树渲染？**

由上面的流程可知，不知阻塞DOM树，但会阻塞CSSOM树。

## 事件循环（`Event Loop`）、宏任务（`macrotask`）、微任务（`microtask`）

事件循环（`Event Loop`）：执行完宏任务后，将微任务排队添加任务，执行后再循环检查有没有宏任务……所以整个过程称为事件循环。
宏任务（`macrotask`）：主代码、setTimeout、setInterval、setImmediate(IE)、MessageChannel
微任务（`microtask`）：promise、process.nextTick、MutationObserver

执行顺序：先宏任务--》执行结束后--》再执行所有微任务--》渲染--》下一个宏任务

```
console.log('start');

setTimeout(function() {
  console.log('1');
}, 10);

new Promise(resolve => {
    console.log('2');
    resolve();
    setTimeout(() => console.log('3'), 10);
}).then(function() {
    console.log('4')
})

console.log('end');
```

这里的执行顺序就是`start-->2-->end-->4-->1-->3`

**注意**：

```
promise是立即执行的，创建的时候就会执行，不存在将promise推入微任务；
resolve()是表示promise的状态为fullfilled，相当于只是定义了一个有状态的promise，并没有调用它；
promise调用then的前提是promise的状态为fullfilled；
只有promise调用then的时候，then里面的函数才会被推入微任务中。
```

## setTimeout相关

setTimeout并不是由JS引擎计数的，因为单线程会阻塞，会影响计数的准确，因此通过单独线程来计时并触发。
setTiemout最小为4，不满会加成4。

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

# MutationObserver:监听DOM节点的变动

监听DOM节点的变动
## 基本使用

```
<body>
    <div id="content">
      hi
    </div>
    <script>
      var callback = function(mutationList, observer) {
        for(var mutation of mutationList) {
          console.log(mutation)
        }
      };
      var observer = new MutationObserver(callback);
      var targetNode = document.getElementById('content');
      observer.observe(targetNode.firstChild,{
        characterData: true
      })
      setTimeout(() => {
        targetNode.firstChild.data = 'hello'
      },3000)
    </script>
</body>
```

3秒钟之后，id为content的DOM变成了'hello'，此时的MutationObserver就已经监听到了改变，可以进行下一步的操作。

## 实现vue.$nexttick

```
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>example</title>
</head>
<body>
<div id="app">
    <div v-if="isShow">
        <input type="text" ref="userName" />
    </div>
    <button @click="showInput">点击显示输入框</button>
</div>

</body>
</html>
<script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
<script>
    var app = new Vue({
        el: '#app',
        data: {
            isShow: false
        },
        methods:{
            showInput(){
                this.isShow = true
                this.mynextTick(()=>{
                    this.$refs.userName.focus()
                })

            },
            mynextTick(func){
                var textNode = document.createTextNode(0)//新建文本节点
                var that = this
                var callback = function(mutationsList, observer) {
                    func.call(that);
                    // 或
                    // fanc();
                }
                var observer = new MutationObserver(callback);

                observer.observe(textNode,{characterData:true })
                textNode.data = 1//修改文本信息，触发dom更新
            }
        }

    })
</script>
```

# MessageChannel实现vue.$nexttick

```
<!DOCTYPE html>

<html lang="en-zh">
  <head>
    <meta charset="utf-8" />
    <style type="text/css">
    </style>
  </head>
  <body>
    <div id="app">
      <div v-if="isShow">
          <input type="text" ref="userName" />
      </div>
      <button @click="showInput">点击显示输入框</button>
    </div>
  </body>
</html>

<script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
<script>
  var app = new Vue({
    el: '#app',
    data: {
      isShow: false
    },
    methods: {
      showInput(){
        this.isShow = true;
        this.myNextTick(() => {
          this.$refs.userName.focus();
        })
      },
      myNextTick(fanc){
        var that = this;
        const ch = new MessageChannel();
        const port1 = ch.port1;
        const port2 = ch.port2;

        port2.onmessage = (() => {
          fanc();
        })
        port1.postMessage(1);

      }
    }
  })
</script>

```

# window.resize下监听某DOM的改变：ResizeObserver

```
<textarea style="width: 100%;" id="main"></textarea>

...

let mainEl = document.querySelector('#main');
var ro = new ResizeObserver( entries => {
  console.log(entries);
})
ro.observe(mainEl);
```

# lighthouse前端性能优化工具

```
npm install -g lighthouse

lighthouse https://www.cnblogs.com/
```

生成html页面

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

# window.postMessage

知识点：

- `addEventListener`监听的必须是`'message'`
- `window.postMessage`发送的必须是自己的`域名`

[学习链接](https://blog.csdn.net/weixin_40650646/article/details/81777398)


需求：在页面a,里打开新窗口b，在b窗口里点击postMessage按钮，能够在a页面收到发来的消息

页面A：

```
<button onClick="test()">open</button>

...

<script>
    function test() {
    
        let op = window.open('b.html', '_blank'); //打开新窗口，并建立窗口的引用变量op
    
        function receiveMessage(event) {
            console.log('event', event);
        }
    
        op.addEventListener("message", receiveMessage, false); //监听新开窗口发来的消息
    }
</script>
```

页面B：

```
window.postMessage("hi there!", location.origin);
```

此时点击页面B的发送消息按钮就能在页面A接收消息了。


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
SON.parse('{"p": 5}'); // {p: 5}
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
