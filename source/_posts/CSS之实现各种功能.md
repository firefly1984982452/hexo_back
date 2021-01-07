---
title: CSS之实现各种功能
date: 2021-01-07 17:19:32
categories:
  - program
---


# 【1】改变控制台面样式

```
console.log("%c来自:console","color:red;font-size:50px");
```

![Image.png](https://wx4.sinaimg.cn/mw690/0069qZtTgy1gho4c77d8dj30bj02odfq.jpg)

---

# 【2】限定 N 行

```
display: -webkit-box;
overflow: hidden;
white-space: normal!important;
text-overflow: ellipsis;
word-wrap: break-word;
-webkit-line-clamp: 1;
-webkit-box-orient: vertical;

单行
.table tbody > tr > td.name{
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
 }
```

---

# 【3】新版本上线（指导蒙版）

```
position: absolute;
box-shadow: rgba(0, 0, 0, 0.75) 10px 1px 1px 99px;
z-index: 100;
width: 367px;
height: 143px;
left: 40px;
top: 12px;
```

![Image.png](https://wx2.sinaimg.cn/mw690/0069qZtTgy1gho4b225hlj30k60ffn1c.jpg)

---

# 【4】CSS 做三角形

```
width: 0;
height: 0;
border-color: #f60 transparent transparent transparent;
border-style: solid;
border-width: 10px;
```

---

# 【5】检查边距

```
*{
  background: #000 !important;
  color: #0f0 !important;
  outline: solid #f00 1px !important;
}
```

![a7b789a9gy1fow4hu8khhj206203qwea.jpg](https://wx1.sinaimg.cn/mw690/0069qZtTgy1gho4csuijuj306203qdfx.jpg)

---

# 【6】图片与文字顶部对齐

虽然`flex`可以实现，但有时候如果不想用到`flex`，可以尝试`img`自带的`vertical-align`属性。

```
img{
  vertical-align:text-top; // 图片与文字顶部对齐
}
```

---

# 【7】左边定宽，右边自适应

- 使用`flex`
- 右边的`width: calc(100% - 100px)`
- 使用`float`

---

# 【8】单行居中显示文字，多行居左显示，最多两行超过用省略号结尾

前 2 项条件：

```
<h2><p>咽喉痛无发热</p></h2>
<h2><p>上呼吸道感染，咽喉痛无发热</p></h2>
<h2><p>老人主诉头晕多日，饭后胸闷，结合体检情况，考虑为交感神经。</p></h2>

...

h2{
  text-align: center;
}
p{
  text-align: left;
  display: inline-block;
}
```

第 3 项条件关键代码

```
display: -webkit-box; // 设置display，将对象作为弹性伸缩盒子模型显示
-webkit-line-clamp: 2; // 限制在一个块元素显示的文本的行数
-webkit-box-orient: vertical; // 规定框的子元素应该被水平或垂直排列
```

配合 `overflow : hidden` 和 `text-overflow: ellipsis` 即可实现 `webkit` 内核下的多行省略

```
p {
    display: inline-block;
    text-align: left;
    overflow : hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
}

h2{
    text-align: center;
}
```

但是单行也会居左，而不是居中，所以要同样再嵌套一层。

```
<h2><p><em>单行居中，多行居左<em></p></h2>
```

---

# 【9】满屏背景和固定宽度

```
main{
  width: 1000px; // 可不写
  margin:0 calc(50% - 500px;)
}
```

---

# 【10】紧贴底部的页脚

## 方法 1：中间内容用 calc

```
header{
  height: 100px;
  background-color: #bbf;
}
.main{
  background-color: #fbb;
  min-height: calc(100% - 200px);
}
footer{
  height: 100px;
  background-color: #bfb;
}
```

## 方法 2：用 flex

```
body{
  display: flex;
  flex-direction: column;
}
```

---

# 【11】table 表格控制列宽

`table-layout: fixed;`

通常都是根据内容多少自动计算宽度的。

---

# 【12】清除浮动

- 1、使用空元素`clear:both`
- 2、`overflow:hidden`
- 3、使用邻近元素`clear:both`
- 4、使用伪类`:before`元素`clear:both`

父元素：

```
.content-box::after{
  clear: both;
  content: '';
  display: block;
}
```

---

# 【13】BFC

`BFC`是特性（功能），不是定义。

比如`float`，`position`、`absolute`

---

# 【14】reset.css

作者推荐了`normalize.css`替代传统的`reset.css`。
[链接](https://github.com/chokcoco/iCSS/issues/5)

---

# 【15】居中的多种方法

## 【1】预览

[案例预览](https://firefly1984982452.github.io/css-center/)
[案例下载地址](https://github.com/firefly1984982452/css-center)

## 【2】布局

### 【2.1】首先，让我们的背景宽和高都是 100%

```
html,body{
	height: 100%;
}
.box {
	height: 100%;
}

```

### 【2.2】html 页面

```
<div class="box">
	<div class="item">
		item
	</div>
</div>
```

### 【2.3】基础的 CSS

```
* {
	margin: 0;
	padding: 0;
	box-sizing: border-box;
}
html,body{
	height: 100%;
}
.box {
	width: 100%;
	height: 100%;
	background-color: #f7b2bb;
}

.item {
	width: 50%;
	height: 100px;
	background-color: #1296db;
	text-align: center;
	line-height: 100px;
	color: #fff;
}
```

**tips:因为我的布局很简单，页面也不多，所以我用了`*`号选择器**

## 【3】absolute 方法实现

### 【3.1】固定宽高

```
.box{
	position: relative;
}
.item{
	position: absolute;
	width: 200px;
	height: 100px;
	left: 50%;
	top: 50%;
	margin-left: -100px;
	margin-top: -50px;
}
```

### 【3.2】百分比宽高

```
.box{
	position: relative;
}
.item{
	width: 50%;
	height: 20%;
	position: absolute;
	left: 50%;
	top: 50%;
	transform: translate(-50%,-50%);
}
```

**重点：`transform: translate(-50%,-50%);`**

## 【3】块级元素实现水平居中

```
.box{
	position: relative;
}
.item{
	width: 50%;
	margin: 0 auto;
}
```

## 【4】flex 方法实现

```
.box{
	display: flex;
	justify-content: center;
	align-items: center;
}
.item{

}
```

## 【5】文本居中

- 文字水平居中：`text-align:center;`

- 文字垂直居中：`line-height:height`

---

# 【16】最后一个 li 不显示 border（类推）

## 【1】方法一：`first-child`

```
li{border-top:1px solid #000;}
li:first-child{border-top:none;}
```

## 【2】方法二：`*+*`

```
li+li{
    border-top: 1px dashed #999;
}
```

## 【3】方法三：`:not(:last-child)`

```
li:not(:last-child)...
```

---


# 【16】更改自带的 scorll 滚动条样式

```
::-webkit-scrollbar{
    width: .07rem;
    height: .07rem;
}
/* //定义滑块 内阴影+圆角 */
::-webkit-scrollbar-thumb{
    border-radius: 1em;
    background-color: #D8D8D8;
}
/* //定义滚动条轨道 内阴影+圆角 */
::-webkit-scrollbar-track{
    border-radius: 1em;
    background-color: transparent;
}
```

---