---
title: HTML
date: 2021-02-18 14:19:32
categories:
  - program
---

学习链接：
[阮一峰](https://wangdoc.com/html/)

参考书籍：
[《HTML5 权威指南》](https://book.douban.com/subject/25786074/)

# URL 部分

## <base>元素

作用：设置相对 URL 的基础，有`href`和`target`属性。

用法：

```
<head>
  <base href="https://wx3.sinaimg.cn/" target="_blank">
</head>

<body>
  <a href="https://www.baidu.com/">打开默认网址以外的网址：写全称</a>
  <a href="mw690/0069qZtTgy1gnbgsxvddej31hb0ng1b9.jpg">打开默认网址下的页面：写后缀</a>
  <img src="mw690/0069qZtTgy1gnbgsxvddej31hb0ng1b9.jpg" alt="" srcset="">
  <img src="https://wx3.sinaimg.cn/mw690/0069qZtTgy1gnbgsxvddej31hb0ng1b9.jpg" alt="" srcset="">
</body>
```

这时`<a>`标签不用再写`target="_blank"`也能直接新标签页打写，`<img>`标签不用再写网址前缀也可以直接获取到地址。如果想用默认地址以外的地址：**写全称**。

---

# 全局属性

## 【1】id 中的`#`锚点

代码中有`<h1 id="test">测试</h1>`时，在浏览器直接后缀加上`#test`即可精准定位到指定 ID 地方。

## 【2】title

作用：鼠标悬停时有提示文字，相当于`tooltip`。

```
<h1 title="版权说明">版权项：XXX</h1>
```

## 【3】tabindex

作用：按<kbd>tab</kbd>键之后按顺序遍历。

属性值：

- 负整数：可以获取焦点（如 javaScript 中的`focus()`方法），但按<kbd>tab</kbd>键之后不会参与遍历。这个值通常是`-1`。
- `0`：参与遍历，如果都是 0，按顺序遍历。
- 正整数：参与遍历，按顺序遍历。

**3 个值都有的情况下的顺序：**

1. `tabindex`为`0`；
2. 地址栏`url`；
3. `tabindex`为正整数。

**`tabindex`为负数时不参与**

## 【4】accessKey

作用：使用自定义键来聚焦。

```
<button accesskey="s">提交</button>
```

使用：

window：使用<kbd>Alt</kbd> + `accessKey` (或者 <kbd>Shift</kbd> + <kbd>Alt</kbd> + `accessKey`)
macbook：使用<kbd>control</kbd> + <kbd>option</kbd> + `accessKey`。

## 【6】hidden

作用：不渲染这个 DOM 元素，相当于`display:none`。

```
<p hidden>本句不会显示在页面上。</p>
```

## 【7】dir

作用：`dir`属性表示文字的阅读方向。

有三个可能的值。

- `ltr`：从左到右阅读，比如英语。
- `rtl`：从右到左阅读，阿拉伯语、波斯语、希伯来语都属于这一类。
- `auto`：浏览器根据内容的解析结果，自行决定。

`rtl`从右到左阅读时，效果相当于`text-align:right`，起作用的属性是：`direction:rtl`。

## 【8】contenteditable

作用：允许修改内容。

```
<p contenteditable="true">阅读时是正常模式，鼠标点击后，本句内容可修改。</p>
```

## 【9】spellcheck

作用：打开拼写检查。

```
<p contenteditable="true" spellcheck="true">
英语单词 separate 容易写错成 seperate。
</p>
```

（**我在 chrome 和 firefox 下都无效，没找到原因:(**）

## 【10】`data-`属性

作用：放置自定义数据。

```
<style>
  h1[data-yeah]::before {
    content: attr(data-yeah);
  }
</style>

...

<h1 data-yeah='显示信息：'>data-yeah</h1>
```

---

# 网页的语义结构
