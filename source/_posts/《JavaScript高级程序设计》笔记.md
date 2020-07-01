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

