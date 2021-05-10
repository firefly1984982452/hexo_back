---
title: HTML5之canvas
date: 2021-03-09 15:43:32
categories:
  - program
---

# 一、学习链接

- [阮一峰-canvas 教程](https://wangdoc.com/webapi/canvas.html)

- [菜鸟教程-canvas 教程](https://www.runoob.com/html/html5-canvas.html)

- [菜鸟教程-canvas 实例](https://www.runoob.com/w3cnote/html5-canvas-intro.html)

---

# 二、简介

## 【0】canvas 效果预览

![image](https://wx4.sinaimg.cn/large/0069qZtTgy1godp89sf40j31pl0u0kjl.jpg)

[在线观看](https://firefly1984982452.github.io/my-web-page/canvas.html)

[源码地址](https://github.com/firefly1984982452/my-web-page/blob/master/canvas.html)

## 【1】canvas 的通用标准语法

- width：宽度；
- height：高度；
- fill：填充色；
- stroke：边框色；

## 【2】使用

```
<!DOCTYPE html>
<html>
  <head></head>
  <body>
    <canvas id="myCanvas" width="200" height="100" style="border:1px solid #000000;">
    </canvas>
    <script>
      var c=document.getElementById("myCanvas");
      var ctx=c.getContext("2d");
      ctx.fillStyle="#FF0000";
      ctx.fillRect(0,0,150,75);
    </script>
  </body>
</html>
```

---

# 三、元素语法

## 【1】`<canvas>`

canvas 代码都放在顶层标签`<canvas>`之中，由 JS 生成内容，一般情况下没有内层标签。

```
<canvas id="myCanvas" width="200" height="100" style="border:1px solid #000000;">
</canvas>
```

## 【2】`rect`矩形

```
<canvas class="box" id="rect"> </canvas>

...

function rectFn() {
  let c = document.querySelector("#rect");
  let ctx = c.getContext("2d");
  ctx.fillStyle = "#FF0000";
  ctx.fillRect(10, 10, 150, 75);
}
```

## 【3】`moveTo`矩形

```
<canvas class="box" id="moveTo"> </canvas>

...

function rectFn() {
  let c = document.querySelector("#moveTo");
  let ctx = c.getContext("2d");
  ctx.moveTo(10, 10);
  ctx.lineTo(150, 200);
  ctx.stroke();
}
```

## 【4】`arc`圆形

```
<canvas class="box" id="arc"> </canvas>

...

function rectFn() {
  let c = document.querySelector("#rect");
  let ctx = c.getContext("2d");
  ctx.beginPath();
  ctx.arc(90, 50, 40, 0, 2 * Math.PI);
  ctx.stroke();
}
```

## 【5】text【文本】

```
<canvas class="box" id="text"> </canvas>

...

function rectFn() {
  let c = document.querySelector("#rect");
  let ctx = c.getContext("2d");
  ctx.font = "30px Arial";
  ctx.fillText("hello world", 10, 50);
  ctx.strokeText("hello world", 20, 100);
}
```

## 【6】gradient【渐变】

```
<canvas class="box" id="gradient"> </canvas>

...

function rectFn() {
  let c = document.querySelector("#rect");
  let ctx = c.getContext("2d");
  let grd = ctx.createLinearGradient(0, 0, 200, 0);
  grd.addColorStop(0, "#f00");
  grd.addColorStop(1, "#fff");

  ctx.fillStyle = grd;
  ctx.fillRect(10, 10, 150, 80);
}
```

## 【7】image【图像】

```
<img
  class="box"
  id="scream"
  src="https://wx1.sinaimg.cn/mw690/0069qZtTgy1go96k54t3lj30ru0rqx6p.jpg"
  width="250"
  height="300"
  style="display: none"
/>
<canvas class="box" id="image"> </canvas>

...

function rectFn() {
  let c = document.querySelector("#rect");
  let ctx = c.getContext("2d");
  let img = document.querySelector("#scream");
  img.onload = function () {
    ctx.drawImage(img, 0, 0, 300, 200);
  };
}
```
