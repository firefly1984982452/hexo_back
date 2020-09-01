---
title: List去重统计的算法
date: 2020-08-28 15:44:34
categories: 
- program
---

# 题：将list变成arry

```
const list = [
    { name: '1', type:1 },
    { name: '1', type:1 },
    { name: '1', type:1 },
    { name: '1', type:2 },
    { name: '1', type:2 },
    { name: '2', type:2 },
    { name: '2', type:2 },
    { name: '2', type:2 }
]
const arry = [
    { name: '1', type:1, total:3 },
    { name: '1', type:2, total:2 },
    { name: '2', type:2, total:3 },
]
```

# 6月12号解题


最原始的写法，写了4个for循环，每个都嵌套了2层。

# 8月28日二解

```
const arr = [];
var item = {
    name: list[0].name,
    type: list[0].type,
    total: 0
}
list.forEach(val => {
    if(val.name == item.name && val.type == item.type) {
        ++item.total;
    } else {
        arr.push(item);
        item = {
            name: val.name,
            type: val.type,
            total: 1

        }
    }
})
arr.push(item);
console.log(arr);
```

# 别人写的

![image](https://wx4.sinaimg.cn/mw690/0069qZtTgy1gi6oba2y5ej30qu064q6r.jpg)

```
var ary = list.reduce((item, next) => {
    var isHas = item.find(v => v.name === next.name && v.type === next.type);
    if(isHas == undefined) {
        next.total = list.filter(v => v.name == next.name && v.type == next.type).length
        item.push(next);
    }
    return item;
},[])
```