---
title: CSS之工具：PostCSS、CSS-in-JS
date: 2021-08-09 10:19:32
categories:
  - program
---

# 一、PostCSS

- [PostCSS 官网链接](https://www.postcss.com.cn/)

我理解到的`PostCSS`就是个工具集，比如里面的`Autoprefixer`插件能自动补全前缀，`PostCSS Preset Env`能使用新特性

# 二、CSS in JS

[阮一峰的博客教程](https://www.ruanyifeng.com/blog/2017/04/css_in_js.html)

`CSS in JS` 是个库，里面有各种操作 `css` 的 `js` 函数，如：`polished.js`

`ellipsis`将超过指定长度的文本，使用省略号替代（查看完整代码）。

```
const styles = {
  ...polished.ellipsis('200px')
}
```

`hideText`用于隐藏文本，显示图片。

```
const styles = {
  'background-image': 'url(logo.png)',
  ...polished.hideText(),
};
```

`hiDPI`指定高分屏样式。

```
const styles = {
 [polished.hiDPI(1.5)]: {
   width: '200px',
 }
};
```

`retinaImage`为高分屏和低分屏设置不同的背景图。

```
const styles = {
 ...polished.retinaImage('my-img')
};
```

## 缺点

- 学习坡度很陡
- 简单静态页面一般用不着
