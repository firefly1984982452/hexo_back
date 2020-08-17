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
