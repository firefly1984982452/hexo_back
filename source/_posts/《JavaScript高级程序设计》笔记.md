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

https://www.cnblogs.com/yanyunpiaomaio/p/11025444.html


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

# let和const

## let

let变量不能重复定义
没有变量提升
暂时性死区

## const

const定义的变量不能修改

# JavaScript面向对象

[参考](http://www.ruanyifeng.com/blog/2010/05/object-oriented_javascript_encapsulation.html)

## 封装

### 生成对象

```
function Cat(name,color){
    this.name = name;
    this.color = color;
}
var cat1 = new Cat('大猫','黄色');
var cat2 = new Cat('小猫','黑色');

cat1; // Cat {name: "大猫", color: "黄色"} 指向Cat对象
cat2; // Cat {name: "小猫", color: "黑色"} 指向Cat对象
```

**相当于我们平时用的数组中的**：

```
var arr = new Array(3).fill(2);
var brr = new Array(5).fill(8);
arr; // (3) [2, 2, 2] 指向Array对象
brr; // (5) [8, 8, 8, 8, 8] 指向Array对象
```

只不过我们平时是直接用`var arr = [1,2]`的形式，和`new Array`是同一个意思。

## 对象的构造函数

```
function Cat(name,color){
    this.name = name;
    this.color = color;
}
```

这段代码里面的`this.name = name`就是构造函数，可以直接用es6语法糖的形式写：

### es6语法糖class

```
class Cat{
    constructor(x,y){
        this.x = x;
        this.y = y;
    }
}
var cat1 = new Cat('大猫','黄色');

cat1; // Cat {name: "大猫", color: "黄色"} 指向Cat对象
```

### constructor

所以，`cat1`实例含有`constructor`属性指向它(Cat)的`构造函数`。

```
cat1.constructor === Cat; // true
```

**相当于我们平时用的数组中的**：

```
[1,2].constructor === Array; // true
```

**其它**

```
[2].constructor(); // []
[2].constructor() === Array.prototype.constructor();
```

### instanceof

`JavaScript`还提供了`instanceof`运算符，验证`原型对象(Cat)`与`实例对象(cat1)`之间的关系。

```
cat1 instanceof Cat; // true
```

**相当于我们平时用的数组中的**：

```
[1,2] instanceof Array; // true
```

## 原型对象添加方法

### 直接添加造成的问题

```
function Cat(name,color){
    this.name = name;
    this.color = color;
    this.type = '猫科动物';
    this.eat = function(){
        console.log('吃鱼')
    }
}
var cat1 = new Cat('大猫','黄色');
var cat2 = new Cat('小猫','黑色');

cat1.eat == cat2.eat; // false

```

此时eat方法占用了太多内存，并且它们没有指向同一个引用地址，永远不会相等。参考数组的其实是相等的。

```
[1].push == [2].push; // true
```

### 用prototype添加方法

```
function Cat(name,color){
    this.name = name;
    this.color = color;
}
Cat.prototype.type = '猫科动物';
Cat.prototype.eat = function(){
    console.log('吃鱼')
}
var cat1 = new Cat('大猫','黄色');
var cat2 = new Cat('小猫','黑色');

cat1.eat == cat2.eat; // true，它们是指向同一个内存地址下的方法
```

(就算不定义Cat的prototype，Cat也自带有prototype属性)

## prototype模式的验证方法

### 判断对象和实例的关系`isPrototypeOf`

```
Cat.prototype.isPrototypeOf(cat1); // true
```

**相当于我们平时用的数组中的**：

```
Array.prototype.isPrototypeOf([]); // true
```

### 判断是本地属性还是prototype属性

```
cat1.hasOwnProperty('name'); // true
cat1.hasOwnProperty('type'); // false
```

### in

```
'name' in cat1; // true
```

**相当于我们平时用的数组中的**：

```
'push' in []; // true
```

### __proto__

一般情况下，实例对象的`__proto__`指向原型对象的`prototype`。
`prototype`被实例的`__proto__`指向
`__proto__`指向构造函数的`prototype`
`__proto__`存在于实例和构造函数的原型对象，而不是实例与构造函数。
如：

```
cat1.__proto__ === Cat.prototype; // true
```

**相当于我们平时用的数组中的**：

```
[].__proto__ === Array.prototype; // true
```

**其它情况**

```
function fn(){};
fn.__proto__ === Function.prototype; // true
```

把函数当作对象时，生成它的函数就是`Function`原型对象。

1. `Function`原型对象也同样适用此规则：

```
Function.__proto__ === Function.prototype; // true
Function.prototype.__proto__ == Object.prototype; // true 为了不指向自身的Function.prototype造成循环引用
```

2. `Object`函数也是一个`Function`函数：

```
Object.__proto__ === Function.prototype; // true
Object.prototype.__proto__ === null ; // true 为了不指向自身的Object.prototype造成循环引用
```

`Object.prototype.__proto__==null`是所有函数的终点

# DOM也有原型链

```
<html>
  <head>
    <title>dom原型测试</title>
  </head>
  <body>
    <div id="test">test dom</div>
    <script type="text/javascript">
      HTMLElement.prototype.hello = function(){
        console.log(this);
      }
      var div = document.getElementById('test');
      div.hello();
    </script>
  </body>
</html>
```

# Object.create实现类继承和克隆对象

## Object.create实现类继承

### 先看不用Object.create来实现继承

```
function Pd(){
}
Pd.prototype = Array.prototype;
Pd.prototype.constructor = Pd;
var pdd = new Pd();
pdd.push(3);
console.log(pdd); // Pd [3] __proto__:Array(0)直接就是真正的数组的__proto__
```

效果：

![image.png](https://upload-images.jianshu.io/upload_images/830956-5dda88d241d8731a.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

### 用Object.create实现继承

```
function Pd(){
}
Pd.prototype = Object.create(Array.prototype);
Pd.prototype.constructor = Pd;
var pdd = new Pd();
pdd.push(3);
console.log(pdd); // Pd [3] __proto__:Array[__proto__:Array(0)]就是__proto__里面包含真正的数组的__proto__
```

效果：

![image.png](https://upload-images.jianshu.io/upload_images/830956-fc04b7810e0297fe.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

### 区别

**写法**：

`Pd.prototype = Array.prototype;`和`Pd.prototype = Object.create(Array.prototype);`

**返回值**：

- `Pd [3] __proto__:Array(0)`直接就是真正的数组的`__proto__`;
- `Pd [3] __proto__:Array[__proto__:Array(0)]`就是`__proto__`里面包含真正的数组的`__proto__`。

## 用Object.create克隆对象

```
var obj1 = {a:2,b:{name:'小明'}};
var obj2 = Object.create(obj1);
console.log(obj2); // {}
obj2.a = 3;
obj2.b.name = '小红';
console.log(obj1); // {a:2,b:{name:'小红'}};
```
结论：obj1对象中的一级对象a:2并没有受影响，但二级对象b已经受影响。所以**Object.create克隆的对象也只能实现一级对象的深拷贝**。

obj2的具体值：

![image.png](https://upload-images.jianshu.io/upload_images/830956-ed702517acab50a9.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)


# new Array()和[]比较

## 性能

```
var startTime=new Date().getTime();
var a2 = new Object();
for(var i = 0;i<10000000;i++){
    a2[i] = [];
}
var endTime=new Date().getTime();
console.log('[]输出耗时:',endTime-startTime);

var startTime2=new Date().getTime();
var a = new Object();
for(var i = 0;i<10000000;i++){
    a[i] = new Array();
}
var endTime2=new Date().getTime();
console.log('new Array()输出耗时:',endTime2-startTime2);
```

结果：

```
[]输出耗时: 304
new Array()输出耗时: 600
```

每次结果不同，但大约都是`new Array()`是`[]`的两倍，时间越大，差距越大。

(最好用时间差相减来计算时间，用`console.time`可能会有先后的问题导致不准确。)

## 写法

`[]`是字面量，JSON格式的语法是引擎直接解释的；
`new Array()`需要调用`Array`的构造器。

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

# 使用lodash.cloneDeep实现深拷贝

```
import _ from 'lodash'
var obj = {id:1,name:{a:'xx'},fn:function(){}};
var obj2 = _.cloneDeep(obj);
obj2.name.a = 'obj2';
console.log(obj,obj2)
```

![image](https://img2020.cnblogs.com/blog/919128/202007/919128-20200731100645239-764277941.png)
