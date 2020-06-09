---
title: async-await和promise用法
date: 2019-02-26 12:15:18
categories: 
- program
---

**要实现的效果

```
console.log(1)
http.post(){
    console.log(2)
}
console.log(3)
```

我希望上述代码执行之后结果是
```
1
2
3
```

但是，只要执行过的人都会知道，结果一定是
```
1
3
2
```

因为js不会等网络请求完之后再执行后面的语句，所以这里就要用到我们的`async` `await` 和 `Promise`

```
console.log(1)
let newFunction = new Promise(async(resolve,reject) => {
    await http.post(){
        console.log(2)
        resolve()
    }
})
newFunction.then(()=>{
    console.log(3)
})
```

这样写的话，就会得到我们的结果：
```
1
2
3
```