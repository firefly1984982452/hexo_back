---
title: JavaScript之常用方法总结
date: 2020-12-07 14:19:32
categories: 
- program
---

# forEach跳出循环

```
var BreakException= {};

try {
    [1,2,3].forEach(function(i) {
        if(i === 2) throw BreakException;
        console.log(i);
    });
} catch(e) {
    if (e!==BreakException) throw e;
}

//forEach是函数，不是语法，因此没有直接break的语法。如果要中止，可使用 Array.every 或 Array.some。
```

# 电话正则

```
if(!(/^1[34578]\d{9}$/.test(responsibleTel.val()))){
   return toastr.info("请输入正确的电话号码","提示！");
}
```

# 用vconsole在移动端打开console控制台

首先：`npm install vconsole`

main.js
```
 // 调试
// import Vconsole from 'vconsole'
// const vConsole = new Vconsole()
// export default vConsole 
```


# 标签页通信

page1

```
localStorage.setItem('send','sendValue');
```

page2

```
window.addEventListener('storage', (e) => {
    console.log(e)
})
```

# 金钱格式化toLocalString

```
var num = 1234567890;
num.toLocalString();    //'1,234,567,890'
num.toLocaleString('en-US'); // 效果相同
```

# 单行写一个评级组件

"★★★★★☆☆☆☆☆".slice(5 - rate, 10 - rate);定义一个变量rate是1到5的值
