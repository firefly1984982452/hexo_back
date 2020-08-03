---
title: JavaScrip专业名词
date: 2020-08-03 10:19:32
categories: 
- program
---

# transpiling

**转换+编译技术**

比如：`var obj = {foo}`相当于：`var obj = {foo : foo}`。
ES6的转换大部分是用`transpiling`。


# 字面量

`var obj = {}`，这个`{}`就是字面量。

# 字面值

**独立存在没有保存在变量中**

`var num = 2`，这个`2`就是字面值。

# typeof

**询问的不是a的类型，而是a的当前值的类型**

**在JS中，只有值有类型，变量只是容器**。

`var a = 2`，`typeof`查询的是`2`。


# IFEE（立即调用函数表达式）

`()()`

# TDZ（临时死亡区）

**一个已经声明但没有初始化的变量**

```
console.log(b);
let b;
```

此时的b是undefined

# 扩展运算符（spread）（…）

# 收集运算符（rest）（…）

和JAVA一样，当形参传入个数不确定时可用在形参上。