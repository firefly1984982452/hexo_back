---
title: CSS之进阶总结
date: 2020-12-07 14:19:32
categories: 
- program
---


# CSS编码技巧

## 尽量减少代码重复

- `line-height`写倍数
- `font-size`写百分比

当某些值相互依赖时，应该把它们的相互关系用代码表达出来。

比如`line-height`写倍数、`font-size`写百分比更利于维护。

```
font-size:20px;
height:20px;
line-heigth:20px;
```

换成

```
font-size: 150%;
height:20px;
line-heigth:1.5;
```

## 代码易维护vs．代码量少

比如：我们不需要左边框

```
border-width: 1px 1px 1px 0;
border-color: #fff;
border-style: solid;
```

但下次要把`1px`改为`2px`的话要改3次，可以直接优化成：

```
border-width: 1px;
border-left-width: 0;
border-color: #fff;
border-style: solid;
```

## currentColor

```
p{
  color: red;
  border: solid 1px currentColor;
  // 或直接简化
  border: solid 1px;
}
```

p标签的边框会直接获取到color的颜色。

## 合理使用简写

```
background: red;
background-color: red;
```
这2者的差距在后者如果在添加`background-image`之类的属性就会导致不一样的效果。



---
























# 文档分析注释

## 目录

```
/*--*\
引入的CSS目录
\*--*/
/**
 * css/base.css--------------引入cssReset
 * font-family-config.css----引入配置字体的css
 * public.css----------------引入全局公用的css
 */
import './assets/css/base.css';
import './config/font-family-config.css';
import './assets/css/public.css';
```

## 具体CSS文件的注释

```
/*-------*\
  $主框架
\*-------*/
.page{}




/*-------*\
 $标题菜单
\*-------*/
.title{}




/*------------*\
 $滚动栏样式重置
\*------------*/

::-webkit-scrollbar{}
```

中间最后留5行以后，好在全览时看起来像个段落。

# 代码顺序

1. Reset；
2. DOM元素，如ul、li；
3. 对象和抽象内容；
4. 子元素
5. 修补异常

# 命名规范

下划线（ `__` ）代表子元素；
连字符（ `-` ）代表不同状态；

```
.ul{}
.ul_li{}
.ul_li-display{}
```

# BEM 命名

块（Block）、元素（Element）、修饰符（Modifier）
例：`class="button button--state-danger"`



---






























# CSS其它基础知识


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


# 简写属性

**4个值：上右下左(时钟)；2个值：右/左和上下（x轴和y轴）；**

## 4个值

如：`margin`、`padding`、`border-width`。

当`margin`和`padding`简写为`2`个值时，代表的是`上/下`和`左/右`。

## 2个值

如：`text-shodow`、`background-position`.


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


# 视口的相对单位

vm：1/100的视口宽度；
vh：1/100的视口高度；
vmax：1/100的视口中较大的一方的长度；
vmin：1/100的视口中较小的一方的长度；


# css变量

```
:root{
  --main-color: #fbb;
}
p{
  color: var(--main-color);
}
```


---



































# CSS3部分


# 背景与边框

## 半透明边框

`rgba`或`hsla`

```
color: hsla(1,0%,100%,.2);
border: solid 3px;
border-color: rgba(255,255,0,.2);
```

## 多重边框

### 用box-shadow

![image](https://wx3.sinaimg.cn/large/0069qZtTgy1gizk2ty7otj304304aa9x.jpg)

```
background: #fbfb;
box-shadow: 0 0 0 5px #f00, 0 0 0 10px #ff0, 0 0 0 15px #00f;
```

### 用outline

![image](https://wx4.sinaimg.cn/mw1024/0069qZtTgy1gizka5updnj3042044746.jpg)

```
background: #fbfb;
outline: 5px solid #ff0;
border: 5px solid #f00;
```

**outline和border的区别**：

- outline不占空间，border占空间
- 设置圆角（border-radius）之后，border边框会贴紧，outline不会
- outline-set可以设置边距

**区别的图片**
![image](https://wx1.sinaimg.cn/mw1024/0069qZtTgy1gizkad0s9lj304k04aweg.jpg)

**区别的代码**:

```
background: #fbfb;
outline: 5px solid #ff0;
border: 5px solid #f00;
border-radius: 50%;
outline-offset: 10px;
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



# background

让背景图在距离右边和底部都是20px，如图：

![image](https://wx4.sinaimg.cn/mw690/0069qZtTgy1gizlk17h0ej303b03i74d.jpg)

## background-position

方法一：
```
background: url(img_url) no-repeat;
background-position: bottom 20px right 20px;
```

方法二：
```
padding: 20px;
background: url(img_url) no-repeat;
background-position: bottom right;
background-origin: content-box;
```

`background-origin:content-box;`和`padding:20px`结合起来的效果和方法一一样。

## calc

```
background: url(img_url) no-repeat;
background-position: calc(100% - 20px, 100% - 20px);
```


# linear-gradient：条纹背景

## 背景为上下2色分割

![image](https://wx2.sinaimg.cn/mw690/0069qZtTgy1gj0f2emiabj308x05lq2r.jpg)

`backgorund-image: linear-gradient(#ff0 50%, #f00 50%)`

## 背景2色平铺

![image](https://wx3.sinaimg.cn/mw690/0069qZtTgy1gj0f2jukxkj308v05pt8r.jpg)

```
background: linear-gradient(#ff0 50%, #f00 50%);
background-size: 100% 50%;
```

## 背景2色任意角度平铺

![image](https://wx1.sinaimg.cn/mw690/0069qZtTgy1gj0f30zb6bj308t05nn04.jpg)

```
background-image: repeating-linear-gradient(60deg,yellow 0%,yellow 5%,green 0%,green 10%); 
```

# linear-gradient：切角效果

![image](https://wx3.sinaimg.cn/mw690/0069qZtTgy1gj0m36t5cij306q068web.jpg)

```
width: 200px;
height: 200px;
background:#ffb;
background: linear-gradient(135deg, transparent 15px,#fbb 0) top left,
      linear-gradient(-135deg, transparent 15px,#fbb 0) top right,
      linear-gradient(-45deg, transparent 15px, #fbb 0) bottom right,
      linear-gradient(45deg, transparent 15px, #fbb 0) bottom left;
background-size:50% 50%;
background-repeat:no-repeat;
```

# transform：平形四边形

`transform: skewX(-45deg);`

**skewX默认会把字体内容也旋转，解决方式是加伪元素**

```
.box{
  position: relative;
  width: 100px;
  height: 50px;
  text-align: center;
  line-height: 50px;
}
.box::before{
  content: '';
  position: absolute;
  bottom: 0;
  top: 0;
  right: 0;
  left: 0;
  z-index: -1;
  background-color: #ffb;
  transform: skewX(-45deg);
}
```

# rotate菱形图片

## 正方形

```
.lin{
  width: 200px;
  height: 200px;
  overflow: hidden;
  transform: rotate(45deg);
}
.lin > img{
  width: 100%;
  height: 100%;
  transform: rotate(-45deg)scale(1.5);
}
```

**如果不用`scale(1.5)`的话就是八角形**。

## 长方形

```
.lin-long > img{
  clip-path: polygon(50% 0, 100% 50%, 50% 100%, 0 50%);
  transition: ls clip-path;
}
.lin-long > img:hover{
  clip-path: polygon(0 0 , 100% 0, 100% 100%, 0 100%);
}
```


# transform

```
/* 转换中心 */
transform-origin: top;
/* 旋转 */
transform: rotate(45deg); 
/* 平移 */
transform: translate(20px, 10px);
/* 缩放 */
transform: scale(.5);
/* 倾斜 */
transform: skew(45deg);
```

也可以所有属性合并：

```
transform: rotate(45deg) translate(20px, 10px) scale(.5) skew(45deg);
```

# `transform: perspective`：梯形效果

![image](https://wx2.sinaimg.cn/mw690/0069qZtTgy1gj0mzj9rt8j307o041t8i.jpg)

`transform: perspective(30px)rotateX(5deg);`

同样会导致内容变成梯形，所以用伪元素生成

```
.border{
  width: 200px;
  height: 100px;
  position: relative;
}
.border::before{
  content: '';
  position: absolute;
  bottom: 0;
  top: 0;
  left: 0;
  right: 0;
  z-index: -1;
  background:#fbb;
  transform: perspective(30px)rotateX(5deg);
}
```


# 阴影

## 边框阴影：box-shadow

### 单侧阴影

![image](https://wx3.sinaimg.cn/mw690/0069qZtTgy1gj0ob24z97j306y03qmwy.jpg)

```
box-shadow: 15px 0 5px -10px #000;
```

### 多侧阴影

![image](https://wx2.sinaimg.cn/mw690/0069qZtTgy1gj0ob7xfq6j307d03sjr7.jpg)

```
box-shadow: 15px 0 5px -10px #000, -15px 0 5px -10px #000;
```

## 文字阴影：text-shadow

![image](https://wx4.sinaimg.cn/mw690/0069qZtTgy1gj0ojj9giyj305602i3yg.jpg)

```
text-shadow: 5px 5px 5px #f00;
```

参数：x轴、y轴、阴影、颜色。

## 多边形阴影：drop-shadow

**文字也会有阴影**

![image](https://wx4.sinaimg.cn/mw690/0069qZtTgy1gj0ol4gog9j305l03amx2.jpg)

```
width: 0;
height: 0;
border: 100px solid ;
border-color: transparent transparent red;
filter: drop-shadow(5px 5px 5px #000);
```

参数：x轴、y轴、阴影、颜色。

## 通过阴影弱化背景

```
box-shadow: 0 0 0 50vmax rgba(0,0,0,.8);
```

重点：用伪元素设置blur

```
.cover{
  width: 600px;
  height: 500px;
  position: relative;
}
.cover::before{
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 600px;
  height: 500px;
  filter: blur(5px);
  background: url('./floor.jpeg') center center no-repeat;
  z-index: -1;
}
.content{
  position: absolute;
  left: 30%;
  top: 50%;
  width: 300px;
  height: 100px;
  border: 1px solid #fbb;
}
<div class="cover">
  <div class="content">我是内容</div>
</div>
```




---












































# CSS基础
# 滚动提示

```
background-image: radial-gradient(at top, rgba(0,0,0,0.2), rgba(0,0,0,0));
background-repeat: no-repeat;
background-size: 100% 15px;
background-attachment: local, scroll;
```

# width自适应关键字

- `fill-available`：撑满空间，100%
- `fit-content`：内容最大宽度。文字超过会换行。
- `max-content`：内容最大宽度。如果文字超过显示区域了也不会换行，所以会有200%的可能。
- `min-content`：内容最小宽度。比如图片是200px，文字是300px，就取200px。

# table表格控制列宽

`table-layout: fixed;`

通常都是根据内容多少自动计算宽度的。

# 满屏背景和固定宽度

```
main{
  width: 1000px; // 可不写
  margin:0 calc(50% - 500px;)
}
```

# 紧贴底部的页脚

## 方法1：中间内容用calc

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

# 方法2：用flex

```
body{
  display: flex;
  flex-direction: column;
}
```

# 打字动画

用`width:0`到`width:100%`模拟出打字效果。

```
@keyframes typing {
  from {
    width: 0;
  }
}
p{
  width: 100%;
  overflow: hidden;
  white-space: nowrap;
  animation: typing 18s;
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

# 文字渐变

```
background: linear-gradient(to bottom, #8AF0FF,#3780E6);;
-webkit-background-clip: text;
color: transparent;
```

# 单行居中显示文字，多行居左显示，最多两行超过用省略号结尾

前2项条件：

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

第3项条件关键代码

display: -webkit-box; // 设置display，将对象作为弹性伸缩盒子模型显示
-webkit-line-clamp: 2; // 限制在一个块元素显示的文本的行数
-webkit-box-orient: vertical; // 规定框的子元素应该被水平或垂直排列

配合 overflow : hidden 和 text-overflow: ellipsis 即可实现 webkit 内核下的多行省略

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

# reset.css

作者推荐了`normalize.css`替代传统的`reset.css`。
[链接](https://github.com/chokcoco/iCSS/issues/5)

# 抗锯齿渲染`-webkit-font-smoothing`

`-webkit-font-smoothing`有3个属性值：

- `none`: 对像素低的文本好，会有严重的锯齿；
- `subpixel-antialiased`: 默认值，有轻微锯齿；
- `antialiased`: 抗锯齿很好。

抗锯齿：`body{-webkit-font-smoothing: antialiased;}`

`Gecko`内核的抗锯齿效果：

`-moz-osx-font-smoothing: inherit | grayscale;`这个属性也是更清晰的作用。

# 粘性布局：`position:sticky`

重点：

```
position: sticky;
top: 0;
```

sticky必须指定 `top`, `right`, `bottom` 或 `left` 四个阈值其中之一，才可使粘性定位生效。否则其行为与相对定位相同。

## 懒加载图片实例

```
const io = new IntersectionObserver(callback);
let imgs = document.querySelectorAll('[data-src]');
function callback(entries){
  entries.forEach((item) => {
    if(item.isIntersecting){
      item.target.src = item.target.dataset.src 
      io.unobserve(item.target)	
    }
    
  })
} 

imgs.forEach((item)=>{
  io.observe(item)
})
```

# 文字描边-webkit-text-stroke

```
-webkit-text-stroke: 1px #fff;
```

# 文字颜色-webkit-text-fill-color

```
a{
  -webkit-text-fill-color: red;
  color: green;
}
```

它们俩同样都是设置文字颜色，但就算`color`在下面，也是`-webkit-text-fill-color`的权重更高，优先级更高。

# `:focus`与`:focus-within`

如果只使用`:focus`，它不能包含子元素的聚焦事件（比如输入框、按钮聚焦）。

以下内容无效：

```
.container:focus input {
  width: 230px;
}
```

用:focus-within解决：

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

# font-size:10px

字体如果需求是小于`12px`的话，可以先设置字体为`20px`，再使用`transfrom:scale(0.5)`进行缩放。（也可以使用图片，但不推荐）

# 清除浮动

1、使用空元素clear:both
2、overflow:hidden
3、使用邻近元素clear:both
4、使用伪类:before元素clear:both

父元素：

```
.content-box::after{
  clear: both;
  content: '';
  display: block;
}
```
# 左边定宽，右边自适应

1、使用flex
2、右边的width: calc(100% - 100px)
3、使用float

# BFC

BFC是特性（功能），不是定义。

比如float，position、absolute

