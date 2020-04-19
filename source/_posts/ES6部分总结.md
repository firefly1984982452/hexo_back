---
title: ES6部分总结
date: 2019-10-16 15:44:34
tags:
categories: 编程开发
---

# 数字

## isFinite 是否为数字型

之前判断一个值是否为数字类型都是用`typeof`，此处的 `isFinite`也有同样的效果

```
typeof 1.2 ; // 'number'
Number.isFinite(1.2) ; // true
```

## isInteger 是否为整数

判断是否为整数

`Number.isInteger(13)`

## 安全范围

整数的操作有一个安全范围，即2的53次方。

`Math.pow(2, 53) - 1 = 9007199254740991`

`Number.MAX_SAFE_INTEGER`：最大安全范围

`Number.MIN_SAFE_INTEGER`：最小安全范围

`Number.isSafeInteger(12)`：是否在安全范围内

# 字符串

```
var name = 'firefly'
var str = 'hello firefly'
```

## indexOf 找出包含字符串的公交车

`str.indexOf(name) ; // 6`

判断字符串是否包含另一个字符串，并返回其出现的位置（同数组的方法）

## includes 是否包含

`str.includes(name) ; // true`

判断字符串是否包含另一个字符串（同数组的方法）

## startsWith 是否在开头包含

`str.startsWith(name) ; // false`

## endsWith 是否在结尾包含

`str.endsWith(name) ; // true`

## repeat 重复

`'12'.repeat(3); // 121212`

`repeat`方法还可以用原始的代码完成：

```
new Array(3).join('12'); // 1212
```

# 对象

## is

`Object.is()` 的意思是对象比较

比如之前判断一个值是否为`NaN`的话可能会用`Number.isNaN()`，现在用`Object.is(NaN, NaN)`也能达到一样的效果。

## 对象key值构建

```
var a = 'name'
var b = {
    [a] : '小明'
}

结果：

b = {
    name: '小明'
}
```

## assign合并对象

数组我们一般用`concat`合并，同理，对象用`assign`合并。

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