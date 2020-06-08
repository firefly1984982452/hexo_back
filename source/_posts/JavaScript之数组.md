---
title: JavaScript之数组
date: 2020-06-08 15:44:34
tags:
categories: 编程开发
---

# 判断[1,2]是否为数组的方法

**typeof 不能验证[1,2]是否为数组，返回的是'object'**

## Array.isArray

```
Array.isArray([1,2]) // true
```

## instanceof

```
[1,2] instanceof Array
```

来一下`instanceof`的具体实现方法

```
function instanceof(left, right) {
    // 获得类型的原型
    let prototype = right.prototype
    // 获得对象的原型
    left = left.__proto__
    // 判断对象的类型是否等于类型的原型
    while (true) {
        if (left === null)
            return false
        if (prototype === left)
            return true
        left = left.__proto__
    }
}
```

所以`[1,2].__proto__ === Array.prototype`也是可以验证是否为数组

## constructor

```
[1,2].constructor === Array
```

同上理

## apply、call、bind

```
({}).toString.apply([1,2]) === '[object Array]'
({}).toString.call([1,2]) === '[object Array]'
({}).toString.bind([1,2])() === '[object Array]'
```

# 截取

## slice

截取数组一部分，并返回新数组，输入开始位置，结束位置

**不会改变原数组**

```
var arr = ['A', 'B', 'C', 'D', 'E', 'F', 'G'];
arr.slice(1,3);      //(2) ["B", "C"]

```

## splice

从数组中添加或删除元素

开始位置，个数，添加数据

**会改变原数组**

```
var arr = ['A', 'B', 'C', 'D', 'E', 'F', 'G'];
arr.splice(1,3);     //(3) ["B", "C", "D"]
```

# 在开头或末尾增加或删除

## push和pop

push()向Array的末尾添加若干元素，pop()则把Array的最后一个元素删除掉.

```
var arr = ['A', 'B', 'C', 'D', 'E', 'F', 'G'];
arr.push('h');       //['A', 'B', 'C', 'D', 'E', 'F', 'G','h'];
arr.pop();           //['A', 'B', 'C', 'D', 'E', 'F', 'G']
```

## shift和unshift

shift()删除数组第一个数据；
unshift()删除数姐最后一个数据。

# 排序

## sort

按ascii码排序

```
var arr = [23,122,1,53,231]
arr.sort();          //(5) [1, 122, 23, 231, 53]
```

升序

```
var arr = [23,122,1,53,231];
arr.sort((a,b) => {return a - b}); //[1, 23, 53, 122, 231]

```

## reverse 

倒序

```
var arr = [23,122,1,53,231]
arr.reverse();       //(5) [53, 231, 23, 122, 1]
```


# cancat

合并两个数组

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

# 查询和过滤

## entries

返回迭代器，一般和`next`一起使用

`['a', 'b', 'c'].entries().next().value`

## values

和entries异曲同工
返回迭代器，一般和`next`一起使用

`['a', 'b', 'c'].values().next().value`

## every

检查数组的每个元素是否符合条件

```
function c(element,index,array){
    return (element > 10)
}
[12, 54, 18, 130, 44].every(c)
//true
[12, 5, 8, 130, 44].every(c)
//false
```

## some
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

## filter

```
[12, 5, 8, 130, 44].filter( num => num >10)
(3) [12, 130, 44]
```

## indexOf

与String类似，Array也可以通过indexOf()来搜索一个指定的元素的位置：

```
var arr = [123,124,'124'];
arr.indexOf(124);    //1
```

注意了，数字124和字符串'124'是不同的元素。

## find和findIndex

```
[12, 5, 8, 130, 44].find((ele)=>{return ele>10})
//12
[12, 5, 8, 130, 44].findIndex((ele)=>{return ele>20})
//3
```

## includes
返回是否有这个值
```
[1,2,3].includes(2)
//true
```


# fill

填充

```
var arr = new Array(8).fill('2'); // ["2", "2", "2", "2", "2", "2", "2", "2"]
```

# 遍历

## map

遍历，**返回新数据**，对原数组不影响。

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

## forEach

遍历，每个元素执行回调函数，**返回undefined**。

## reduce

将数组计算为一个值

原来写法：

```
var numbers = [15.5, 2.3, 1.1, 4.7];
let total = 0;
numbers.forEach(val => {
    total += val;
})
console.log(total); // 23.6
```

reduce写法：

```
var numbers = [15.5, 2.3, 1.1, 4.7];

function getSum(total, num) {
    return total + num;
}

console.log(getSum,0); // 23.6
```

# toLocalString

```
arr.toLocaleString()
"1,2,3,4,5"
```

# from

## 将类数组对象或可遍历对象变成真正的对象。

```
let arrayLike = {
0: 'tom',
1: '65',
2: '男',
3: ['jane','john','Mary'],
'length': 4
}
let arr = Array.from(arrayLike)
console.log(arr) // ['tom','65','男',['jane','john','Mary']]
```

其它情况则不会改变，会变成`[ undefined, undefined, undefined, undefined ]`。

## Set变为数组

```
Array.from(new Set([1,3,3,4])) //[1, 3, 4]
```

还能带参数

```
Array.from(new Set([1,3,3,4]), item => item + 1) //[2, 4, 5]
```


## 字符串变为数组

```
Array.from('hello') // ["h", "e", "l", "l", "o"]
```