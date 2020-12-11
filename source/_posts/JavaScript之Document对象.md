---
title: JavaScript之Document对象
date: 2020-12-10 16:17:34
categories: 
- program
---

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