---
title: JavaScript之RegExp正则表达式
date: 2020-12-23 14:44:34
categories: 
- program
---

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


# 更多用法

- replace：`'8'.replace(/\d/, '*')`