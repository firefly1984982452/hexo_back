---
title: 编写可维护的CSS
date: 2020-11-03 13:50:17
categories: 
- program
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
