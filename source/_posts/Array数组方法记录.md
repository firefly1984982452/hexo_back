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