---
title: 《CSS秘籍》笔记
date: 2020-09-22 13:50:17
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

# 灵活的背景定位

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

# 条纹背景

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

# 平形四边形

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

# 菱形图片

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

# 切角效果

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

# 梯形效果

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

# 通过阴影弱化背景

```
box-shadow: 0 0 0 50vmax rgba(0,0,0,.8);
```

# 通过阴影弱化背景

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