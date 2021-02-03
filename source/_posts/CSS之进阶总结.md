---
title: CSS之进阶总结
date: 2020-12-07 14:19:32
categories:
  - program
---

# html `<head>`相关

## 【1】禁止缓存

```
<meta http-equiv="Cache-Control" content="no-cache, no-store, must-revalidate" />
<meta http-equiv="Pragma" content="no-cache" />
<meta http-equiv="Expires" content="0" />
```

## 【2】添加标签栏 logo

```
<link rel="shortcut icon" type="image/x-icon" href="./static/logo.ico" rel="shortcut icon" />
```

**tips:`vue-cli` 项目中，要把`.ico` 文件放在 `static` 文件中，并重新编译运行**

## 【3】自适应手机

```
<meta name="viewport" content="initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
```

---

# CSS 键盘鼠标相关

## 【1】CSS 禁止鼠标点击

```
pointer-events:none;
```

## 【2】禁用鼠标左键

```
$(document).ready(function(){
  $(document).bind('contextmenu', function(e){
    return false;
  })
})
```

## 【3】`pointer-events`实现鼠标穿透效果

简单例子：

```
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title></title>
    <style>
      .top {
          width: 100px;
          height: 90px;
          position: absolute;
          top: 0;
          left: 65px;
          background: yellow;
          opacity: 0.5;
          pointer-events: none;
      }
    </style>
  </head>
  <body>
    <!-- 下方的链接 -->
    <ul>
      <li><a href="http://www.hangge.com">航歌</a></li>
        <li><a href="http://www.hangge.com">hangge.com</a></li>
    </ul>
    <!-- 上方黄色div -->
    <div class="top"></div>
  </body>
</html>
```

效果：

![image](https://www.hangge.com/blog_uploads/201711/2017112015003436986.png)

与地图交互的复杂效果：

```
<template>
	<div class="page">
        <map1 class="map" />
        <home class="home-content" />
	</div>
</template>

<style lang="less" scoped>
.page {
	width: 100%;
	height: 100%;
	position: relative;
	.map{
		width:100%;
		height:100%;
		position: absolute;
		top: 0;
		bottom: 0;
		left: 0;
	}
	.home-content{
		position: absolute;
		top: 0;
		bottom: 0;
		left: 0;
        pointer-events: none;
        .left,.right{
            pointer-events:all
        }
	}
}
</style>

```

重点：`map`放在底层，`home`的`总DOM`设置为`none`，然后哪些地方需要点击就设置为`all`。

```
.home{
    pointer-events: none;
    .left,.right{
        pointer-events:all
    }
}
```

![image](https://wx2.sinaimg.cn/large/0069qZtTgy1gij2iyzdf5j31hb0twu0x.jpg)

---

# CSS 单位

## 【1】em

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

## 【2】rem

```
(function() {
	//首先取得当得屏幕宽度
	var width = window.screen.width;
	var scaleSize = 100,
		designSize = 375;
		//用当得宽度除以（设计尺寸除以缩放尺寸）
	var size = width / (designSize / scaleSize);
	//设置font-size
	document.getElementsByTagName('html')[0].style.fontSize = (size) + 'px';
})();
```

## 【3】视口的相对单位

```
vm：1/100的视口宽度；
vh：1/100的视口高度；
vmax：1/100的视口中较大的一方的长度；
vmin：1/100的视口中较小的一方的长度；
```

---

# CSS 自定义属性（CSS 变量）

要点：

- `--`命名
- `val()`使用

使用：

```
:root{
  --main-color: #fbb;
}
p{
  color: var(--main-color);
}
```

---

# `:root`选择器

```
:root{
  color: red;
}
html{
  color: green;
}
```

最后出来的颜色是`red`，`:root`选择器代表是根元素，代表`html`，但优先级比`html`高。

---

# width 和 height 相关知识点

## 【1】table

Table 表格中，定了 width，如果其它的内容很高，内容少的可能会撑成一列高。

![image](https://wx2.sinaimg.cn/mw690/0069qZtTgy1gj589b1p14j30aa08z75k.jpg)

## 【2】不适合用 width:100%的情况

![image](https://wx3.sinaimg.cn/mw690/0069qZtTgy1gj589e73jxj308i0bl3yn.jpg)

子元素`width:100%`会获取父元素长度，如果设置了`width:100%`反而适得其反。

## 【3】按钮内文字会自动换行

## 【4】box-sizing

- `content-box`：默认值
- `border-box`：将`border`变成里面消化的值

## 【5】内联元素

- `display: inline-block;`会控制当前元素以自己的内容为长度，不受父元素影响。

- 内联元素如果`display`改为了`block`，不用再设置`width:100%`。

## 【6】让元素 heigth 支持 100%的方法

方法一：

`html,body{heigth:100%}`

方法二：

使用绝对定位

```
height: 100%;
position: absolute;
```

## 【7】max-width/min-width 和 max-height/min-height

**超越!important**

```
<img src="./floor.jpeg" style="width: 300px!important;" />
img{min-width: 400px;}
```

最终生效的是`400px`。

**min-width 覆盖 max-width**

如果`min-width`和`max-width`冲突时，取`min-width`的值。

```
min-width: 400px;
max-width: 350px;
```

## 【8】width 自适应关键字

- `fill-available`：撑满空间，100%
- `fit-content`：内容最大宽度。文字超过会换行。
- `max-content`：内容最大宽度。如果文字超过显示区域了也不会换行，所以会有 200%的可能。
- `min-content`：内容最小宽度。比如图片是 200px，文字是 300px，就取 200px。

## 【9】line-height 深入理解

行高的几种值：`px`、`normal`、`%`、`number`、`inherit`

默认：

```
line-height: 20px;
line-height: normal;
line-height: 150%;
line-height: 1.5; // 资料上都是1，但chrome和firfox上应该都是1.5
```

---

# 文字相关

## 【1】文字渐变

```
background: linear-gradient(to bottom, #8AF0FF,#3780E6);;
-webkit-background-clip: text;
color: transparent;
```

## 【2】抗锯齿渲染`-webkit-font-smoothing`

`-webkit-font-smoothing`有 3 个属性值：

- `none`: 对像素低的文本好，会有严重的锯齿；
- `subpixel-antialiased`: 默认值，有轻微锯齿；
- `antialiased`: 抗锯齿很好。

抗锯齿：`body{-webkit-font-smoothing: antialiased;}`

`Gecko`内核的抗锯齿效果：

`-moz-osx-font-smoothing: inherit | grayscale;`这个属性也是更清晰的作用。

## 【3】文字描边：-webkit-text-stroke

```
-webkit-text-stroke: 1px #fff;
```

## 【4】文字阴影：text-shadow

## 【5】文字颜色：-webkit-text-fill-color

```
a{
  -webkit-text-fill-color: red;
  color: green;
}
```

它们俩同样都是设置文字颜色，但就算`color`在下面，也是`-webkit-text-fill-color`的权重更高，优先级更高。

## 【6】font-size:10px

字体如果需求是小于`12px`的话，可以先设置字体为`20px`，再使用`transfrom:scale(0.5)`进行缩放。（也可以使用图片，但不推荐）

## 【7】文字效果

```
text-decoration:none 无装饰，通常对html下划线标签去掉下划线样式
text-decoration:underline 下划线样式
text-decoration:line-through 删除线样式-贯穿线样式
text-decoration:overline 上划线样式
```

## 【8】文字换行

```
word-wrap:break-word;
```

## 【9】段落开头空 2 格

```
text-indent: 2em;
```

---

# position 定位

- `relative`：略
- `absolute`：略
- `fixed`：略
- `sticky`

## sticky：粘性布局

重点：

```
position: sticky;
top: 0;
```

`sticky`必须指定 `top`, `right`, `bottom` 或 `left` 四个阈值其中之一，才可使粘性定位生效。否则其行为与相对定位相同。

---

# display 显示

- `inline`
- `block`
- `inline-table`
- `table-cell`

## 【1】inline

- 不会独占一行
- `width`和`height`无效
- `margin`和`padding`中的`left/right`有效，`top/bottom`无效

## 【2】block

- 独占一行
- `width`和`height`正常
- `marin`和`padding`正常

## 【3】inline-table

行内表格

## 【4】table-cell

所有内容在一行

---

# CSS 特殊值：initial、inherit、unset

## 【1】初始值：initial

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

## 【2】继承：inherit

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

## 【3】复原：unset

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

# 打印相关

## 【1】打印方法

`window.print();`

## 【2】局部打印

### 【2.1】media 属性

```
@media screen {
  /* 只对屏幕浏览有效 */
}

@media print {
  /* 只对打印有效 */
  	.noprint {
      display: none
    }
}
```

### 【2.2】媒体查询

```
<style type="text/css">
	@media print {
		.no{
			display: none;
		}
	}
</style>
```

## 【3】页眉页脚

```
@media print {
  header {
    display: table-header-group;
  }

  footer {
    display: table-footer-group;

  }
}
```

## 【4】打印方向

```
<style type="text/css" media="print">
@page {
  size: landscape !important;
}
</style>
```

横向打印：`size: landscape`
竖向打印：`size: portrait`
自动【默认】：`size: auto`

## 【5】分页

分页符属性用来设置页面的分页（即另起一页），共有三个相关属性。

`page-break-before`：元素之前分页
`page-break-after`：元素之后分页
`page-break-inside`：元素内部分页
这三个属性的值都是两个：`always`（生效）和`avoid`（避免）。

```
h1 {
  /* 总是在 h1 元素之前分页 */
  page-break-before: always;
}

section.city-map {
  /* 在元素之前和之后分页，即该元素单独占据一页 */
  page-break-before: always;
  page-break-after: always;
}

table {
  /* 表格尽可能不要分页 */
  page-break-inside: avoid;
}
```

## 【6】重复表格的表头

用`<thead>`元素定义表头，`<tbody>`元素定义表的数据

```
<table>
  <thead>
    <tr>
      <th>City</th>
      <th>Population</th>
  </thead>
  <tbody>
    <tr>
      <td>Sydney</td>
      <td>4.627 million (2018)</td>
    </tr>
  </tbody>
</table>
```

---

# 简写属性

**4 个值：上右下左(时钟)；2 个值：右/左和上下（x 轴和 y 轴）；**

## 4 个值

如：`margin`、`padding`、`border-width`。

当`margin`和`padding`简写为`2`个值时，代表的是`上/下`和`左/右`。

## 2 个值

如：`text-shodow`、`background-position`.

---

# `:focus`与`:focus-within`

如果只使用`:focus`，它不能包含子元素的聚焦事件（比如输入框、按钮聚焦）。

以下内容无效：

```
.container:focus input {
  width: 230px;
}
```

用:focus-within 解决：

```
.container:focus-within input {
  width: 230px;
}
```

当父元素聚焦时，`input`内容也会随之改变。

## 例子：不同的登录状态

![image](https://user-images.githubusercontent.com/8554143/43560900-2ef72358-9647-11e8-8123-ecfc45828c3d.gif)

```
img{
  display: none;
  position: fixed;
  top: 0;
  left: 0;
}
.g-container{
  margin: 200px 0 0 0;
}
.g-username:focus-within img{
  display: block;
}
.g-password:focus-within img{
  display: block;
}

...

<div class="g-container">
    <h2>登录</h2>
    <div class="g-username">
        <input name="loginPhoneOrEmail" maxlength="64" placeholder="请输入手机号或邮箱" class="input">
        <img src="https://b-gold-cdn.xitu.io/v3/static/img/greeting.1415c1c.png" class="g-username">
    </div>

    <div class="g-password">
        <input name="loginPassword" type="password" maxlength="64" placeholder="请输入密码" class="input">
        <img src="https://b-gold-cdn.xitu.io/v3/static/img/blindfold.58ce423.png" class="g-password">
    </div>
</div>
```

---

# HTML 默认字体大小 14px

```
font-size: 14px;
```

---

# CSS 插件之 gsap 数字动画

```
npm install gsap@2.0.2

最新版本我尝试的时候不行，也许不同环境下可以
```

```
<input v-model="number" type="text" step="20">
<p>{{ animatedNumber }}</p>
...
import { TweenLite } from 'gsap/TweenMax'
export default {
  data() {
    return {
      number: 0,
      tweenedNumber: 0
    }
  },

  computed: {
    animatedNumber: function() {
      return this.tweenedNumber.toFixed(0);
    }
  },
  watch: {
    number: function(newValue) {
      TweenLite.to(this.$data, 2, { tweenedNumber: newValue })
    }
  },
}
```

---
