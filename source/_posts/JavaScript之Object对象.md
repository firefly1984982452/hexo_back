---
title: JavaScript之Object对象
date: 2020-08-05 15:44:34
categories: 
- program
---

# 增

```
var obj = {};
obj.id = 1;
```

---

# 删

```
delete obj.id;
```

---

# assign合并两个对象

```
Object.assign(obj1,obj2);
```

---

# 深拷贝

[链接](https://firefly1984982452.github.io/2020/07/31/JavaScript%E6%B7%B1%E6%8B%B7%E8%B4%9D%E6%B5%85%E6%8B%B7%E8%B4%9D%E5%85%A8%E6%9E%90/)

方法1：`JSON.parse(JSON.stringify())`

方法2：`MessageChannel`

方法3：`lodash.cloneDeep`

---

# 遍历

- `Object.keys()`

- `Object.values()`

- `for...in`

---

# definedProperty

递归遍历对象用`defineProperty`实现`vue`双向绑定

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

---

# is

`Object.is()` 的意思是对象比较

比如之前判断一个值是否为`NaN`的话可能会用`Number.isNaN()`，现在用`Object.is(NaN, NaN)`也能达到一样的效果。

---


# 判断对象`{}`是否为空

```
if(Object.keys(obj).length === 0){...}
```

---

# 对象key值构建

```
var a = 'name'
var b = {
    [a] : '小明'
}

结果：

b = {
    name: '小明'
}
```

---

# fromEntries

把序列化的字符串反转为对象。

```
window.location.search = '?roomId=9&status=1&taskId=7&serviceId=1109';
var str = window.location.search.substr(1);
var p = new URLSearchParams(str);
var param = Object.fromEntries(p);
```

---

# 防篡改对象

`preventExtensions`：不能增，能删改
`seal`：不能增删，能改
`freeze`:不能增删改

|对象属性|增|删|改|
|:--:|:--:|:--:|:--:|
|preventExtensions|×|✓|✓|
|seal|×|×|✓|
|freeze|×|×|×|

## 不可扩展对象`preventExtensions`

**`Object.preventExtensions`**不能增，能删改

```
var obj = {a:1,b:2};
Object.preventExtensions(obj);
obj.c = 3;
console.log(obj.c); // undefined
delete obj.a;
console.log(obj); // {b: 2} 删除成功
obj.b = 'hello'
console.log(obj); // {b: "hello"} 修改成功
```

检测是否不可扩展**`Object.isExtensible(obj)`**

(`false`是不可扩展，`true`是正常对象)

```
Object.isExtensible(obj);// false
```

## 密封的对象`seal`

**`Object.seal`**不能增删，能改

```
var obj = {a:1,b:2};
Object.seal(obj);
obj.c = 3;
console.log(obj.c); // undefined
delete obj.a;
console.log(obj); // {a:1,b:2} 删除失败
obj.b = 'hello'
console.log(obj); // {a:1,b: "hello"} 修改成功
```

检测是否密封**Object.isSealed(obj)**

(`false`是正常，`true`是已经密封了)

```
Object.isSealed(obj);// true
```

## 冻结的对象`freeze`

**`Object.freeze`**不能增删改

```
var obj = {a:1,b:2};
Object.freeze(obj);
obj.c = 3;
console.log(obj.c); // undefined
delete obj.a;
console.log(obj); // {a:1,b:2} 删除失败
obj.b = 'hello'
console.log(obj); // {a:1,b:2} 修改失败
```

检测是否冻结**Object.isFrozen(obj)**

(`false`是正常，`true`是已经冻结了)

```
Object.isFrozen(obj);// true
```

---

# entries 分割对象

```
const obj = { foo: 'bar', baz: 42 };
console.log(Object.entries(obj)); // [ ['foo', 'bar'], ['baz', 42] ]
```