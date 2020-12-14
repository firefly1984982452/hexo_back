---
title: JavaScript之String对象
date: 2020-06-05 13:40:32
categories: 
- program
---

# length

长度

`'wejfoiwe'.length` // 8

# charAt()

返回指定位置的字符

`'ewfwef'.charAt(5)` // f
`'ewfwef'[5]` // f

区别：

`'ewfwef'.charAt(53)` // ""
`'ewfwef'[59]` // undefined

# charCodeAt()

返回uniccode/accsic编码

```
'a'.charCodeAt(0); // 97
```

# fromCharCode()

将 Unicode 编码转为一个字符:

```
String.fromCharCode(65); // A
```

# concat()

合并两个字符串

`'w'.concat('e')` // 'we'

# indexOf()

返回字符首次出现的位置

`'abcc'.indexOf('c')` // 2

# lastIndexOf()

上次，倒数。

# match

## 检索字符串

```
'hello world'.match('world'); // ["world", index: 6, input: "hello world", groups: undefined]
```

## 匹配正则

```
"1 plus 2 equal 3".match(/\d/g); // ["1", "2", "3"]
```

# includes()

判断字符串中是否包含某字符串

`'abcc'.includes('c')` // true
# repeat

重复并返回

`'e'.repeat(30)` // "eeeeeeeeeeeeeeeeeeeeeeeeeeeeee"

# replace()

替换

`'abc'.replace('b','d')` // "adc"

# search()

返回下标

```
'hello world'.search('wor'); // 6
```

# split()

分割为数组

`'abcd'.split('')` // ["a", "b", "c", "d"]

**tips：把字符串变为数组最快的方法**

`'abc'.split(' ')` // ['abc']

# substr()

截取（位置，个数）

`'abcdefg'.substr(2,3)` // "cde"

# substring()

截取（开始位置，结束位置）

`'abcdefg'.substring(2,3)` // "c"
`'abcdefg'.substring(2)` // "cdefg"
`'abcdefg'.substring(2,-9)` // "ab" **与slice的区别**

# slice()

截取（开始位置，结束位置）

`'abcdefg'.slice(2,3)` // "c"
`'abcdefg'.slice(2)` // "cdefg"
`'abcdefg'.slice(2,-9)` // "" **与substring的区别**

# toLowerCase()

把字符串变为小写

`'B'.toLowerCase()` // "b"

# toUpperCase()

把字符串变为大写

`'a'.toUpperCase()` // "A"

# trim()

去掉两边的空字符串

`' we '.trim()` // "we"

# 其它技巧


## 金钱格式化toLocalString

```
var num = 1234567890;
num.toLocalString();    //'1,234,567,890'
num.toLocaleString('en-US'); // 效果相同
```

## 单行写一个评级组件

"★★★★★☆☆☆☆☆".slice(5 - rate, 10 - rate);定义一个变量rate是1到5的值
