---
title: 《CSS秘籍》笔记
date: 2020-10-15 13:50:17
categories: 
- program
---

# 优先级及优化

## 优先级

```
!important
内联
Id
Class
标签
越清楚优先级越高
```

## 优化

尽量不要使用`!important`，下次会使用更多的`!important`去覆盖它。

---

# 继承

文字相关：font-family、color、font-size、font-style等。
列表相关：list-style、list-style-type、list-style-position等。
表格相关：border-spacing。

**比如border不能继承是因为不通用，有的得加上，有的加上得删掉。**

---

# CSS特殊值：initial、inherit、unset

## 初始值：initial

```
html,body{
  color: red;
}
p{
  color: green;
}
.main p{
  color: initial;
}
```

设置了`color:initial`值的`<p>`的颜色既不是`red`也不是`green`，而是`黑色`。

## 继承：inherit

```
html,body{
  color: red;
}
p{
  color: green;
}
.main p{
  color: inherit;
}
```

设置了`color:inherit`值的`<p>`的颜色继承了`html,body`是`red`。

## 复原：unset

```
html,body{
  color: red;
}
p{
  color: green;
}
.main p{
  color: unset;
}
```

设置了`color:unset`值的`<p>`的颜色忽略了原来的`green`，读取了`html,body`的值`red`。

---

# 简写属性

**4个值：上右下左(时钟)；2个值：右/左和上下（x轴和y轴）；**

## 4个值

如：`margin`、`padding`、`border-width`。

当`margin`和`padding`简写为`2`个值时，代表的是`上/下`和`左/右`。

## 2个值

如：`text-shodow`、`background-position`.

---

# em和rem

## em

`em`是相当于`html,body`里面的`font-size`的`倍数`

如：
```
html,body{
	font-size: 20px;
}
p{
	font-size: 2em;
}
```

此时`<p>`标签的`font-size`就是`40px`；
但是如果`<p>`标签里面还包含了一个`<p>`标签，如：`<p><p>no!</p>I'm not going.</p>`，此时最里面的`<p>`标签的`font-size`就是`60px`;

## rem

`rem`是计算出不同尺寸的相对值

例如不同的移动端设备的长高大小是不一样的值。

[更多](https://firefly1984982452.github.io/2018/03/09/%E6%A0%B9%E6%8D%AE%E8%AE%BE%E8%AE%A1%E5%9B%BE%E9%80%82%E9%85%8Drem/)

---

## 应用

```
.main{
  font-size: 2rem;
}
.main p{
  font-size: .5em;
}
```

p标签的大小都是父元素的一半。

# 