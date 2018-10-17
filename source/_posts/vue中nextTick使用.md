---
title: vue中nextTick使用
date: 2018-10-15 11:14:46
tags:
categories: 编程开发
---



```
//改变数据
var msg = 'change';

//想要立即使用刚刚赋的值‘change’，此时是不行的，DOM并没有更新
console.log(vm.$el.textContext);//不能得到 'change'

//这样可以获取，nextTick会在DOM更新后获取
this.$nextTick(()=>{
    console.log(vm.$el.textContext);//可以得到 'change'
})
```