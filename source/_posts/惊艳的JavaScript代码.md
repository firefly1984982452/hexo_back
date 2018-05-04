---
title: 惊艳的JavaScript代码
date: 2018-04-26 17:25:54
tags:
categories: 编程开发
---

# 单行写一个评级组件

"★★★★★☆☆☆☆☆".slice(5 - rate, 10 - rate);定义一个变量rate是1到5的值

# `$$("*")`的使用

`$$("*")`相当于选择所有的标签，但是只有控制台有用。


# 合并两个数组

```
var x = {a:1};
var y = {b:2};
var z = Object.assign(x,y)
	z // {a: 1, b: 2}
```

# set去重

`[...new Set([1,2,'1',2,3,1])]`

结果：`(4) [1, 2, "1", 3]`

# 用最短的代码实现一个长度为m(6)且值都n(8)的数组

`Array(6).fill('8')`

# 取一个数组中的最大值 和最小值 

```
var numbers = [1232,5324,234,234,123,-234,234,54,12];
Math.max.apply(Math,numbers);//最大值 
Math.min.apply(Math,numbers);//最小值 
```

**[参考：](https://github.com/jawil/blog/issues/24)**