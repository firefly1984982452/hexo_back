---
title: Array数组方法记录
date: 2019-02-11 12:15:18
tags:
categories: 编程开发
---

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

```
[1,2,3].includes(2)
//true
```