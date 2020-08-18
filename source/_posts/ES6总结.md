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
- 初始化必须赋值

const只能保证指向的指针是固定的。如果是数组，是可改的。

```
const arr = [];
arr.push('hello'); // ['hello']
arr.length = 0; // []
arr = ['world']; // 报错
```

## globalThis

顶层对象|浏览器|Node|Web Worker|
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