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

# concat()

合并两个字符串

`'w'.concat('e')` // 'we'

# indexOf()

返回字符首次出现的位置

`'abcc'.indexOf('c')` // 2

# includes()

判断字符串中是否包含某字符串

`'abcc'.includes('c')` // true
# repeat

重复并返回

`'e'.repeat(30)` // "eeeeeeeeeeeeeeeeeeeeeeeeeeeeee"

# replace()

替换

`'abc'.replace('b','d')` // "adc"

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
