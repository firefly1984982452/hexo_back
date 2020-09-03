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