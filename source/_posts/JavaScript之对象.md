---
title: JavaScript之对象
date: 2020-08-05 15:44:34
categories: 
- program
---

# 增

```
var obj = {};
obj.id = 1;
```


# 删

```
delete obj.id;
```

# 合并两个对象

```
Object.assign(obj1,obj2);
```

# 深拷贝

[链接](https://firefly1984982452.github.io/2020/07/31/JavaScript%E6%B7%B1%E6%8B%B7%E8%B4%9D%E6%B5%85%E6%8B%B7%E8%B4%9D%E5%85%A8%E6%9E%90/)

方法1：JSON.parse(JSON.stringify())

方法2：MessageChannel

方法3：lodash.cloneDeep


# 遍历

`Object.keys()`

`Object.values()`

`for...in`

# definedProperty

```
var obj = {
id:1,
info:{
    sex:'女',
    name:'小红'
},
arr:['吃饭','喝水']
};
function observer(obj) {
console.log(obj)
if(typeof obj === 'object'){
    for(let i in obj){
    definedReactive(obj,i,obj[i]);
    }
}
}
function definedReactive(obj,key,value) {
observer(value);
Object.defineProperty(obj,key,{
    get(){
    console.log('获取：'+key)
    return value;
    },
    set(newValue){
    observer(newValue);
    console.log(key + '- 数据改变了');
    value = newValue;
    }
})
}
observer(obj);

obj.id = 1; // 修改对象监听成功
delete obj.info.name; // 删除对象监听失败
obj.arr.push(2); // 添加数组监听失败
obj.arr.slice(1); // 修改数组监听失败

```