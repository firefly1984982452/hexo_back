---
title: CSS拾遗
date: 2020-09-03 13:50:17
categories: 
- program
---

# HTML默认字体大小14px

```
font-size: 14px;
```

# flex中的space-evenly

**均匀分布**

```
justify-content: space-between; // 两端
justify-content: space-around; // 两端间隙相等，项目中间的间隙比较大
justify-content: space-evenly; // 两端与项目中间的间隙一样大
```

区别：

![image](https://wx2.sinaimg.cn/mw690/0069qZtTgy1gidesq1po8j30970c4mxc.jpg)

**IOS之类的兼容性用before和after**

```
container{
      display: flex;
      flex-flow: row nowrap;
      align-items: center;
      justify-content: space-between;
       //justify-content: space-evenly;
      &:before,
      &:after {
          content: '';
          display: block;
    }
}
```

# 更改自带的scorll滚动条样式

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

# `pointer-events`实现鼠标穿透效果

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

# line-height深入理解

行高的几种值：`px`、`normal`、`%`、`number`、`inherit`

默认：

```
line-height: 20px;
line-height: normal;
line-height: 150%;
line-height: 1.5; // 资料上都是1，但chrome和firfox上应该都是1.5
```

# background-origin

背景区域的位置，有如下属性：

- `content-box`：padding值会起效，以padding开始的单位开始显示背景；

- `padding-box`：padding不会影响背影，直接从border里面开如显示背影；

- `border-box`：border不会影响背景，直接把border的内容也算在背影里面，背景会减去border的长度。

# background-image

背景图，有如下属性：

- `url()`：图片地址

- `line-gradient`：创建线性渐变的图片

- `redial-gradient`：创建径向渐变的图片

- `repeating-line-gradient`：创建重复线性渐变的图片

- `repeating-redial-gradient`：创建重复径向渐变的图片

与`background-size`组合的话，可以生成条纹背景。

## line-gradient

背景2色平铺

![image](https://wx3.sinaimg.cn/mw690/0069qZtTgy1gj0f2jukxkj308v05pt8r.jpg)

```
background: linear-gradient(#ff0 50%, #f00 50%);
background-size: 100% 50%;
```

## repeating-line-gradient

背景2色任意角度平铺

![image](https://wx1.sinaimg.cn/mw690/0069qZtTgy1gj0f30zb6bj308t05nn04.jpg)

```
background-image: repeating-linear-gradient(60deg,yellow 0%,yellow 5%,green 0%,green 10%); 
```
# box-shadow

例：

`box-shadow: 50px 50px 0 20px #ffb;`

图：

![image](https://wx3.sinaimg.cn/mw690/0069qZtTgy1gj0nvzcynqj308y069dfn.jpg)

解析：

参数1：X轴，图中为30，因为50-20=30；
参数2：Y轴，图中为30，因为50-20=30；
参数3：模糊距离
参数4：阴影大小，默认可省略不写时为0。
参数4：颜色。

# 清除浮动

父元素：

```
.content-box::after{
  clear: both;
  content: '';
  display: block;
}
```

# display

## inline

- 不会独占一行
- width和height无效
- margin和padding中的left/right有效，top/bottom无效

## block

- 独占一行
- width和height正常
- marin和padding正常

## inline-table

行内表格

### table-cell

所有内容在一行

# width和height

## table

Table表格中，定了width，如果其它的内容很高，内容少的可能会撑成一列高。

![image](https://wx2.sinaimg.cn/mw690/0069qZtTgy1gj589b1p14j30aa08z75k.jpg)

## 不适合用width:100%的情况

![image](https://wx3.sinaimg.cn/mw690/0069qZtTgy1gj589e73jxj308i0bl3yn.jpg)

子元素`width:100%`会获取父元素长度，如果设置了`width:100%`反而适得其反。

## 按钮内文字会自动换行

## box-sizing

- content-box：默认值
- border-box：将border变成里面消化的值

## 内联元素

- `display: inline-block;`会控制当前元素以自己的内容为长度，不受父元素影响。

- 内联元素如果`display`改为了`block`，不用再设置`width:100%`。


## 让元素heigth支持100%的方法

方法一：

`html,body{heigth:100%}`


方法二：

使用绝对定位

```
height: 100%;
position: absolute;
```

## max-width/min-width和max-height/min-height

**超越!important**

```
<img src="./floor.jpeg" style="width: 300px!important;" />
img{min-width: 400px;}
```

最终生效的是`400px`。

**min-width覆盖max-width**

如果`min-width`和`max-width`冲突时，取`min-width`的值。

```
min-width: 400px;
max-width: 350px;
```
