---
title: js基础——温故而知新
date: 2018-10-22 14:25:07
tags:
categories: 编程开发
---

不知道是第多少遍重温了，反正每次看都会有新的发现，挺好的。我相信**开卷有益**。

# 数据类型

以前判断`if(res.data.status)`，可以视情况写为`if(typeof res === 'undefined')`。

## 字符串和数组

字符串无法直接改变长度

字符串
```
var str = '123456';
str.length; //6
str.length = 3;
str;//'123456'
```

数组
```
var arr = [1,2,3,4,5,6];
arr.length;//6
arr.length = 3;
arr;//[1,2,3]
```

## base64转码

```
var string = 'Hello World!';
btoa(string) // "SGVsbG8gV29ybGQh"
atob('SGVsbG8gV29ybGQh') // "Hello World!"
```

中文

```
function b64Encode(str) {
  return btoa(encodeURIComponent(str));
}

function b64Decode(str) {
  return decodeURIComponent(atob(str));
}

b64Encode('你好') // "JUU0JUJEJUEwJUU1JUE1JUJE"
b64Decode('JUU0JUJEJUEwJUU1JUE1JUJE') // "你好"

```

## boolean转换

```
str = str == 1?true:false;

```

变为：

```
str = Boolean(str);
```

# toString 和 parseInt的其它用法

可以转换进制

比如，`toString()`里面传数值的话，就会转换成对应的进制

```
var number = 3344
number.toString();      //'3344'
number.toString(16);    //'d10'
```

同样，用`parseInt`可以将其它进制的转换成10进制的正常数值

```
parseInt('d10',16)
```

# toLocalString

```
var num = 1234567890;
num.toLocalString();    //'1,234,567,890'
```