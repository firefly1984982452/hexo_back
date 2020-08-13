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

---

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

---

# setTimeout

// setTimeout的时间假设设置为1000，不是说1秒后立马会执行，而是尽快执行，把任务添加到了队列中，如果排到它了，就立马执行。

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

---

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
  if(!flag){return}
  flag = false;
  setTimeout(()=>{
    console.log('函数节流');
    flag = true;
  },1000)
}
```
![image.png](https://wx4.sinaimg.cn/mw690/0069qZtTgy1gho487f7lnj305904omx1.jpg)

---

# prototype 和 hasOwnProperty

```
Array.prototype.arr = function(){console.log('print arr')};
var a = [1,2,3];
a.arr(); // 'print arr'
Array.prototype.hasOwnProperty('arr'); // true
a.hasOwnProperty('arr'); // false
Array.hasOwnProperty('arr'); // false
```

---

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

---

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

---

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

---

# js对象

`var xm = {age:15}`


https://www.jianshu.com/p/edf4d665d0df

https://www.cnblogs.com/yanyunpiaomaio/p/11025444.html

---

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

---

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

---

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

---

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

![image.png](https://wx2.sinaimg.cn/mw690/0069qZtTgy1gho48t4y6vj30970i275q.jpg)

此时打印`Array.prototype.constructor`会发现变成了`undefined`，已经改动了原生的`Array`.

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

![image.png](https://wx1.sinaimg.cn/mw690/0069qZtTgy1gho49dgk5zj30d30irjt4.jpg)

### 区别

**写法**：

`Pd.prototype = Array.prototype;`和`Pd.prototype = Object.create(Array.prototype);`

**返回值**：

- `Pd [3] __proto__:Array(0)`直接就是真正的数组的`__proto__`;
- `Pd [3] __proto__:Array[__proto__:Array(0)]`就是`__proto__`里面包含真正的数组的`__proto__`。

### 用Object.create实现继承自己的类并带参数

```
function Cat(name,color){
    this.name = name;
    this.color = color;
}
var cat1 = new Cat('大猫','黄色');

function Pd(name,color){
    Cat.call(this,name,color);
}
Pd.prototype = Object.create(Cat.prototype);
Pd.prototype.constructor = Pd;
var pdd = new Pd('小猫','白色');

console.log(cat1,pdd); // Cat {name: "大猫", color: "黄色"} Pd {name: "小猫", color: "白色"}
```
### 用原生写法实现继承自己的类并带参数

```
function Cat(name,color){
    this.name = name;
    this.color = color;
}
var cat1 = new Cat('大猫','黄色');

function Pd(name,color){
  Cat.call(this,name,color);
}
Pd.prototype = Cat.prototype;
Pd.prototype.constructor = Pd;
var pdd = new Pd('小猫','白色');
console.log(cat1,pdd); // Cat {name: "大猫", color: "黄色"} Pd {name: "小猫", color: "白色"}
```

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

![image.png](https://wx1.sinaimg.cn/mw690/0069qZtTgy1gho49w7kobj306102wjra.jpg)

---

# extends继承

```
class Cat{
    constructor(){
        console.log('cat');
    }
}
class Child extends Cat{
};
var cat = new Cat();
var child = new Child();
```

继承所有参数：

```
class Cat{
    constructor(name){
        this.name = name;
    }
}
class Child extends Cat{
    constructor(name){
        super(name);
    }
};
var cat = new Cat('1');
var child = new Child('2');
console.log(cat,child); // Cat {name: "1"} Child {name: "2"}
```

---

# `new.target`方法判断是否父类

```
class Cat{
    constructor(){
        console.log(new.target);
        if (new.target === Cat) {
            console.log('父类');
        } else {
            console.log('子类');
        }
    }
}
class Child extends Cat{
    constructor(){
        super();
    }
};
var cat = new Cat();
var child = new Child();
```
---

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

---

# ES6`…`扩展（spread）/收集（rest）运算符详解

## 一、扩展运算符

我理解的，用`()`包起来就是扩展成单个值，用`[]`包起来就是扩展成数组。

### 1.代替apply

```
var test = function(a,b,c){
  console.log(a,b,c);
}
var arr = [1,2,3];
test(...arr); // 1 2 3
```

用apply的写法：

```
test.apply(null,arr);
```

### 2.代替concat

```
var arr1 = [1,2,3,4];
var arr2 = [0,...arr1,5,6];
console.log(arr2); // [0, 1, 2, 3, 4, 5, 6]
```

用concat的写法：

```
[0].concat(arr1,5,6); // [0, 1, 2, 3, 4, 5, 6]
```

### 3.代替split

```
var str = 'hello';
var arr3 = [...str];
console.log(arr3); // ["h", "e", "l", "l", "o"]
```

用split的写法：

```
'hello'.split(''); // ["h", "e", "l", "l", "o"]
```

## 二、收集运算符

### 1.接收不确定个数的形参

此功能和`JAVA`一样，当形参传入个数不确定时可用在形参上。

```
var rest2 = function(item, ...arr){
  console.log(item,arr);
}
rest2('hello',2,3,3,4); // hello [2, 3, 3, 4]
```

### 2.配合解构时使用

```
var [a,...temp] = [1,2,3,4];
console.log(a,temp); // 1 [2, 3, 4]
```

---

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

---

# 默认参数值

假设想要的效果是这样的：

```
var foo = function(x,y){
    x = x || 10;
    y = y || 20;
    console.log(x+y);
}
foo(1,2); // 3
foo(); // 30
```

但是也有出错的时候：

```
foo(0,1); // 11
```

第一个参数0被解析成了false，而不是数字0进行计算。

用`默认参数值`

```
var foo = function(x=10, y=20){
    console.log(x+y);
}
foo(0,1); // 1
```

---

# 解构

```
var obj = {a:1,b:2,c:3},a,b,c,p;
p = {a,b,c} = obj;
console.log(p === obj); // true
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

# Map

为什么要用Map？因为普通数据结构无法以非字符串为键。

举例：

```
var m = {};
var x = {id:1}, y = {id:2};
m[x] = 'foo';
m[y] = 'bar';
console.log(m,m[x],m[y]); // {[object Object]: "bar"} "bar" "bar"
```

对象`m`中只有一个`[object Object]`，值都是`'bar'`，它无法解析两个对象为键。

## 使用Map以非字符串为键

```
var m = new Map();
var x = {id:1}, y = {id:2};
m.set(x , 'foo');
m.set(y , 'bar');
console.log(m);
console.log(m.get(x));
console.log(m.get(y));
console.log(m.get({id:1}));
```

结果：

![image](https://wx4.sinaimg.cn/mw690/0069qZtTgy1ghel895idrj309k05i3yo.jpg)

## delete删除

```
m.delete(y);
```

## clean清除所有

```
m.clear();
m.size; // 0
```

## size大小

```
m.size;
```

## `new Map`深拷贝

```
var m2 = m1; // 浅拷贝
var m3 = new Map(m1); // 深拷贝
```

**深拷贝实例：**

```
var mm = new Map();
mm.set('a',{id:1});
var mm2 = new Map(mm);
mm2.set('a', {id:4});
console.log(mm2,mm);
```

**结果：**

![image](https://wx4.sinaimg.cn/mw690/0069qZtTgy1ghelkmlwaxj30a80340st.jpg)

两个value值都是对象，互不影响。

## Map所有的值

**方法1：`m.values()`**
**方法2：`m.entries()`**


### 方法1：`m.values()`

返回一个迭代器，可以用spread扩展运算符（`...`）或`Array.from()`转换成数组。

```
var m = new Map();
var x = {id:1}, y = {id:2};
m.set(x , 'foo');
m.set(y , 'bar');
console.log(m.values()); // MapIterator {"foo", "bar"}
console.log([...m.values()]); // ["foo", "bar"]
console.log(Array.from(m.values())); // ["foo", "bar"]
```

### 方法2：`m.entries()`

```
var m = new Map();
var x = {id:1}, y = {id:2};
m.set(x , 'foo');
m.set(y , 'bar');
console.log(m.entries()); // MapIterator {{…} => "foo", {…} => "bar"}
console.log([...m.entries()]); // [[{id: 1},'foo'],[{id: 2},'bar']]
console.log([...m.entries()][0][1]); // "foo"
console.log([...m.entries()][1][1]); // "bar"
```

## Map所有的键

### keys

```
var m = new Map();
var x = {id:1}, y = {id:2};
m.set(x , 'foo');
m.set(y , 'bar');
console.log([...m.keys()]); // [{id:1},{id:2}]
```

### has判断是否有该键

```
var m = new Map();
var x = {id:1}, y = {id:2};
m.set(x , 'foo');
m.set(y , 'bar');
console.log(m.has(y)); // true
```

## WeakMap

区别：

- 内部内存（特别是GC）的工作方式；

- WeakMap只接受对象为键；所以对象被回收项目也会移除

```
var m = new WeakMap();
var x = {id:1}, y = {id:2};
m.set(x ,y);
console.log(m.has(x)); // true
x = null;
console.log(m.has(x)); // false
```

---

# Set

Set是一个值的集合，其中的值是唯一的。

API:

**新建：new Set()**
**增：add()**
**删：delete()**
**查:has**


## 新建

```
var s = new Set([0,-0,1,2,NaN,2,3,NaN]);
console.log(s); // Set(5) {0, 1, 2, NaN, 3}
```

`0`和`-0`被认为是同一个值，`NaN`与`NaN`也是相等的。

## 添加（add）

```
s.add(7);
console.log(s); // Set(6) {0, 1, 2, NaN, 3, 7}
```

## 删除（delete和clear）

```
s.delete(2);
console.log(s); // Set(5) {0, 1, NaN, 3, 7}
s.clear();
console.log(s.size); // 0
```

## 查询是否存在（has)

不像`Map`里面的`get`能直接取值，这里是查询是否存在该值。

```
s.has(1); // true
```

## 迭代

同`Map`

```
s.keys(); // SetIterator {0, 1, NaN, 3, 7}
s.values(); // SetIterator {0, 1, NaN, 3, 7}
s.entries(); // SetIterator {0 => 0, 1 => 1, NaN => NaN, 3 => 3, 7 => 7}
```

虽然`keys()`和`values()`返回的值一样，但它们俩并不相等。

```
s.keys() == s.values(); // false
```

## WeakSet

和Set的区别：

**只能存对象**

```
var ws = new WeakSet([1,2,2,3]); // 无效：Uncaught TypeError: Invalid value used in weak set
```

WeakSet使用：

```
var obj1 = {id:1};
var obj2 = {id:2};
var ws = new WeakSet();
ws.add(obj1).add(obj2).add(obj1);
console.log(ws); // [{id:1},{id:2}]
```

添加了`obj1`两次，还是去重了。

### GC

```
obj1 = null;
console.log(ws); // [{id:1},{id:2}]
ws.has(obj1); // false
```

虽然obj1的值看上去还在，但已经取不到了。

### delete删除

```
ws.delete(obj2);
console.log(ws); // [{id:1}]
```

---

# Array、Map、WeakMap、Set、WeakSet的对比

## 对比表

|功能属性|Array|Map|WeakMap|Set|WeakSet|
|:--:|:--:|:--:|:--:|:--:|:--:|
|新建|`[]`|`new Map()`|`new WeakMap()`|`new Set()`|`new WeakSet()`|
|增|`push`|`m.set(obj,'value')`|`wm.set(obj1,'value')`|`s.add(value)`|`ws.add(obj)`|
|新建并增加|`[1,2]`|-|-|`new Set([4, 0, 0, 4, 1])`|-|
|键|对象或其它|对象或其它|只接受对象|对象或其它|只接受对象|
|删|`slice`或`splice`|`delete`|`delete`|`delete`|`delete`|
|清除|`arr = []`|`clear`|`clear`|`clear`|`clear`|
|改|`splice`|-|-|-|-|
|查|`includes`、`indexOf`等|`get`或`has`|`get`或`has`|`has`|`has`|
|键|`m.keys()`下标|`m.keys()`|-|`m.keys()`|-|
|值|`m.values()`值|`m.values()`|-|`m.values()`|-|
|迭代|`entries`|`entries`|-|`entries`|-|
|长度|`length`|`size`|-|`size`|-|

## Map API:

- size数量
- set()设置
- clear()清除
- delete()删除
- has()存在
- get()获取
- keys()键
- values()值
- entries()迭代

## WeakMap API:

- set()设置
- delete()删除
- has()存在
- get()获取
- clear()清除（已弃用，但可通过new WeakMap()空对象来置空）

## Set API:

- size数量
- add()添加
- clear()清除
- delete()删除
- has()存在
- keys()键
- values()值
- entries()迭代

## WeakSet API：

- add()添加
- delete()删除
- has()存在

---

# proxy

浅拷贝：什么也不写

```
var obj = {
  id:1
};
var p = new Proxy(obj,{});
p.a = 33;
console.log(obj); // {id:1,a:33}
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
宏任务（`macrotask`）：主代码、setTimeout、setInterval
微任务（`microtask`）：promise、process.nextTick

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

# Promise

`promise`代替`callback`回调。

## promise.all

**只能同时调用不受关联的prmise，如果promise2的值受promise1影响，不能用promise.all，可以用async/await**

首先假设要依次调用3个`promise`的代码：

```
var pro1 = new Promise((resolve,reject) => {
    console.log(1);
    resolve('hello')
})
var pro2 = new Promise((resolve,reject) => {
    console.log(2);
    setTimeout(()=>{
        resolve('world')
    },1000);
})
var pro3 = new Promise((resolve,reject) => {
    console.log(3);
    setTimeout(()=>{
        resolve('pdd')
    },2000);
})
```

如果不用`promise.all`来调用的话：

```
pro1.then((res1)=>{
});
pro2.then((res2)=>{
})
pro3.then((res3)=>{
})
```

只有不停的用`.then`才能保证每一步都正确，此时使用`promise.all`：

```
Promise.all([pro1,pro2,pro3]).then(val=>{
    console.log(val);
})
```

## promise.race

第一个抛出`resolve`的`promise`就是`Promise.race`获取的值。

这种模式称为门闩模式、promise中称中竞态。

```
var pro2 = new Promise((resolve,reject) => {
    console.log(2);
    setTimeout(()=>{
        resolve('world')
    },1000);
})
var pro3 = new Promise((resolve,reject) => {
    console.log(3);
    setTimeout(()=>{
        resolve('pdd')
    },2000);
})
Promise.race([pro2,pro3]).then(val=>{
    console.log(val);
})
```

此时，pro2要花费1秒，pro3要花费2秒，谁先`resolve`，`.then`获取的`val`就是谁的。

---

# async/await

[学习链接](https://segmentfault.com/a/1190000007535316)

## 普通函数和async的区别

普通函数：

```
function testAsync(){
    return 'hello world'
}
testAsync(); // 'hello world'
```

`async`函数：

```
async function testAsync(){
    return 'hello world'
}
testAsync(); // Promise {<fulfilled>: "hello world"}
```

`async`返回的是一个`promise`对象

## await

如果不用async/await：

```
async function testAsync(){
    return new Promise(resolve => {
        setTimeout(()=>resolve('long_time_value'), 1000);
    })
}
testAsync().then(v=>{
    console.log('get',v);
})
```

1秒后：get long_time_value

如果用的话：

```
function testAsync(){
    return new Promise(resolve => {
        setTimeout(()=>resolve('long_time_value'), 1000);
    })
}

async function test(){
    const v = await testAsync();
    console.log(v);
}
test();
```

1秒后：get long_time_value

### 优势：处理then链

```
function takeLongTime(n){
    return new Promise(resolve => {
        setTimeout(()=> resolve(n+200), n);
    })
}

function step1(n) {
    console.log(`step1 with ${n}`);
    return takeLongTime(n);
}

function step2(n) {
    console.log(`step2 with ${n}`);
    return takeLongTime(n);
}

function step3(n) {
    console.log(`step3 with ${n}`);
    return takeLongTime(n);
}

function doIt(){
    console.time("doIt");
    const time1 = 3000;
    step1(time1)
        .then(time2 => step2(time2))
        .then(time3 => step3(time3))
        .then(result => {
            console.log(`result is ${result}`);
            console.timeEnd("doIt");
        });
}
doIt();

step1 with 3000
VM5329:13 step2 with 3200
VM5329:18 step3 with 3400
VM5329:29 result is 3600
VM5329:30 doIt: 9606.429931640625ms

```

每一个promise都受上一个promise影响，所以必须一个调完之后再调另外一个。

再看看用async/await更改doIt方法：

```
async function doIt(){
    console.time("doIt");
    const time1 = 3000;
    const time2 = await step1(time1);
    const time3 = await step2(time2);
    const result = await step3(time3);
    console.log(`result is ${result}`);
    console.timeEnd("doIt");
}
doIt();

```

结果和上一个不停用`then`链的一样，但是代码要清晰得多，而且没有回调地狱。