---
title: scroll滚动事件在浏览器无效
date: 2018-05-10 16:41:10
tags:
categories: 编程开发
---

在代码中写下了`document.body.scrollTop = 0;`，打印出来的值也是0，但是奈何chrome浏览器就是没有效果， 没有滚动到最上面去。

然后试了一下`$('html,body').animate({scrollTop:'0px'},500);`，发现竟然成功了，原来是兼容性的问题。jQuery已经做了兼容了。