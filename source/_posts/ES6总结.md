---
title: ES6总结
date: 2020-08-17 18:50:17
categories: 
- program
---

[链接](https://es6.ruanyifeng.com/)

# let、const和globalThis

## let

- 只在块级作用域内起效
- 不存在变量提升
- 暂时性死区
- 不允许重复声明
- 块级作用域替代IIFE立即执行函数

### 不存在变量提升

```
// var 的情况
console.log(foo); // 输出undefined
var foo = 2;

// let 的情况
console.log(bar); // 报错ReferenceError
let bar = 2;
```

### 暂时性死区

```
var tmp = 123;

if (true) {
  tmp = 'abc'; // ReferenceError
  let tmp;
}
```

### 不允许重复声明

```
// 报错
function func() {
  let a = 10;
  var a = 1;
}

// 报错
function func() {
  let a = 10;
  let a = 1;
}
```

### 块级作用域替代IIFE立即执行函数

```
// IIFE 写法
(function () {
  var tmp = ...;
  ...
}());

// 块级作用域写法
{
  let tmp = ...;
  ...
}
```

## const

- 只在块级作用域内起效
- 不存在变量提升
- 暂时性死区
- 不允许重复声明
- 不允许更改
- 不允许删除
- 初始化必须赋值

const只能保证指向的指针是固定的。如果是数组，是可改的。

```
const arr = [];
arr.push('hello'); // ['hello']
arr.length = 0; // []
arr = ['world']; // 报错
```

## globalThis

|顶层对象|浏览器|Node|Web Worker|
|:--:|:--:|:--:|:--:|
|window|✓|×|×|
|self|✓|×|✓|
|global|×|×|✓|
|globalThis(ES2020)|✓|✓|✓|


## 常量变量

```
const PI = 3.14
```

## 常量对象

```
var OBJ = {
    name: '姓名',
    age: 12
}
Object.freeze(OBJ);
```


# 变量的解构赋值

## 数组

### 用法

**用法：只要等号两边的模式相同，左边的变量就会被赋予对应的值，解析失败返回undefined。（按次序）**

```
let [x, , y] = [1, 2, 3];
x // 1
y // 3

let [head, ...tail] = [1, 2, 3, 4];
head // 1
tail // [2, 3, 4]

let [x, y, ...z] = ['a'];
x // "a"
y // undefined
z // []
```

### 默认值

**默认值：数组成员严格等于===，默认值才生效**

```
let [foo = true] = [];
foo // true

let [x, y = 'b'] = ['a']; // x='a', y='b'
let [x, y = 'b'] = ['a', undefined]; // x='a', y='b'
let [x = 1] = [null];
x // null
```


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

## 对象

### 使用

**使用：变量与属性同名即可取到值，解析失败返回undefined**

```
let { bar, foo } = { foo: 'aaa', bar: 'bbb' };
foo // "aaa"
bar // "bbb"

let { baz } = { foo: 'aaa', bar: 'bbb' };
baz // undefined
```

实际上`let { bar } = { bar: 'bbb' };`是简写，全称是：`let { bar:bar } = { bar: 'bbb' };`；

所以如果变量名与属性名不一致，必须写成全称：

（字义name变量接收对象里的title字段）
```
let {title:name} = {title:'小明',sex:'男'};
title // 小明
```

在解构中，**左边是模式，右边是赋值**。


### 默认值

**默认值：对象属性严格等于===，默认值才生效**

```
var {x, y = 5} = {x: 1};
x // 1
y // 5

var {x: y = 3} = {};
y // 3

var {x: y = 3} = {x: 5};
y // 5
```

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

### 注意点

（1）将一个已声明的变量解构时注意不要将{}放于行首，JavaScript会解析为代码块

```
// 错误的写法
let x;
{x} = {x:1};
// SyntaxError: syntax error

// 正确的写法
let x;
({x} = {x:1});
```

（2）解构允许等号左边不放置任何变量，但是无意义。

```
({} = {x:1});
```

（3）数组中模式为数字时，代表下标

```
let arr = [1, 2, 3];
let {0 : first, [arr.length - 1] : last} = arr;
first // 1
last // 3
```

## 字符串

字符串直接转换为数组赋值

```
const [a, b, c, d, e] = 'hello';
a // "h"
b // "e"
c // "l"
d // "l"
e // "o"
let {length : len} = 'hello';
len // 5
```

## 数值和布尔值

如果等号右边是数值和布尔值，会转换成对象。

```
let {toString: s} = 123;
s === Number.prototype.toString // true

let {toString: s} = true;
s === Boolean.prototype.toString // true
```

## 用途

(1) 变换变量的值

```
let x = 1;
let y = 2;
[x,y] = [y,x];
```
（2）提取对象的属性

（3）遍历Map

任何部署了 Iterator 接口的对象，都可以用for...of循环遍历

```
const map = new Map();
map.set('first', 'hello');
map.set('second', 'world');

for (let [key, value] of map) {
  console.log(key + " is " + value);
}
// first is hello
// second is world
```

（4）输入模块的指定方法

```
improt {list1} from 'list'
```

## 对比表

|值|用法|括号|默认值|默认值生效条件|
|:--:|:--:|:--:|:--:|:--:|
|数组|`let [a, b] = [1, 2];`|数组`[]`|`let [foo = true] = [];`|值为`undefined`|
|对象|`let { foo } = { foo: 'aaa'};`|对象`{}`|`let {foo} = {bar: 'baz'};`|值为`undefined`|
|字符串|`const [a, b, c] = 'hello';`|数组`[]`|`const [a,b = 5] = 'e'`|值为`undefined`|
|数值（转对象、无意义）|`let {toString: s} = 123;`|对象`{}`|-|-|
|布尔（转对象、无意义）|`let {toString: s} = true;`|对象`{}`|-|-|


# 字符串的扩展

[链接](https://firefly1984982452.github.io/2020/06/05/js%20String%E5%AF%B9%E8%B1%A1/)

<iframe style="width:100%;height:900px;" src="https://firefly1984982452.github.io/2020/06/05/js%20String%E5%AF%B9%E8%B1%A1/"></iframe>

# 数值的扩展

<iframe style="width:100%;height:900px;" src="https://firefly1984982452.github.io/2020/06/05/js%20Math%E5%92%8CNumber/"></iframe>


# 函数的扩展

## 函数的默认参数

值为`undefined`时才生效

```
function log(x, y = 'World') {
  console.log(x, y);
}

log('Hello') // Hello World
log('Hello', 'China') // Hello China
log('Hello', '') // Hello
```
### 与解构赋值默认值结合使用

**当不使用默认值时**：

```
function foo({x, y = 5}) {
  console.log(x, y);
}

foo({}) // undefined 5
foo({x: 1}) // 1 5
foo({x: 1, y: 2}) // 1 2
foo() // TypeError: Cannot read property 'x' of undefined
```

此时的x和y没有函数参数默认值，所以会报错。

**使用默认值时**：

```
function foo({x, y = 5} = {}) {
  console.log(x, y);
}

foo() // undefined 5
```

### 位置

必须是尾参数，不然除非调用时显示写上undefined，如：`foo(undefined,1)`。


### 作用域

只在function内部有效

### 应用

- 如果省略某参数，函数仍然进行

## reset参数

### 使用

相当于将函数自带的arguments转换成了数组。

（reset参数的形式与java类似）

```
function f1(){
    console.log(arguments)
    console.log(Array.from(arguments))
}
function f2(...values){
    console.log(values)
}

f1(3213,23,2,2332,32,);
// Arguments(5) [3213, 23, 2, 2332, 32, callee: ƒ, Symbol(Symbol.iterator): ƒ]
// (5) [3213, 23, 2, 2332, 32]

f2(3213,23,2,2332,32,)
// (5) [3213, 23, 2, 2332, 32]
```

### 位置

必须是尾参数。

## 箭头函数

作用：

- 简化代码回调函数
- 提升this

### 使用

```
// 简写：
data.map(val => val.id);
// 全写：
data.map((val) => {
  return val.id;
})
```

### 与箭头函数结合

```
function f1(...values){
    return values;
}
var f2 = (...values) => values;

f1(1,2,3,4); // [1, 2, 3, 4]
f2(1,2,3,4); // [1, 2, 3, 4]
```
## 尾调用优化

### 尾调用是什么

**某个函数的最后一步是调用另一个函数**

以下三种情况，都不属于尾调用：

```
// 情况一
function f(x){
  let y = g(x);
  return y;
}

// 情况二
function f(x){
  return g(x) + 1;
}

// 情况三
function f(x){
  g(x);
}
```

情况一：调用函数g之后，还有赋值操作；
情况二：调用函数g之后，还有`+1`的操作；
情况三：调用函数g之后，还隐式的调用了`return undefined`。

### 尾调用优化

**只保留内层函数的调用帧**

```
function f() {
  let m = 1;
  let n = 2;
  return g(m + n);
}
f();

// 等同于
function f() {
  return g(3);
}
f();

// 等同于
g(3);
```

### 尾递归

**尾调用自身**

例如将下面的普通递归改为尾递归

```
function factorial(n) {
  if (n === 1) return 1;
  return n * factorial(n - 1);
}

factorial(5) // 120
```

此时需要保存n个记录，复杂度O(n)；

尾递归只保留一个调用记录，复杂度O(1)：

```
function factorial(n, total) {
  if (n === 1) return total;
  return factorial(n - 1, n * total);
}

factorial(5, 1) // 120
```

### 递归函数的改写

**柯里化**：将多参数的函数转换成单参数的形式。（默认值正好可以用上）

```
function factorial(n, total = 1) {
  if (n === 1) return total;
  return factorial(n - 1, n * total);
}

factorial(5) // 120
```

# 数组的扩展

<iframe style="width:100%;height:900px;" src="https://firefly1984982452.github.io/2020/06/08/JavaScript%E4%B9%8B%E6%95%B0%E7%BB%84/"></iframe>

# 对象

<iframe style="width:100%;height:900px;" src="https://firefly1984982452.github.io/2020/08/05/JavaScript%E4%B9%8B%E5%AF%B9%E8%B1%A1/"></iframe>

# Symbol

```
var a = Symbol('e')
var b = Symbol('e')
a == b //false

var c = 'e'
var d = 'e'
c == d // true
c === d // true
```

可以看出，正常情况下，只要值一样，不管是`==`还是`===`，都是相等的，但是Symbol就能保证值的唯一性。


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


# Proxy

```
function observerProxy(obj){
    let handler = {
		get(target,key,receiver){
			console.log('获取'+key);
			if(typeof target[key] === 'object' && target[key] !== null) {
				return new Proxy(target[key],handler);
			}
			return Reflect.get(target,key,receiver);
		},
        set(target,key,value,reciver){
			console.log(target,key,value,reciver)
			return Reflect.set(target,key,value,reciver);
        }
    }
    return new Proxy(obj,handler)
}
var obj2 = {
    name: '小明',
    flag: {
        book: {
            name : 'js',
            page: 325
        },
    }
}
var objTest = observerProxy(obj2)
objTest.flag.book.page = 33
```

# Reflect

## 修改Object的返回结果

`Object.defineProperty(obj, name, desc)`在无法定义属性时，会抛出一个错误，而`Reflect.defineProperty(obj, name, desc)`则会返回`false`。

```
// 老写法
try {
  Object.defineProperty(target, property, attributes);
  // success
} catch (e) {
  // failure
}

// 新写法
if (Reflect.defineProperty(target, property, attributes)) {
  // success
} else {
  // failure
}
```

## 命令式编程变成函数式编程

原来的：

```
'name' in obj;
```

现在的：

```
Reflect.has(obj, 'name');
```

## 与Proxy语法一一对应


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


# Iterater和for...of循环

## Iterator

可遍历的类数组：

`nodeList`、`Map`、`Set`、`Array`、`String`、`arguments`。

都可以用`Array.from`和扩展运算符（`...`）转换为真正的数组。

都可以用`for...of`遍历值。

## for...of

`for...of`的使用范围是所有部署了`Iterator`的对象。

### 使用

#### 数组

```
// 数组
let arr = ['a', 'b', 'c'];
for (let pair of arr) {
  console.log(pair);
}
for (let pair of arr.entries()) {
  console.log(pair);
}
for (let pair of arr.keys()) {
  console.log(pair);
}
for (let pair of arr.values()) {
  console.log(pair);
}
```

#### 字符串

```
let str = "hello";

for (let s of str) {
  console.log(s); // h e l l o
}
```

#### DOM NodeList对象

```
let paras = document.querySelectorAll("p");

for (let p of paras) {
  p.classList.add("test");
}

```

#### arguments对象

```
function printArgs() {
  for (let x of arguments) {
    console.log(x);
  }
}
printArgs('a', 'b');
// 'a'
// 'b'
```

### 对象

遍历对象可以减少使用`Object.keys()`这一步骤。

```
let es6 = {
  edition: 6,
  committee: "TC39",
  standard: "ECMA-262"
};

for (let e in es6) {
  console.log(e);
}
// edition
// committee
// standard
```

**用`for...in`遍历对象时会报错**

### 对比

`for`的缺陷

```
// 取值比较麻烦
for (var index = 0; index < myArray.length; index++) {
  console.log(myArray[index]);
}
```

为了解决for麻烦的问题，引入的forEach

```
// 问题：无法跳出循环
myArray.forEach(function (value) {
  break;
  console.log(value);
});
```

`for...in`的缺陷：

```
1. 会遍历所有可枚举的属性，包括原型链（是否可遍历只和该对象上的属性enumerable有关，和在哪里无关）
2. 除了数组中的元素，会遍历数组的私有属性
3. 专门为对象设计
```

### 对比表

|功能|`for`|`forEach`|`for...in`|`for...of`|
|:--:|:--:|:--:|:--:|:--:|
|跳出循环|×|`try...catch`和`throw`|`return` 或 `break`|`return` 或 `break`|
|遍历数组时的`value`|下标|下标|下标|值|
|遍历对象时的`value`|`TypeError`|`TypeError`|key|`TypeError`|

总结：

`for...of`可以`bread`，遍历时是值；
`for...in`遍历对象更优，可简写`Objec.keys()`;

# Generator


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

# Class


# export 和 import 和 require

## 普通使用

constant.js
```
var constant = {
    edit:"编辑",
    test:'2'
}

var b = {};

export {
    constant,
    b
};
```

test.vue
```
import {constant,b} from '@/utils/test';
console.log(constant,b)
```

## 全局使用

constant.js
```
export default {
    list1:[],
    list2:[],
    b:function(){}
}
```

main.js
```
improt constant from './utils/test';
Vue.prototype.$constant = constant;
```

test.vue
```
this.list = this.$constant.list1;
```

## `export`和`export default`的区别

- `export`需要导出多个并需要`{}`，`export default`只需要一个`{}`导出全部（没有额外`{}`）；
- `import`时，`export`需要导入多个，`export default`是默认的，只需要给一个名字；

## require

`require`是`AMD`规范；`import`是`ES6`规范。

`require`是赋值，`import`是解构。

```
defaultImg2: require("../../../assets/img/default.png"),
```
