---
title: JavaScript编码规范
date: 2020-11-03 13:50:17
categories: 
- program
---

# 不要在块内函数声明

不推荐：

```
if (x) {
    function foo() {}
}
```

推荐：

```
if (x) {
    var foo = function() {}
}
```

# 不要封装基本类型

会导致异常，如：

```
var x = new Boolean(false);
false === false; // false
```

# for-in循环

## 只用于object/map/hast的遍历

```
var obj = {
    name: '小明'
}
for(var i in obj) {
    console.log(obj.hasOwnProperty(i))
}
```

## 遍历对象时用hasOwnPropery

```
for(var i in obj) {
    console.log(obj.hasOwnProperty(i))
}
```

# 检查null和0

如果你想检查字符串是否为 null 或空:

`if (y != null && y != '') {`

但这样会更好:

`if (y) {`

# 使用三元操作符

三元操作符用于替代下面的代码:

```
if (val != 0) {
  return foo();
} else {
  return bar();
}
```

你可以写成:

```
return val ? foo() : bar();
```