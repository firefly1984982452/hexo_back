---
title: JavaScript之RegExp正则表达式
date: 2020-12-23 14:44:34
categories: 
- program
---

[学习链接-廖雪峰](https://www.liaoxuefeng.com/wiki/1022910821149312/1023021582119488)

[学习链接-菜鸟教程](https://www.runoob.com/regexp/regexp-syntax.html)

# 新建

```
var re1 = /ABC\-001/;
var re2 = new RegExp('ABC\\-001');

re1; // /ABC\-001/
re2; // /ABC\-001/
```

re2转义，2个`\\`会变成1个`\`。

`new RegExp('a','g')`等同于`/a/g`

# 使用

## test

`/\d/.test(3)`; // true

## exec

**使用**

`/\d/.exec('3e')`; // ["3", index: 0, input: "3e", groups: undefined]

**非全局模式**

```
var str = "1a1b1c";
var reg = /1./;
reg.exec(str)[0]; // "1a"
reg.exec(str)[0]; // "1a"
```

**全局模式**

```
var str = "1a1b1c";
var reg = /1./g;
reg.exec(str)[0]; // "1a"
reg.exec(str)[0]; // "1b"
```

依次返回所有符合条件的值。


## match

**使用**

`'3e'.match(/\d/)`; // ["3", index: 0, input: "3e", groups: undefined]

**非全局模式**

```
var str = "1a1b1c";
var reg = /1./;
str.match(reg); // ['1a']
str.match(reg); // ['1a']
```

**全局模式**

```
'1a1b1c'.match(/1./g); // ["1a", "1b", "1c"]
```

一次返回所有符合条件的值。


# 更多用法

## 切分字符串

```
不用时：

'a b  c'.split(' '); // ["a", "b", "", "c"]

用正则：

'a b  c'.split(/\s+/); // ["a", "b", "c"]
```

## 分组

```
var re = /^(\d{3})-(\d{3,8})$/;
re.exec('010-12345'); // ['010-12345', '010', '12345']
re.exec('010 12345'); // null
```

## 替换

```
'8'.replace(/\d/, '*')
```

# 语法

## 普通字符

|字符|描述|例子|
|:--:|:--:|:--:|
|`[ABC]`中括号|匹配`[...]`中的所有字符|`'google'.match(/[aeiou]/g); // ["o", "o", "e"]`<br>相当于：`'google'.match(/a|e|i|o|u/g)`|
|`[^ABC]`|匹配**除了**`[...]`中的所有字符|`'google'.match(/[^aeiou]/g); // ["g", "g", "l"]`|
|`[A-Z]`|所有大写字母|`'ABC is first'.match(/[A-Z]+/g); // ["ABC"]`|
|`[a-z]`|所有小写字母|`'abc is first'.match(/[a-z]+/g); // ["abc", "is", "first"]`|
|`[0-9]`|所有数字|`'010-12345'.match(/[0-9]+/g); // ["010", "12345"]`|
|`.`|匹配除换行符（`\n\r`）以外的任何单个字符|`'hi'.match(/./g); // ["h", "i"]`|

## 非打印字符

|字符|描述|例子|
|:--:|:--:|:--:|
|`\s`|所有空白字符|`'hi you'.match(/\s/g); // [" "]`|
|`\S`|所有非空白字符|`'hi you'.match(/\S/g); // ["h", "i", "y", "o", "u"]`|
|`\w`|匹配字母、数字、下划线，等价于`[a-zA-Z0-9_]`|`'b_ 2'.match(/\w/g); // ["b", "_", "2"]`|
|`\f`|匹配换页符||
|`\n`|匹配换行符||
|`\r`|匹配回车符||
|`\t`|匹配制表符||
|`\v`|匹配垂直制表符||