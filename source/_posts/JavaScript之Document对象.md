---
title: JavaScript之Document对象
date: 2020-12-10 16:17:34
categories: 
- program
---

# Dcoument对象集合

- all
- forms
- images
- links

# 域名、地址

- domain
- documentURI
- baseURI
- URL

# cookie

# title：名称

# visibilityState：页面隐藏状态

```
document.addEventListener('visibilitychange', function () {
  // 用户离开了当前页面
  if (document.visibilityState === 'hidden') {
    document.title = '页面不可见';
  }

  // 用户打开或回到页面
  if (document.visibilityState === 'visible') {
    document.title = '页面可见';
  }
});
```

# referrer：上一页地址

返回上一页的地址，可以处理如移动端直接进入到详情页时，用`history.go(-1)`和`history.back()`无效时可用`document.referrer`。

[直接进入此详情页时点返回会返回到首页](https://m.qidian.com/author/402631776)

```
if(document.referrer === '') {
  window.location.href = 'https://www.baidu.com/'
} else {
  history.back();
}
```

# 获取对象

- getElementById()
- getElementsByClassName()
- getElementsByName()
- getElementsByTagName()
- querySelector()
- querySelectorAll()

# 写入

- write()
- writeln()

# 状态监听

- addEventListener()
- removeEventListener()

# 创建元素、节点

- createElement()
- createTextNode()