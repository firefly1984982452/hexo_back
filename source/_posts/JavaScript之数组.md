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

# copyWithin

复制指定值（数组中的值）到指定位置

```
//  将 3 号位复制到 0 号位
[1, 2, 3, 4, 5].copyWithin(0, 3, 4)
// [4, 2, 3, 4, 5]
```

# entries

返回迭代器，一般和`next`一起使用

`['a', 'b', 'c'].entries().next().value`

# values

和entries异曲同工
返回迭代器，一般和`next`一起使用

`['a', 'b', 'c'].values().next().value`

# every

```
function c(element,index,array){
    return (element > 10)
}
[12, 54, 18, 130, 44].every(c)
//true
[12, 5, 8, 130, 44].every(c)
//false
```

# some
和every异曲同工
```
function c(element,index,array){
    return (element > 10)
}
[12, 54, 18, 130, 44].some(c)
//true
[2, 5, 8, 3, 4].some(c)
//false
```

# filter

```
[12, 5, 8, 130, 44].filter( num => num >10)
(3) [12, 130, 44]
```

# find和findIndex

```
[12, 5, 8, 130, 44].find((ele)=>{return ele>10})
//12
[12, 5, 8, 130, 44].findIndex((ele)=>{return ele>20})
//3
```

# includes
返回是否有这个值
```
[1,2,3].includes(2)
//true
```

# indexOf
返回这个值是第几个
```
[1,2,3].includes(2)
//1
```

# map

原来的：

```
for(var i in list){
    list[i].type = 1
}

```

优化后：

```
list.map(item => {
    item.type = 1
})
```

# toLocalString

```
arr.toLocaleString()
"1,2,3,4,5"
```