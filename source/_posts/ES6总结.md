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

---

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

# Set和Map

[链接](https://firefly1984982452.github.io/2020/06/28/%E3%80%8AJavaScript%E9%AB%98%E7%BA%A7%E7%A8%8B%E5%BA%8F%E8%AE%BE%E8%AE%A1%E3%80%8B%E7%AC%94%E8%AE%B0/#Map)

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

[链接](https://firefly1984982452.github.io/2020/06/28/%E3%80%8AJavaScript%E9%AB%98%E7%BA%A7%E7%A8%8B%E5%BA%8F%E8%AE%BE%E8%AE%A1%E3%80%8B%E7%AC%94%E8%AE%B0/#Promise)

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

# async

[链接](https://firefly1984982452.github.io/2020/06/28/%E3%80%8AJavaScript%E9%AB%98%E7%BA%A7%E7%A8%8B%E5%BA%8F%E8%AE%BE%E8%AE%A1%E3%80%8B%E7%AC%94%E8%AE%B0/#async/await)

# Class

[链接](https://firefly1984982452.github.io/2020/06/28/%E3%80%8AJavaScript%E9%AB%98%E7%BA%A7%E7%A8%8B%E5%BA%8F%E8%AE%BE%E8%AE%A1%E3%80%8B%E7%AC%94%E8%AE%B0/#extends%E7%BB%A7%E6%89%BF)

# Module

[链接](https://firefly1984982452.github.io/2020/06/28/%E3%80%8AJavaScript%E9%AB%98%E7%BA%A7%E7%A8%8B%E5%BA%8F%E8%AE%BE%E8%AE%A1%E3%80%8B%E7%AC%94%E8%AE%B0/#export%20%E5%92%8C%20import%20%E5%92%8C%20require)