---
title: 《JavaScript高级程序设计》笔记
date: 2020-06-28 10:19:32
categories: 
- program
---

# 基本概念

## JS

`<noscript>`标签：当页面不支持`script`或禁用了`script`时会显示`<noscript>`里面的内容。

## 数据类型

`null`是空对象指针，所以`typeof null`返回的是`object`，

`'null'`变为`null`：`JSON.parse('null')`

# 防篡改对象

`preventExtensions`：不能增，能删改
`seal`：不能增删，能改
`freeze`:不能增删改

|对象属性|增|删|改|
|:--:|:--:|:--:|:--:|
|preventExtensions|X|√|√|
|seal|X|X|√|
|freeze|X|X|X|

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

## 防抖和节流

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
![image.png](https://upload-images.jianshu.io/upload_images/830956-f82dd8922209b045.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

2、节流

假设浏览器一直在不停滚动，我不可能等停止了再请求，也不可能一直请求。

```
var flag = false;
handleThrottle () {
  console.log('调用')
  if(!flag){return}
  flag = false;
  setTimeout(()=>{
    console.log('函数节流');
    flag = true;
  },1000)
}
```
![image.png](https://upload-images.jianshu.io/upload_images/830956-90b4fec3668256e7.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

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
for (var i = 1; i < 6; i++) {
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


# java对象


```
// 创建类——“人”
public class People{
    int age;
}
// 创建类——“男人”
public class MenPeople extends People {
    
}
// 创建对象
MenPeople xm = new MenPeople();
xm.age = 15;
```

# js对象

`var xm = {age:15}`


        https://www.jianshu.com/p/edf4d665d0df