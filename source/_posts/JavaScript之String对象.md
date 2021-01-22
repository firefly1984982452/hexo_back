---
title: JavaScript之String对象
date: 2020-06-05 13:40:32
categories:
  - program
---

# 查询过滤

1. `charAt`
2. `charCodeAt`
3. `fromCharCode`
4. `indexOf`
5. `lastIndexOf`
6. `includes`
7. `search`

## 【1】charAt()

返回指定位置的字符

`'ewfwef'.charAt(5)` // f
`'ewfwef'[5]` // f

区别：

`'ewfwef'.charAt(53)` // ""
`'ewfwef'[59]` // undefined

## 【2】charCodeAt()

返回 uniccode/accsic 编码

```
'a'.charCodeAt(0); // 97
```

## 【3】fromCharCode()

将 Unicode 编码转为一个字符:

```
String.fromCharCode(65); // A
```

## 【4】indexOf()

返回字符首次出现的位置

`'abcc'.indexOf('c')` // 2

## 【5】lastIndexOf()

上同，倒数。

## 【6】includes()

判断字符串中是否包含某字符串

`'abcc'.includes('c')` // true

## 【7】search()

返回下标

```
'hello world'.search('wor'); // 6
```

---

# 截取和分割

1. `split`
2. `substr`
3. `substring`
4. `slice`

## 【1】split()

分割为数组

`'abcd'.split('')` // ["a", "b", "c", "d"]

**tips：把字符串变为数组最快的方法**

`'abc'.split(' ')` // ['abc']

## 【2】substr()

截取（位置，个数）

`'abcdefg'.substr(2,3)` // "cde"

## 【3】substring()

截取（开始位置，结束位置）

`'abcdefg'.substring(2,3)` // "c"
`'abcdefg'.substring(2)` // "cdefg"
`'abcdefg'.substring(2,-9)` // "ab" **与 slice 的区别**

## 【4】slice()

截取（开始位置，结束位置）

`'abcdefg'.slice(2,3)` // "c"
`'abcdefg'.slice(2)` // "cdefg"
`'abcdefg'.slice(2,-9)` // "" **与 substring 的区别**

---

# concat()

合并两个字符串

`'w'.concat('e')` // 'we'

---

# match

## 检索字符串

```
'hello world'.match('world'); // ["world", index: 6, input: "hello world", groups: undefined]
```

## 匹配正则

```
"1 plus 2 equal 3".match(/\d/g); // ["1", "2", "3"]
```

---

# matchAll

效果上同，返回所有符合条件的值的 Iterator 遍历器。

---

# raw：模板字符串

```
String.raw`${2+3}`; // 5

var s = String.raw`hello\n`;
s === "hello\\n"; // true
```

---

# repeat

重复并返回

`'e'.repeat(30)` // "eeeeeeeeeeeeeeeeeeeeeeeeeeeeee"

## replace 和 replaceAll：替换

```
'12333345'.replace('3','0'); // "12033345"
'12333345'.replaceAll('3','0'); // "12000045"
```

正则

```
const arr = [1, [1,2], [1,2,3]];
JSON.stringify(arr).replace(/(\[|\])/g,''); // "1,1,2,1,2,3"
```

---

# 大小写更换

## toLowerCase()

把字符串变为小写

`'B'.toLowerCase()` // "b"

## toUpperCase()

把字符串变为大写

`'a'.toUpperCase()` // "A"

---

# trim()

去掉两边的空字符串

`' we '.trim()` // "we"

---

# 其它技巧

## 金钱格式化 toLocalString

```
var num = 1234567890;
num.toLocalString();    //'1,234,567,890'
num.toLocaleString('en-US'); // 效果相同
```

## 单行写一个评级组件

`"★★★★★☆☆☆☆☆".slice(5 - rate, 10 - rate)`;定义一个变量 rate 是 1 到 5 的值
