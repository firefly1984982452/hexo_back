---
title: TypeScript总结
date: 2020-09-01 18:50:17
categories: 
- program
---

[链接](https://jspang.com/detailed?id=66#toc28)

# 安装及使用

## 安装

```
npm install typescript -g
```
或
```
yarn global add typescript
```

## 使用

**新建`demo.ts`：**

```
function test() {
    let web: string="hello world"
    console.log(web);
}
test();
```

**编译：**

```
tsc temo.ts
node temo.js
```

**或**

```
npm install -g ts-node
```
安装成功后：
```
ts-node Demo1.ts
```

# 静态类型

被定义后就不可改变该亦是的类型了。

js是弱类型语言，可以被改变。

## 基本使用

```
// 定义count是number类型
const count : number = 1; 
count = 'hello'; // 此时改变类型为string就会报错编译不通过
```

## 自定义静态类型

```
interface XisoJieJie {
    uname: string,
    age: number
}
const xh : XisoJieJie = {
    uname: '小红',
    age: 15
}
console.log(xh);
```

## 基础静态类型和对象类型

### 静态类型

`null`,`undefinde`,`symbol`,`boolean`，`void`等。

### 对象类型

- 对象类型
- 数组类型
- 类类型
- 函数类型

**对象类型**
```
const xiaoJieJie: {
    name: string,
    age: number
} = {
    name: '小明',
    age: 14
}
console.log(xiaoJieJie.name)
```

**数组类型**
```
const arr : number [] = [1,2,3];
const xiaoJieJies : String [] = ['小明','小红','小黄'];
console.log(xiaoJieJies)
```

**类类型**
```
class Person{}
const xm : Person = new Person();
console.log(xm);
```

**函数类型**
```
const j : () => string = ()=> {return '小明'};
console.log(j);
```

# 类型注释和类型推断

## 类型注释

```
let count : number; 
count = 123
```

## 类型推断

```
let countInference = 123
```

这时编辑器和编译器都会推断出是number类型。

# 函数参数和返回类型定义

## 类型定义

**无定义时：**

```
function getTotal(one : number, two :number){
    return one + two
}
const total = getTotal(1,2)
```

虽然能推断出是返回number，但这样不规范。

**定义时：**

```
function getTotal(one : number, two :number) : number{
    return one + two
}

const total = getTotal(1,2)
```

**无需return时：void**

```
function sayHello(){
	console.log('hello world!);
}
```

**异常或死循环：never返回值类型**

异常：

```
 function errorFuntion() : never{ 
    throw new Error()
    console.log('Hello World')
 }
```

死循环：

```
 function forNever() : never{
     while(true){}
     console.log('Hello JSPang')
 }
```

## 函数参数为对象（解构）时

TS函数参数解构：

```
function add ({one, two} : {one: number, two: number}) {
    return one + two;
}
const three = add({one:1,two:3});

console.log(three); // 4
```

ES6函数参数解构：

```
function add({x,y} = {}){
    return x+y;
}
var sum = add({x:3,y:5});
console.log(sum); // 8
```

# 数组

## 各种类型

```
const numberArr : number [] = [1,2,3];

const stringArr : string [] = ['a','b','c'];

const undefinedArr : undefined [] = [undefined, undefined];

const emptyArr : null [] = [null,null];

const arr : (number | string) [] = [1,'a',1,2,'b'];

type Lady = {name: string, age: number};
const xiaoJieJies: Lady[] = [{
    name: '小明',age:14
},{
    name: '小红', age: 35
}]

class Lady1  {name: string;age: number};
const xiaoJieJies1: Lady1[] = [{
    name: '小明',age:14
},{
    name: '小红', age: 35
}]
```

`type`和`class`的区别是`class`会编译出来，`type`会忽略。

# 元组

```
// 无约束
const arr1 : (number | string) [] = [1,'a',1,2,'b'];

// 有约束
const arr2 : [string,string,number] = ['a','b',3];
```