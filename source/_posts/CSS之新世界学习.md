---
title: CSS之新世界学习
date: 2021-08-31 11:19:32
categories:
  - program
---

# 需要提前了解的知识

## 2.1 互通互联的 CSS 数据类型

◆ 2.1.1 为什么要关注 CSS 数据类型

◆ 2.1.2 几个常见数据类型的简单介绍

## 2.2 学会看懂 CSS 属性值定义语法

◆ 2.2.1 学习 CSS 属性值定义语法的好处

◆ 2.2.2 CSS 属性值定义语法详解

## 2.3 了解 CSS 全局关键字属性值

◆ 2.3.1 用过都说好的继承关键字 inherit

◆ 2.3.2 可以一用的初始值关键字 initial

◆ 2.3.3 了解一下不固定值关键字 unset

◆ 2.3.4 我个人很喜欢的恢复关键字 revert

## 2.4 指代所有 CSS 属性的 all 属性

## 2.5 CSS 新特性的渐进增强处理技巧

◆ 2.5.1 直接使用 CSS 新特性

◆ 2.5.2 利用属性值的语法差异实现兼容

◆ 2.5.3 借助伪类或伪元素区分浏览器的技巧

◆ 2.5.4 @supports 规则下的渐进增强处理

◆ 2.5.5 对 CSS 新特性渐进增强处理的总结

# 从增强已有的 CSS 属性开始

## 3.1 贯穿全书的尺寸体系

◆ 3.1.1 从 width:fit-content 声明开始

◆ 3.1.2 stretch、available 和 fill-available 关键字究竟用哪个

◆ 3.1.3 深入了解 min-content 关键字

◆ 3.1.4 快速了解 max-content 关键字

## 3.2 深入了解 CSS 逻辑属性

◆ 3.2.1 CSS 逻辑属性有限的使用场景

◆ 3.2.2 inline/block 与 start/end 元素

◆ 3.2.3 width/height 属性与 inline-size/block-size 逻辑属性

◆ 3.2.4 由 margin/padding/border 演变而来的逻辑属性

◆ 3.2.5 text-align 属性支持的逻辑属性值

◆ 3.2.6 最有用的 CSS 逻辑属性 inset

## 3.3 在 CSS 边框上做文章

◆ 3.3.1 昙花一现的 CSS 多边框

◆ 3.3.2 独一无二的 border-image 属性

◆ 3.3.3 border-image 属性与渐变边框

## 3.4 position 属性的增强

◆ 3.4.1 深入了解 sticky 属性值与黏性定位

◆ 3.4.2 position:sticky 声明的精彩应用—层次滚动

## 3.5 font-family 属性和@font-face 规则新特性

◆ 3.5.1 system-ui 等全新的通用字体族

◆ 3.5.2 local()函数与系统字体的调用

◆ 3.5.3 unicode-range 属性的详细介绍

◆ 3.5.4 woff/woff2 字体

◆ 3.5.5 font-display 属性与自定义字体的加载渲染

## 3.6 字符单元的中断与换行

◆ 3.6.1 使用 keep-all 属性值优化中文排版

◆ 3.6.2 break-all 属性值的问题和 line-break 属性

◆ 3.6.3 hyphens 属性与连字符

◆ 3.6.4 与精确换行的控制

◆ 3.6.5 overflow-wrap:anywhere 声明有什么用

## 3.7 text-align 属性相关的新特性

◆ 3.7.1 match-parent 等新属性值

◆ 3.7.2 text-align 属性的字符对齐特性

## 3.8 text-decoration 属性全新升级

◆ 3.8.1 text-decoration 属性现在是一种缩写

◆ 3.8.2 text-decoration 属性的累加特性

◆ 3.8.3 唯一实用的 wavy 波浪线

◆ 3.8.4 可能需要 text-underline-position:under 声明

◆ 3.8.5 更需要 text-underline-offset 属性

◆ 3.8.6 讲一讲 text-decoration-skip 属性的故事

## 3.9 color 属性与颜色设置

◆ 3.9.1 个颜色关键字

◆ 3.9.2 transparent 关键字

◆ 3.9.3 currentColor 关键字

◆ 3.9.4 RGB 颜色和 HSL 颜色的新语法

## 3.10 必学必会的 background 属性新特性

◆ 3.10.1 最实用的当属 background-size 属性

◆ 3.10.2 background 属性最成功的设计—多背景

◆ 3.10.3 background-clip 属性与背景显示区域限制

◆ 3.10.4 background-clip:text 声明与渐变文字效果

◆ 3.10.5 background-origin 属性与背景定位原点控制

◆ 3.10.6 space 和 round 平铺模式

◆ 3.10.7 可以指定 background-position 的起始方位了

## 3.11 outline 相关新属性 outline-offset

## 3.12 cursor 属性新增的手形效果

◆ 3.12.1 放大手形 zoom-in 和缩小手形 zoom-out 简介

◆ 3.12.2 抓取手形 grab 和放手手形 grabbing 简介

# 更细致的样式表现

## 4.1 透明度控制属性 opacity

◆ 4.1.1 opacity 属性的叠加计算规则

◆ 4.1.2 opacity 属性的边界特性与应用

## 4.2 深入了解圆角属性 border-radius

◆ 4.2.1 了解 border-radius 属性的语法

◆ 4.2.2 弄懂圆角效果是如何产生的

◆ 4.2.3 border-radius 属性渲染 border 边框的细节

◆ 4.2.4 border-radius 属性的高级应用技巧

## 4.3 box-shadow 盒阴影

◆ 4.3.1 inset 关键字与内阴影

◆ 4.3.2 不要忽略第四个长度值

◆ 4.3.3 多阴影特性与图形绘制

◆ 4.3.4 box-shadow 动画与性能优化

## 4.4 CSS 3D 变换

◆ 4.4.1 从基本的变换方法说起

◆ 4.4.2 transform 属性的若干细节特性

◆ 4.4.3 元素应用 transform 属性后的变化

◆ 4.4.4 深入了解矩阵函数 matrix()

◆ 4.4.5 常常被遗忘的 transform-origin 属性

◆ 4.4.6 scale()函数缩放和 zoom 属性缩放的区别

◆ 4.4.7 了解全新的 translate、scale 和 rotate 属性

## 4.5 简单实用的 calc()函数

◆ 4.5.1 关于 calc()函数

◆ 4.5.2 了解 min()、max()和 clamp()函数

# 更强的视觉表现

## 5.1 CSS 渐变

◆ 5.1.1 深入了解 linear-gradient()线性渐变

◆ 5.1.2 深入了解 radial-gradient()径向渐变

◆ 5.1.3 了解 conic-gradient()锥形渐变

◆ 5.1.4 重复渐变

## 5.2 CSS D 变换

◆ 5.2.1 从常用的 3D 变换函数说起

◆ 5.2.2 必不可少的 perspective 属性

◆ 5.2.3 用 translateZ()函数寻找透视位置

◆ 5.2.4 指定 perspective 透视点的两种写法

◆ 5.2.5 理解 perspective-origin 属性

◆ 5.2.6 transform-style:preserve-3d 声明的含义

◆ 5.2.7 backface-visibility 属性的作用

◆ 5.2.8 值得学习的旋转木马案例

◆ 5.2.9 D 变换与 GPU 加速

## 5.3 CSS 过渡

◆ 5.3.1 你可能不知道的 transition 属性知识

◆ 5.3.2 了解三次贝塞尔时间函数类型

◆ 5.3.3 transition 与 visibility 属性的应用指南

## 5.4 CSS 动画

◆ 5.4.1 初识 animation 属性

◆ 5.4.2 @keyframes 规则的语法和特性

◆ 5.4.3 动画命名与数据类型

◆ 5.4.4 负延时与即时播放效果

◆ 5.4.5 reverse 和 alternate 关键字的区别和应用

◆ 5.4.6 动画播放次数可以是小数

◆ 5.4.7 forwards 和 backwards 属性值究竟是什么意思

◆ 5.4.8 如何暂停和重启 CSS 动画

◆ 5.4.9 深入理解 steps()函数

◆ 5.4.10 标签嵌套与动画实现的小技巧

# 全新的布局方式

## 6.1 分栏布局

## 6.2 弹性布局

## 6.3 网格布局

## 6.4 CSS Shapes 布局

# 不同设备的适配与响应

## 7.1 @media 规则

## 7.2 环境变量函数 env()

## 7.3 rem 和 vw 单位与移动端适配最佳实践

## 7.4 使用 touch-action 属性控制设备的触摸行为

## 7.5 image-set()函数与多倍图设置

# CSS 的变量函数 var()与自定义属性

## 8.1 CSS 变量的语法、特性和细节

## 8.2 CSS 自定义属性的设置与获取

## 8.3 使用 content 属性显示 CSS 自定义属性值的技巧

## 8.4 CSS 变量的自定义语法技术简介

# 文本字符处理能力的升级

## 9.1 文字的美化与装饰

## 9.2 文字的旋转与阅读方向

## 9.3 文本字符的尺寸控制

## 9.4 文字渲染与字体呈现

## 9.5 字体特征和变体

## 9.6 可变字体

# 图片等多媒体的处理

## 10.1 图片和视频元素的内在尺寸控制

## 10.2 使用 image-orientation 属性纠正图片的方向

## 10.3 image-rendering 属性与图像的渲染

## 10.4 不常用的图像类型函数

# 更绚丽的视觉表现

## 11.1 深入了解 CSS 滤镜属性 filter

## 11.2 姐妹花滤镜属性 backdrop-filter

## 11.3 深入了解 CSS 混合模式

## 11.4 混合模式属性 background-blend-mode

## 11.5 使用 isolation: isolate 声明隔离混合模式

# 更丰富的图形处理

## 12.1 超级实用的 CSS 遮罩

## 12.2 同样实用的 CSS 剪裁属性 clip-path

## 12.3 -webkit-box-reflect 属性与倒影效果的实现

## 12.4 使用 offset 属性实现元素的不规则运动

# 用户行为与体验增强

## 13.1 滚动行为相关

## 13.2 点击行为相关

## 13.3 拉伸行为相关

## 13.4 输入行为相关

## 13.5 选择行为相关

## 13.6 打印行为相关

## 13.7 性能增强

# SVG 元素的 CSS 控制

## 14.1 使用 CSS 属性直接绘制 SVG 图形

## 14.2 CSS 属性下的填充设置

## 14.3 CSS 属性下的描边设置

## 14.4 CSS 属性下的标记设置

# Houdini 是 CSS 新的未来吗

## 15.1 了解 CSS Paint API

## 15.2 了解 CSS Properties & Values API

## 15.3 了解 CSS Parser API

## 15.4 详细了解 CSS Layout API

## 15.5 快速了解 CSS Typed OM

## 15.6 简单了解 Animation Worklet

## 15.7 了解 Font Metrics API
