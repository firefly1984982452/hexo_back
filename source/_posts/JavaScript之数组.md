---
title: JavaScript之数组
date: 2018-05-02 15:44:34
tags:
categories: 编程开发
---

# indexOf

与String类似，Array也可以通过indexOf()来搜索一个指定的元素的位置：

```
var arr = [123,124,'124'];
arr.indexOf(124);    //1
```

注意了，数字124和字符串'124'是不同的元素。

# slice

```
var arr = ['A', 'B', 'C', 'D', 'E', 'F', 'G'];
arr.slice(1,3);      //(2) ["B", "C"]

```


# push和pop

push()向Array的末尾添加若干元素，pop()则把Array的最后一个元素删除掉.

```
var arr = ['A', 'B', 'C', 'D', 'E', 'F', 'G'];
arr.push('h');       //['A', 'B', 'C', 'D', 'E', 'F', 'G','h'];
arr.pop();           //['A', 'B', 'C', 'D', 'E', 'F', 'G']
```

# sort和reverse

```
var arr = [23,122,1,53,231]
arr.sort();          //(5) [1, 122, 23, 231, 53]
arr.reverse();       //(5) [53, 231, 23, 122, 1]
```

# splice

```
var arr = ['A', 'B', 'C', 'D', 'E', 'F', 'G'];
arr.splice(1,3);     //(3) ["B", "C", "D"]
```

# cancat

```
var a = ['a','b'];
var b = ['c','d']
var c = a.concat(b);
c                  //(4) ["a", "b", "c", "d"]
```

# join

```
c.join(',');       //"a,b,c,d"
```