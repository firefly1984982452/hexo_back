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