---
title: vue兄弟组件通过eventbus传值
date: 2018-09-20 18:21:23
tags:
categories: 编程开发
---

新建`bus.js`


```
import Vue from "vue"
export default new Vue();
```

兄组件`child1.vue`


```
<span @click="send">点击</span>
send(){
	eventBus.$emit('sentMsg','hellowrold~');
}
```

弟组件`child2.vue`

```
mounted() {
    eventBus.$on('sentMsg',v=>{
        console.log(v)
    })
},
```