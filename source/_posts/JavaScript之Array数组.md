---
title: JavaScript之Array数组
date: 2020-06-08 15:44:34
categories:
  - program
---

# 扩展运算符（`...`）

用法：将数组变为参数序列

```
console.log(...[1,2,3]); // 1,2,3
```

## 代替 apply

```
// ES5 的写法
Math.max.apply(null, [14, 3, 77])

// ES6 的写法
Math.max(...[14, 3, 77])

// 等同于
Math.max(14, 3, 77);
```

## 替换 push

```
// ES5的 写法
var arr1 = [0, 1, 2];
var arr2 = [3, 4, 5];
Array.prototype.push.apply(arr1, arr2);

// ES6 的写法
let arr1 = [0, 1, 2];
let arr2 = [3, 4, 5];
arr1.push(...arr2);
```

## 应用

**【1】复制数组**

单层数据数组可实现深拷贝，如果是数组对象无法实现深拷贝。

**【2】合并数组**

**【3】与解构赋值结合**

```
const [first, ...rest] = [1, 2, 3, 4, 5];
first // 1
rest  // [2, 3, 4, 5]
```

**【4】字符串变为数组**

```
[...'hello']; // [ "h", "e", "l", "l", "o" ]
```

**【5】实现 Iterator 接口的对象**

任何定义了遍历器（`Iterator`）接口的对象都可以用扩展运算符转为真正的数组。

如`nodeList`、`Map`和`Set`、`Array`、`String`、`arguments`等。

---

# 判断[1,2]是否为数组的方法

**typeof 不能验证[1,2]是否为数组，返回的是'object'**

1. `Array.isArray`
2. `instanceof`
3. `prototype`
4. `constructor`
5. `apply`、`call`、`bind`

## 【1】Array.isArray

```
Array.isArray([1,2]) // true
```

## 【2】instanceof

```
[1,2] instanceof Array
```

来一下`instanceof`的具体实现方法

```
function instanceof(left, right) {
    // 获得类型的原型
    let prototype = right.prototype
    // 获得对象的原型
    left = left.__proto__
    // 判断对象的类型是否等于类型的原型
    while (true) {
        if (left === null)
            return false
        if (prototype === left)
            return true
        left = left.__proto__
    }
}
```

所以`[1,2].__proto__ === Array.prototype`也是可以验证是否为数组

## 【3】prototype

除了`[1,2].__proto__ === Array.prototype`之外，还有`Array.prototype.isPrototypeOf([1,2])`

## 【4】constructor

```
[1,2].constructor === Array
```

同上理

## 【5】apply、call、bind

```
({}).toString.apply([1,2]) === '[object Array]'
({}).toString.call([1,2]) === '[object Array]'
({}).toString.bind([1,2])() === '[object Array]'
```

# toString

将数组转换为字符串：

```
["Banana", "Orange", "Apple", "Mango"].toString();
// Banana,Orange,Apple,Mango
```

# toLocalString

```
[1,2,3,4,5].toLocaleString()
"1,2,3,4,5"
```

---

# 截取

1. `slice`
2. `splice`
3. `split`
4. `length`

## 【1】slice

截取数组一部分，并返回新数组，输入开始位置，结束位置

**不会改变原数组**

```
var arr = ['A', 'B', 'C', 'D', 'E', 'F', 'G'];
arr.slice(1,3);      //(2) ["B", "C"]

```

## 【2】splice

从数组中添加或删除元素

开始位置，个数，添加数据

**会改变原数组**

```
var arr = ['A', 'B', 'C', 'D', 'E', 'F', 'G'];
arr.splice(1,3);     //(3) ["B", "C", "D"]
```

插入数据：

```
myArray.splice(2,0,'插入数据');
```

## 【3】split：分隔

```
'a,b,c'.split(','); //
```

## 【4】length

```
[1,2,3,4,5,6,7].length = 2; // [1,2]
```

---

# 增加或删除

1. `push`和`pop`
2. `shift`和`unshift`
3. `concat`
4. `join`
5. `copyWithin`

## 【1】push 和 pop

- `push()`向`Array`的末尾添加若干元素;

- `pop()`则把`Array`的最后一个元素删除掉.

```
var arr = ['A', 'B', 'C', 'D', 'E', 'F', 'G'];
arr.push('h');       //['A', 'B', 'C', 'D', 'E', 'F', 'G','h'];
arr.pop();           //['A', 'B', 'C', 'D', 'E', 'F', 'G']
```

## 【2】shift 和 unshift

- `shift()`删除数组第一个数据；

- `unshift()`添加数姐第一个数据。

## 【3】concat

合并两个数组

```
var a = ['a','b'];
var b = ['c','d']
var c = a.concat(b);
c //(4) ["a", "b", "c", "d"]
```

## 【4】join

```
c.join(',');       //"a,b,c,d"
```

## 【5】copyWithin

复制指定值（数组中的值）到指定位置

```
//  将 3 号位复制到 0 号位
[1, 2, 3, 4, 5].copyWithin(0, 3, 4)
// [4, 2, 3, 4, 5]
```

---

# 排序

## sort

按 ascii 码排序

```
var arr = [23,122,1,53,231]
arr.sort(); // [1, 122, 23, 231, 53]
```

升序

```
var arr = [23,122,1,53,231];
arr.sort((a,b) =>  a - b); //[1, 23, 53, 122, 231]

```

**高级**

- 1. 原理

[Array.sort 原理](https://blog.csdn.net/coder_chenz/article/details/77156047)

v8 引擎的 sort 函数给出的排序方式：

Chrome 浏览器（`Webkit`）：`插入排序`和`快速排序`（如果数组长度小于 10 就用`插入排序`，大于 10 就用`快速排序`）。火狐浏览器（`Mozilla/Firefox`）：`归并排序`。

- 2. 返回值

`[23,122,1,53,231].sort((a,b) => a - b); //[1, 23, 53, 122, 231]`里面`return`的值是`a-b`，也就是**正数**和**负数**，不是`true/false`与`1/0`这样的`boolean`值。

![image](https://wx3.sinaimg.cn/large/0069qZtTgy1gnu39jl3cnj30fn0lf3zz.jpg)

## reverse

倒序

```
var arr = [23,122,1,53,231]
arr.reverse();       //(5) [53, 231, 23, 122, 1]
```

---

# 查询和过滤

1. `every`
2. `some`
3. `filter`
4. `indexOf`和`lastIndexOf`
5. `find`和`findIndex`
6. `includes`

## 【1】every

检查数组的每个元素是否符合条件

```
[12, 54, 18, 130, 44].every(val => val > 10)
//true
[12, 5, 8, 130, 44].every(val => val > 10)
//false
```

## 【2】some

检查是否有 1 个达到条件

```
[12, 54, 18, 130, 44].some(val => val > 10)
//true
[2, 5, 8, 3, 4].some(val => val > 10)
//false
```

## 【3】filter

找出所有符合条件的元素

```
[12, 5, 8, 130, 44].filter( num => num >10)
(3) [12, 130, 44]
```

例：过滤所有为 false 的值

```
const myArray = [1, undefined, NaN, 2, null, '@denicmarko', true, 3, false];
console.log(myArray.filter(Boolean)); // [1, 2, "@denicmarko", true, 3]
```

## 【4】indexOf 和 lastIndexOf

与`String`类似，`Array`也可以通过`indexOf()`来搜索一个指定的元素的位置：

```
var arr = [123,124,'124'];
arr.indexOf(124);    //1
```

注意了，数字 124 和字符串'124'是不同的元素。

## 【5】find 和 findIndex

```
[12, 5, 8, 130, 44].find(ele => ele>10)
//12
[12, 5, 8, 130, 44].findIndex(ele => ele === 8})
//2
```

## 【6】includes

返回是否有这个值

```
[1,2,3].includes(2)
//true
```

---

# 生成数组

## fill：填充

```
var arr = new Array(8).fill('2'); // ["2", "2", "2", "2", "2", "2", "2", "2"]
```

## of

```
new Array(3); // [empty × 3]
Array.of(3); // [3]
```

可用于回调函数生成数组。

---

# 遍历

1. `entries`
2. `fromEntries`
3. `values`
4. `keys`
5. `map`
6. `forEach`
7. `reduce`
8. `reduceRight`

## 【1】entries

返回迭代器，一般和`next`一起使用

`['a', 'b', 'c'].entries().next().value`

## 【2】fromEntries

将键值对数组转为对象

```
const map = new Map().set('foo', true).set('bar', false);
Object.fromEntries(map)
```

## 【3】values

和 entries 异曲同工返回迭代器，一般和`next`一起使用

`['a', 'b', 'c'].values().next().value`

## 【4】keys

数组里的下标

`[...['a', 'b', 'c'].keys()]`

## 【5】map

遍历，**返回新数据**，对原数组不影响。

原来的写法：

```
for(var i in list){
    list[i].type = 1
}

```

优化后：

```
var newList = list.map(item => {
    item.type = 1;
    return item;
})

或

list.map(item => {
    item.type = 1;
})
var newList = list;

```

当数组是数字时：

```
var arr = [4, 9, 16, 25];
var brr = arr.map(val => val+1);
brr; // [5, 10, 17, 26]
arr; // [4, 9, 16, 25]
```

当数组是对象时：

```
var arr = [{name:'小明'},{name:'小红'}];
var brr = arr.map(val=> val.sex = 1);
var crr = arr.map(val => {val.age = 18;return val});
arr; // [{name:'小明', sex: 1, age: 18},{name:'小红', sex: 1, age: 18}]
brr; // [1, 1]
crr; // [{name:'小明', sex: 1, age: 18},{name:'小红', sex: 1, age: 18}]
```

可以看到，arr 原数组表面上是已经被改变的了，实际上是对象的引用，所以在 map 里面改变，会导致新值和旧值都改变。

**合并 2 个对象**

```
var arr = [{id:1,val: 3},{id:2,val: 5},{id:3,val:9}];
var brr = [{id:1,val: 13},{id:2,val: 15}];
arr.map( v => {
    brr.map( b => {
        if(v.id == b.id) {
            v.val = b.val;
        }
    })
    return v;
})
```

## 【6】forEach

遍历，每个元素执行回调函数，**返回 undefined**。

**forEach 跳出循环**

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
```

`forEach`是函数，不是语法，因此没有直接`break`的语法。如果要中止，可使用 `Array.every` 或 `Array.some`。

普通的`for`循环可以用`break`终止。

## 【7】reduce

将数组计算为一个值

原来写法：

```
var numbers = [15.5, 2.3, 1.1, 4.7];
let total = 0;
numbers.forEach(val => {
    total += val;
})
console.log(total); // 23.6
```

reduce 写法：

```
var numbers = [15.5, 2.3, 1.1, 4.7];

function getSum(total, num) {
    return total + num;
}

console.log(getSum,0); // 23.6
```

或：

```
[15.5, 2.3, 1.1, 4.7].reduce((x,y) => x+y) // 23.6
```

reduce 计算数组对象的和：

```
var arr = [{id:1,num:3},{id:2,num:5},{id:5,num: 8}];
var total = arr.reduce((total,next) =>{
    return total + next.num;
},0)
total; // 16
```

## 【8】reduceRight

用法上同，区别是从后往前。

---

# from

## 将类数组对象或可遍历对象变成真正的对象。

```
let arrayLike = {
0: 'tom',
1: '65',
2: '男',
3: ['jane','john','Mary'],
'length': 4
}
let arr = Array.from(arrayLike)
console.log(arr) // ['tom','65','男',['jane','john','Mary']]
```

同扩展运算符一样，只要是部署了 Iterator 接口的数据结构，Array.from 都能将其转为数组。区别在于`Array.from`还能转换类数组对象。

比如该类数组对象就只能用`Array.from`转换成数组，不能用`扩展运算符`转换。

其它情况则不会改变，会变成`[ undefined, undefined, undefined, undefined ]`。

## Set 变为数组

```
Array.from(new Set([1,3,3,4])) //[1, 3, 4]
```

还能带参数

```
Array.from(new Set([1,3,3,4]), item => item + 1) //[2, 4, 5]
```

## 字符串变为数组

```
Array.from('hello') // ["h", "e", "l", "l", "o"]
```

---

# 数组扁平化

1. `flat()`
2. 序列化后正则
3. 递归
4. `reduce()`递归
5. 迭代 + 展开运算符
6. `toString()`

## 【1】`flat()`和`flatMap()`

[学习链接](https://blog.csdn.net/qq_29055201/article/details/86530254)

### flat

拉平数组，默认一层，填几就拉平几层嵌套，如果想拉平所有的，用`Infinity`

```
[1, 2, [3, [4, 5]]].flat()
// [1, 2, 3, [4, 5]]
[1, 2, [3, [4, 5]]].flat(2)
// [1, 2, 3, 4, 5]
[1, [2, [3]]].flat(Infinity)
// [1, 2, 3]
```

### flatMap

与 map 类似，不同的是可以拉平数组，但只能拉平一层，不能多层。

```
[1,[2,[3],4,5],6,[7],8].flatMap(v => v*2)
(5) [2, NaN, 12, 14, 16]
```

## 【2】序列化后正则

```
const arr = [1, [1,2], [1,2,3]];
var str = JSON.stringify(arr).replace(/(\[|\])/g,'');
var list = `[${str}]`;
var result = JSON.parse(list);
```

## 【3】递归

```
const arr = [1, [1,2], [1,2,3],[1,2,[3,4]]];
function flat(arr) {
    let result = [];
    for(let i of arr){
        i instanceof Array ? result = result.concat(flat(i)) : result.push(i);
    }
    return result;
}
flat(arr);
```

## 【4】`reduce()`递归

```
const arr = [1, [1,2], [1,2,3],[1,2,[3,4]]];
function flat(arr) {
    return arr.reduce((prev,cur) => {
        return prev.concat(cur instanceof Array ? flat(cur) : cur);
    }, [])
}
flat(arr);
```

## 【5】迭代 + 展开运算符

```
let arr = [1, [1,2], [1,2,3,[4,4,4]]]
while (arr.some(Array.isArray)) {
  arr = [].concat(...arr);
}
console.log(arr)
```

## 【6】`toString()`

```
const arr = [1, [1,2], [1,2,3,[4,4,4]]];
var strArr = arr.toString().split(',');
```

---

# 取出数组中最大的数值

`Math.max(...[14, 3, 77])`

---

# `arguments`参数的 3 种转数组方法

**方法 1：Array.prototype.slice.apply** **方法 2：Array.from** **方法 3：[...arguments]**

```
var test3 = function(){
    console.log(arguments);
    var list1 = Array.prototype.slice.apply(arguments);
    console.log(list1);
    var list2 = Array.from(arguments);
    console.log(list2);
    var list3 = [...arguments];
    console.log(list3);
}
test3(1,2,3,4);
```

![image](https://wx2.sinaimg.cn/mw690/0069qZtTgy1ghdl1udru0j309o068dfy.jpg)

<img src="https://wx2.sinaimg.cn/mw690/0069qZtTgy1ghdl1udru0j309o068dfy.jpg"/>

<img src="https://wx2.sinaimg.cn/mw690/0069qZtTgy1ghdl1udru0j309o068dfy.jpg" referrerpolicy=”no-referrer”/>
