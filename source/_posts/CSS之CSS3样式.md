---
title: CSS之CSS3样式
date: 2021-01-07 14:19:32
categories:
  - program
---

# 边框

- `border-radius`
- `box-shadow`
- `border-image`

## 【1】box-shadow

`box-shadow: 50px 50px 0 20px #ffb;`

图：

![image](https://wx3.sinaimg.cn/mw690/0069qZtTgy1gj0nvzcynqj308y069dfn.jpg)

解析：

```
参数1：X轴，图中为30，因为50-20=30；
参数2：Y轴，图中为30，因为50-20=30；
参数3：模糊距离
参数4：阴影大小，默认可省略不写时为0。
参数4：颜色。
```

## 【2】border-image

`border-image-repeat`: 重复（`repeat`）、拉伸（`stretch`）或铺满（`round`）。

```
border-image: url(border.png) 30 round;
```

## 【3】半透明边框

`rgba`或`hsla`

```
color: hsla(1,0%,100%,.2);
border: solid 3px;
border-color: rgba(255,255,0,.2);
```

## 【4】多重边框

### 【4.1】用 box-shadow

![image](https://wx3.sinaimg.cn/large/0069qZtTgy1gizk2ty7otj304304aa9x.jpg)

```
background: #fbfb;
box-shadow: 0 0 0 5px #f00, 0 0 0 10px #ff0, 0 0 0 15px #00f;
```

### 【4.2】用 outline

![image](https://wx4.sinaimg.cn/mw1024/0069qZtTgy1gizka5updnj3042044746.jpg)

```
background: #fbfb;
outline: 5px solid #ff0;
border: 5px solid #f00;
```

**outline 和 border 的区别**：

- `outline`不占空间，`border`占空间
- 设置圆角（`border-radius`）之后，`border`边框会贴紧，`outline`不会
- `outline-set`可以设置边距

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

## border-style 属性

[效果](https://www.w3school.com.cn/tiy/t.asp?f=csse_border-style)

- `none`：无；
- `hidden`：同“`none`”，在 `table` 中能解决边框冲突；
- `dotted`：点；
- `dashed`：虚线；
- `solid`：实线；
- `double`：双实线；
- `inset`：3D 内边框;
- `outset`：3D 外边框;
- `groove`：凹槽边框；
- `ridge`：垄状边框；

---

# 背景：background

## 【1】区域起源：background-origin

背景区域的位置，有如下属性：

- `content-box`：`padding`值会起效，以`padding`开始的单位开始显示背景；

- `padding-box`：`padding`不会影响背影，直接从`border`里面开始显示背影；

- `border-box`：`border`不会影响背景，直接把`border`的内容也算在背影里面，背景会减去`border`的长度。

![image](https://wx3.sinaimg.cn/large/0069qZtTgy1gmojvywhjdj30nj09q0vi.jpg)

## 【2】区域剪辑：background-clip

背景区域的位置，有如下属性：

- `content-box`：`padding`值会起效，以`padding`开始的单位开始显示背景，**`padding`的部分会被剪掉**；

- `padding-box`：`padding`不会影响背影，直接从`border`里面开始显示背影；

- `border-box`：`border`**会**影响背景，和`padding-box`的效果一样。

![image](https://wx4.sinaimg.cn/large/0069qZtTgy1gmojw61vn4j30nr0arq4z.jpg)

**对比：**

![image](https://wx2.sinaimg.cn/large/0069qZtTgy1gmojwa6l61j30re0iv79f.jpg)

## 【3】图片：background-image

背景图，有如下属性：

- `url()`：图片地址
- `linear-gradient()`渐变背景

## 【4】位置：background-position

让背景图在距离右边和底部都是 20px，如图：

![image](https://wx4.sinaimg.cn/mw690/0069qZtTgy1gizlk17h0ej303b03i74d.jpg)

### 【4.1】background-position

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

### 【4.2】calc

```
background: url(img_url) no-repeat;
background-position: calc(100% - 20px, 100% - 20px);
```

## 【5】背景依附：background-attachment

背景依附，默认为`scroll`，随背景滚动

```
background-attachment: fixed; // 背景不会随内容滚动
```

用`background-attachment`实现滚动提示

![image](https://wx2.sinaimg.cn/large/0069qZtTgy1gmf5vn5ch4j307l07igln.jpg)

```
background-image: radial-gradient(at top, rgba(0,0,0,0.2), rgba(0,0,0,0));
background-repeat: no-repeat;
background-size: 100% 15px;
background-attachment: local, scroll;
```

## 【6】背景重复：background-repeat

**属性**

- `repeat`【默认】：平铺满整个容器，可能会造成背景图片显示不全。
- `repeat-x`： 背景图片沿容器的 X 轴平铺。
- `repeat-y`：背景图片沿容器的 Y 轴平铺。
- `no-repeat`：背景图片不做任何平铺。
- `round`：升缩背景图片适应容器大小。
- `space`：平均分配相邻图片之间的空间。

**示例**

![image](https://wx3.sinaimg.cn/large/0069qZtTgy1gnbbuxfn3aj31hb0sk154.jpg)

[源码](https://firefly1984982452.github.io/my-web-page/background-repeat.html)

---

# 转换：transform

[所有旋转效果](https://c.runoob.com/codedemo/3391)

```
/* 转换中心 */
transform-origin: top;
/* 旋转 */
transform: rotate(45deg);
/* 倾斜 */
transform: skew(45deg);
/* 梯形效果 */
transform: perspective(45deg);
/* 平移 */
transform: translate(20px, 10px);
/* 缩放 */
transform: scale(.5);

```

也可以所有属性合并：

```
transform: rotate(45deg) translate(20px, 10px) scale(.5) skew(45deg);
```

## 【1】rotate：旋转

### 【1.1】正方形

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

### 【1.2】长方形

```
.lin-long > img{
  clip-path: polygon(50% 0, 100% 50%, 50% 100%, 0 50%);
  transition: ls clip-path;
}
.lin-long > img:hover{
  clip-path: polygon(0 0 , 100% 0, 100% 100%, 0 100%);
}
```

## 【2】skewX：倾斜

`transform: skewX(-45deg);`

**skewX 默认会把字体内容也旋转，解决方式是加伪元素**

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

## 【3】perspective：梯形效果

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

---

# 多边形裁剪路径：clip-path

[源码](https://firefly1984982452.github.io/my-web-page/clip-path.html)

## 【1】矩形：inset

语法：

```
clip-path:inset(上 右 下 左); // 4个值
clip-path:inset(上右下左); // 1个值
clip-path:inset(上 左右 下); // 3个值
clip-path:inset(下 左右); // 2个值
clip-path:inset(上右下左 round 圆角); // 值+圆角【border-radius】
```

示例：

![image](https://wx2.sinaimg.cn/mw690/0069qZtTgy1gnbaa0b9f5j30ok09oaa8.jpg)

```
clip-path: inset(10px 20px 0px 5px); // 矩形
clip-path: inset(25% 5px round 5px 25%);// 其它
```

## 【2】圆形：circle

语法：

```
clip-path:circle(半径 at x y);
```

示例：

![image](https://wx3.sinaimg.cn/mw690/0069qZtTgy1gnaii751tlj30kk08l0st.jpg)

```
clip-path: circle(50% at 50% 50%); // 正圆
clip-path: circle(); // 正圆-简写
clip-path: circle(50% at 0 100%); // 其它形状圆
```

## 【3】椭圆：ellipse

语法：

```
clip-path:ellipse(x y at 圆心x 圆心y);
```

示例：

![image](https://wx1.sinaimg.cn/mw690/0069qZtTgy1gnairkejmxj30k508hjrf.jpg)

```
clip-path: clip-path: ellipse(30% 20% at 50% 50%);; // 正圆
clip-path: ellipse(40% 20% at 20% 70%); // 其它形状
```

## 【4】多边形：polygon

语法：

```
clip-path:polygon(x1 y1, x2 y2, x3 y3,...);
```

示例：

- 1. 多边形

![image](https://wx4.sinaimg.cn/mw690/0069qZtTgy1gnai8f18pkj309605nt8m.jpg)

```
clip-path: polygon(0 0, 90% 0, 100% 25%, 100% 100%, 10% 100%, 0 85%);
```

- 2. 三角形

![image](https://wx3.sinaimg.cn/mw690/0069qZtTgy1gnai8jg39zj308e05nwed.jpg)

```
clip-path: (0 100%, 50% 0, 100% 100%);
```

三角形原理：

![image](https://wx2.sinaimg.cn/mw690/0069qZtTgy1gnai89f7bqj30hk0dxt94.jpg)

---

# 各种阴影

## 【1】边框阴影：box-shadow

### 【1.1】单侧阴影

![image](https://wx3.sinaimg.cn/mw690/0069qZtTgy1gj0ob24z97j306y03qmwy.jpg)

```
box-shadow: 15px 0 5px -10px #000;
```

| `h-shadow` | `v-shadow` | `blur` | `spread` | `color` |     `insect`     |
| :--------: | :--------: | :----: | :------: | :-----: | :--------------: |
|  水平阴影  |  垂直阴影  |  模糊  | 阴影尺寸 |  颜色   | 外阴影转到内阴影 |

### 【1.2】多侧阴影

![image](https://wx2.sinaimg.cn/mw690/0069qZtTgy1gj0ob7xfq6j307d03sjr7.jpg)

```
box-shadow: 15px 0 5px -10px #000, -15px 0 5px -10px #000;
```

## 【2】文字阴影：text-shadow

![image](https://wx4.sinaimg.cn/mw690/0069qZtTgy1gj0ojj9giyj305602i3yg.jpg)

```
text-shadow: 5px 5px 5px #f00;
```

参数：x 轴、y 轴、阴影、颜色。

## 【3】多边形阴影：drop-shadow

**文字也会有阴影**

![image](https://wx4.sinaimg.cn/mw690/0069qZtTgy1gj0ol4gog9j305l03amx2.jpg)

```
width: 0;
height: 0;
border: 100px solid ;
border-color: transparent transparent red;
filter: drop-shadow(5px 5px 5px #000);
```

参数：x 轴、y 轴、阴影、颜色。

## 【4】通过阴影弱化背景

```
box-shadow: 0 0 0 50vmax rgba(0,0,0,.8);
```

重点：用伪元素设置 blur

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

# 渐变：gradient

- `line-gradient`：创建线性渐变的图片

- `redial-gradient`：创建径向渐变的图片

- `repeating-line-gradient`：创建重复线性渐变的图片

- `repeating-redial-gradient`：创建重复径向渐变的图片

与`background-size`组合的话，可以生成条纹背景。

## 【1】linear-gradient

背景 2 色平铺

![image](https://wx3.sinaimg.cn/mw690/0069qZtTgy1gj0f2jukxkj308v05pt8r.jpg)

```
background: linear-gradient(#ff0 50%, #f00 50%);
background-size: 100% 50%;
```

### 【1.1】linear-gradient：条纹背景

#### 背景为上下 2 色分割

![image](https://wx2.sinaimg.cn/mw690/0069qZtTgy1gj0f2emiabj308x05lq2r.jpg)

`backgorund-image: linear-gradient(#ff0 50%, #f00 50%)`

#### 背景 2 色平铺

![image](https://wx3.sinaimg.cn/mw690/0069qZtTgy1gj0f2jukxkj308v05pt8r.jpg)

```
background: linear-gradient(#ff0 50%, #f00 50%);
background-size: 100% 50%;
```

#### 背景 2 色任意角度平铺

![image](https://wx1.sinaimg.cn/mw690/0069qZtTgy1gj0f30zb6bj308t05nn04.jpg)

```
background-image: repeating-linear-gradient(60deg,yellow 0%,yellow 5%,green 0%,green 10%);
```

### 【1.2】linear-gradient：切角效果

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

## 【2】repeating-linear-gradient

背景 2 色任意角度平铺

![image](https://wx1.sinaimg.cn/mw690/0069qZtTgy1gj0f30zb6bj308t05nn04.jpg)

```
background-image: repeating-linear-gradient(60deg,yellow 0%,yellow 5%,green 0%,green 10%);
```

---

# 文本效果

## 文字超出：text-overflow

- ellipsis：显示`...`。
- clip：截断。
- 'string'：【仅 firefox】自定义字符串。

## 文字换行：word-wrap

- break-word：如果单词太长会自动换行。

## 文字截断：word-break

- keep-all：【默认】单词放不下会自动换行。
- break-all：单词放不下会折断换行，铺满元素。

---

# 文字环绕：shape

`shape-outside`属性使得行内（`inline`）的内容，围绕`outside`指定的曲线排列，可以用多边形``里面的属性。

`shape-margin`属性指定`shape-outside`与内容之间的`margin`。

【1】圆形文字环绕

![image](https://wx2.sinaimg.cn/large/0069qZtTgy1gnadz5a2rlj30ih06kt9g.jpg)

```
.circle {
  width: 250px;
  height: 250px;
  background-color: #fbb;
  border-radius: 50%;
  float: left;
  shape-outside: circle();
}
```

【2】三角形文字环绕

![image](https://wx2.sinaimg.cn/large/0069qZtTgy1gnadzmmpw3j30j406oaas.jpg)

```
.circle {
  width: 250px;
  height: 250px;
  background-color: #fbb;
  border-radius: 50%;
  float: left;
  clip-path: polygon(0 100%, 50% 0, 100% 100%);
  shape-outside: polygon(0 100%, 50% 0, 100% 100%);
}
```

---

# 动画：animation

## 【1】写法

```
<style>
  div {
    width: 0px;
    height: 100px;
    background: red;
    position: relative;
    /* 全称名字 */
    /* animation: name duration timing-function delay iteration-count direction fill-mode;  */

    /* 全称简写 */
    /* animation: mymove 5s linear 1s 1 alternate backwards;  */

    /* 名称 */
    animation-name: mymove;
    /* 速度 */
    animation-duration: 5s;
    /* 曲线 */
    animation-timing-function: linear;
    /* 延迟 */
    animation-delay: 1s;
    /* 次数 */
    animation-iteration-count: 1;
    /* 反向播放 */
    animation-direction: normal;
    /* 填充模式 */
    animation-fill-mode: both;
  }

  @keyframes mymove {
    from {
      background-color: #fbb;
      width: 10px;
    }

    to {
      width: 300px;
    }
  }
</style>

...

<div> content </div>
```

## 【2】属性解析

### 【2.1】曲线：animation-timing-function

- `linear`：速度从头至尾相同。
- `ease`：【默认】低速开始和结束，中间速度快。
- `ease-in`：低速开始。
- `ease-out`：低速结束。
- `ease-in-out`：低速开始和结束

### 【2.2】反向播放：animation-direction

- `normal`：【默认】只正常播放
- `alternate`：轮流反向播放

### 【2.3】填充模式

[学习链接](https://www.w3cplus.com/css3/understanding-css-animation-fill-mode-property.html)

- `none`：【默认】无改变。
- `forwards`：保留最后一帧，不回到初始状态。
- `backwards`：延迟的等待时间内，元素的样式变为第一帧的样式。
- `both`：同时应用`forwards`和`backwards`的效果。

## 【3】更多用法

### 【3.1】模拟打字动画

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

## 【4】其它组合

### 【4.1】backface-visibility：背面向屏幕时是否可见

```
<!DOCTYPE html>
<html>
  <head>
    <style>
    div
    {
      width:100px;
      height:100px;
      background: url('https://image.youbankeji.com/test/12/2021/01/05/6970b7294f674d6eb6a32425fdaca066.jpeg!avatar');
      background-size:100% 100%;
      animation:myfirst 15s;
      backface-visibility: hidden;
    }

    @keyframes myfirst
    {
      from {transform:rotateY(0deg);}
      to {transform:rotateY(360deg);}
    }

    </style>
  </head>
  <body>
  	<div>文字</div>
  </body>
</html>
```

---

# 过渡：transition

```
<style>
  div {
    width: 100px;
    height: 100px;
    background: red;
    position: relative;
    /* 简写 */
    /* transition: width 2s linear 1s; */

    /* 属性名称 */
    transition-property: width;
    /* 持续时间 */
    transition-duration: 2s;
    /* 曲线 */
    transition-timing-function: linear;
    /* 延迟时间 */
    transition-delay: 1s;
  }

  div:hover {
    width: 300px;
  }
</style>

...

<div></div>
```

**曲线：animation-timing-function**

- `linear`：速度从头至尾相同。
- `ease`：【默认】低速开始和结束，中间速度快。
- `ease-in`：低速开始。
- `ease-out`：低速结束。
- `ease-in-out`：低速开始和结束

---

# 滤镜：filter

[filter 所有效果](https://www.runoob.com/try/try.php?filename=trycss_ex_images_filters)

常用：

- blur：高斯模糊
- drop-shadow：阴影

---

# 图片相关

## 【1】object-fit

[源码](https://firefly1984982452.github.io/my-web-page/object-fit.html)

**语法**

- `fill`【默认】：不按比例拉伸至填满容器；
- `contain`：保持比例缩放；
- `cover`：保持比例剪切；
- `none`：保持原有长和宽；
- `scale-down`：保持比例，取`contain`和`cover`谁的尺寸更小。

**示例**

![image](https://wx3.sinaimg.cn/large/0069qZtTgy1gnbgsxvddej31hb0ng1b9.jpg)

## 【2】image-set

```
background-image: -webkit-image-set(url('./cute.png') 2x, url('./yellow.jpeg') 3x);
```

选取移动端符合响应式条件的图片。

## 【3】background-blend-mode

背景的颜色混合模式，有 16 个值可取：【normal（默认值，即不混合）, multiply, screen, overlay, darken, lighten, color-dodge, color-burn, hard-light, soft-light, difference, exclusion, hue, saturation, color and luminosity（显示单色效果）】。

可以显示多张背景图片的混合，或者背景图片和颜色的混合。

```
background-image: url(...g);
background-color: #51B7D3;
background-blend-mode: luminosity;
```

或

```
background: url(img/pattern.png), url(img/jellyfish.jpg), #f07e32;
background-blend-mode: screen;
```

## 【4】object-position

与 `background-position`写法一样，区别是`object-position`用于对象，一般用图片，而`background-position`只能用在背景里面。

```
img {
  height: 100px;
  width: 100px;
  object-fit: contain;
  object-position: top 70px;
}
```

---

# flex 相关

## 规范

```
<div class="box">
  <div class="item"></div>
</div>
```

## 示例

```
.box{
  width: 400px;
  height: 400px;
  border: 1px solid #f7b2bb;
  display: flex;
  /*flex-direction: row;//方向
  flex-wrap: wrap; //换行 */
  flex-flow: row wrap;
  justify-content: space-between;//内容
  align-content: space-between;//
}
.item{
  width: 100px;
  height: 100px;
  background: #f7b2bb;
  color: #fff;
  border: 1px solid #eee;
  display: flex;
  justify-content: space-around;
  align-items: center;
  /*flex-grow: 3;*/
}
```

---

## flex 中的 `justify-content: space-evenly`

**均匀分布**

```
justify-content: space-between; // 两端
justify-content: space-around; // 两端间隙相等，项目中间的间隙比较大
justify-content: space-evenly; // 两端与项目中间的间隙一样大
```

区别：

![image](https://wx2.sinaimg.cn/mw690/0069qZtTgy1gidesq1po8j30970c4mxc.jpg)

**IOS 之类的兼容性用 before 和 after**

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

---
