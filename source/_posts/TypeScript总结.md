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

// 类型别名
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

# 接口

## 定义接口

```
interface Girl {
    name: string;
    age: number;
    bust: number
}

const getResume = (girl: Girl) => {
    console.log(girl.name);
}

const xh = {
    name: '小红',
    age: 19,
    bust:38
}

getResume(xh);
```

## 接口(`interface`)和类型别名(`type`)的区别

- 类型别名可以直接给类型，比如`string`，但接口必须给对象。

## 接口定义非必填值`?:`

语法：`?:`

```
interface Girl {
    name: string;
    age: number;
    bust ?: number
}
```

## 接口允许加入任意值`[anyname:string]:any;`

语法：`[anyname:string]:any;`

`string`的意思是对象名是string类型，`any`的意思是对象值是任意类型。

```
interface Girl1 {
    name: string;
    age: number;
    bust ?: number;
    [anyname:string]: any;
}
const xh = {
    name: '小红',
    age: 19,
    sex:'女',
    hobby:'兴趣',
    year:22
}
```

## 接口里定义方法

语法：`fun(): type`

比如：`say(): string;`代表`say`方法返回`string`类型的值。

```
interface Girl1 {
    name: string;
    age: number;
    bust ?: number;
    [anyname:string]: any;
    say(): string;
}
const xh = {
    name: '小红',
    age: 19,
    sex:'女',
    hobby:'兴趣',
    year:22,
    say(){
        return 'hello World!';
    }
}
```

## 类实现接口

类实现接口时必须把**所有**要必填的属性和方法实现，否则就会报错。

错误的：
```
class XiaoJieJie implements Girl{
}
```

正确的：
```
class XiaoJieJie implements Girl{
    name = '小红';
    age = 12;
    bust= 90;
    say(){
        return '你好'
    }
}
console.log(XiaoJieJie)
```

## 接口继承接口

重点：

- `interface...extends`；
- `function`里面的约束定型改为新接口名；
- 新的对象里面除了原接口约束的属性，也要把新的属性加上。

```
interface Teacher extends Girl {
    teach():string;
}

const getResume2 = (girl: Teacher) => {
    ...
    girl.teach();
}

const girl2 = {
    ... // girl的所有属性
    teach(){
        return 'hello';
    }
}

getResume2(girl2);
```

## 自我总结

接口更像是一种约束，约束用户的对象的属性类型。

# 类

## 继承与重写

```
class Lady {
    content = 'hello world!';
    sayHello () {
        return this.content
    };
}

class XiaoJieJie extends Lady {
    sayLove () {
        return 'I love you.'
    };
    sayHello () {
        return super.sayHello() + ' 你好！';
    }
}
```

JAVA中类的继承

```
class Animal{
    public void move(){
        System.out.println("动物可以移动");
    }
}
  
class Dog extends Animal{
    @Override // 表示方法重写
    public void move(){
        super.move(); // 引用父类的方法
        System.out.println("狗可以跑和走");
    }
}
```

区别：
- java中要用到`@Override`标签

**@Override标签的作用与好处**

- 它是伪代码，表示方法重写
- 作为注释，帮助检查是否正确复写了父类中已有的方法
- 编译器可以验证该方法是否在父类中已有
- 非必填。如果没写@Override，方法名与父类一模一样，如果返回类型相同，视为重写，反之，视为新方法

## 访问类型

### public

默认就是它

### private

私有，只有自己能用。

```
class Lady {
    private content = 'hello world!';
    private privateFn () {
        return 'private' + this.content; // 能用
    };
}
class XiaoJieJie extends Lady {
    privateFn() { // 编译不通过
        return 'e';
    };
}
console.log(new Lady().privateFn()); // 编译不通过
```

### protected

受保护，只能在自己及子类用。

```
class Lady {
    protected protectedFn () {
        return 'protected';
    };
}

class XiaoJieJie extends Lady {
    protectedFn () {
        return 'xj';
    }
}

console.log(new Lady().protectedFn()); // 编译不通过
```

### 对比表

|类型|public|protected|private|
|:--:|:--:|:--:|:--:|
|自己（父类）|✓|✓|✓|
|继承（子类）|✓|×|×|
|外部（`new Class().fun()`）|✓|✓|×|

附：JAVA异同表

|类型|public|protected|private|
|:--:|:--:|:--:|:--:|
|自己（父类）|✓|✓|✓|
|继承（子类）|✓|✓|×|
|外部（`new Class().fun()`）|✓|×|×|

## 构造函数

### 构造函数及继承

```
class People {
    constructor (public name: string,public sex:string) {
        this.name = name;
        this.sex = sex;
    }
}

class Teacher extends People {
    constructor (public age:number){
        super('小明','女');
    }
}

var people = new People('小红','女');
console.log(people.name)

var teacher = new Teacher(19);
console.log(teacher,teacher.age);
```

ES6实现对比：
```
class People {
    constructor (name,sex) {
        this.name = name;
        this.sex = sex;
    }
}

class Teacher extends People {
    constructor (name,sex,age){
        super(name,sex);
        this.age = age;
    }
}

var people = new People('小红','女');
console.log(people.name)

var teacher = new Teacher('小明','女',19);
console.log(teacher,teacher.age);
```

JAVA实现对比：
```

class People {
    public String name;
    public int sex;
    public People (String name){System.out.println(name)};
    public People (int sex ){};
    public People (Stirng name, int sex){}
    public People (){}
}

public class Teacher extends People {
...
}
```

## get和set

```
class XiaoJieJie {
    constructor(private _age:number,private _name: string){
    }
    get age(){
        return this._age-2;
    };
    set age(age:number){
        this._age = age;
    }
    get name(){
        return this._name+'人';
    };
    set name(name:string){
        this._name = name;
    }
}

const xj =  new XiaoJieJie(18,'小明');
console.log(xj,xj.age); // XiaoJieJie { _age: 18, _name: '小明' } 16
```

编译如果无法通过需要加上es5：

```
tsc demo.ts -t es5
node demo.js
```

java中

```
class Stutent1{
    private String name;
    private int age;
    public String getName() {
        return name;
    }
    public void setName(String name) {
        this.name = name;
    }
    public int getAge() {
        return age;
    }
    public void setAge(int age) {
        this.age = age;
    }
    public void showStu1(){
        System.out.println("学生叫做"+name+",年龄"+age);
    }
}
```

## static装饰符

不用new新建就可以创建

```
class Girl {
    static sayLove(){
        return '你好';
    }
}

console.log(Girl.sayLove());
```
不用new Girl()就可以调用方法了。

## 只读属性readonly

```
class XiaoJieJie {
    constructor(private readonly _age:number,private _name: string){
    }
    get age(){
        return this._age-2;
    }
    set age(age:number){ // 报错
        this._age = age;
    }
    get name(){
        return this._name+'人';
    };
    set name(name:string){
        this._name = name;
    }
}

const xj =  new XiaoJieJie(18,'小明');
xj.name = '小红';
xj.age = 33; // 报错
console.log(xj,xj.age);
```

## 抽象类

### 不加abstract时

特点：

- 普通的类继承
- 普通的重写
- 可以调用父类

```
class Girl {
    skill(){
        conso.log('skill)
    }
}

class Girl1 extends Girl {
    skill(){
        console.log('cooking');
    }
}

class Girl2 extends Girl {
    skill(){
        console.log('make cloths')
    }
}

class Girl3 extends Girl {
    skill(){
        console.log('do gardening')
    }
}

console.log(new Girl1().skill())
console.log(new Girl2().skill())
console.log(new Girl3().skill())
console.log(new Girl().skill())

```

### 加abstract关键字时

特点：

- 不能调用父类
- abstract方法不能有具体实现内容

```
abstract class Girl {
    abstract skill()
}

class Girl1 extends Girl {
    skill(){
        console.log('cooking');
    }
}

class Girl2 extends Girl {
    skill(){
        console.log('make cloths')
    }
}

class Girl3 extends Girl {
    skill(){
        console.log('do gardening')
    }
}

console.log(new Girl1().skill())
console.log(new Girl2().skill())
console.log(new Girl3().skill())

```

区别：写了`abstract`关键字就是抽象类，如果不加，就是`重写（Override）`，也视为多态。


### 多态

多态是同一个行为具有多个不同表现形式或形态的能力。
比如打印机有打印方法，彩色打印机类打印方法是彩色，黑色打印机类打印方法是黑色。

java中多态的实现方式

- 方式一：重写
- 方式二：接口
- 方式三：抽象类和抽象方法

```
abstract class Animal {  
    abstract void eat();  
}  
  
class Cat extends Animal {  
    public void eat() {  
        System.out.println("吃鱼");  
    }  
    public void work() {  
        System.out.println("抓老鼠");  
    }  
}  
  
class Dog extends Animal {  
    public void eat() {  
        System.out.println("吃骨头");  
    }  
    public void work() {  
        System.out.println("看家");  
    }  
}
```

其它：写了`abstract`关键字就是抽象类，如果不加，就是`重写（Override）`，也视为多态。

# 配置项tsconfig.json

`tsconfig.json`为配置文件，该配置文件通过`tsc --init`命令行来生成。

## include、exclude、files

直接在命令行输入`tsc`不带任何文件的话会默认编译所有文件。

`include`属性是用来指定要编译的文件

```
{
  "include":["demo.ts"],
  "compilerOptions": {
      //any something
      //........
  }
}
```

`exclude`属性是用来指定不要编译的文件

```
{
  "exclude":["demo.ts"],
  "compilerOptions": {
      //any something
      //........
  }
}
```

`files`属性是用来指定要编译的文件，和`include`相同

```
{
  "files":["demo.ts"],
  "compilerOptions": {
      //any something
      //........
  }
}
```
## compilerOptions配置

- `removeComments`：编译文件是否显示注释
- `static`：是否按严格模式编译和书写
- `nolmplicitAny`：是否允许注解类型any不用声明
- `strictNullChecks`：是否允许非空检查
- `rootDir`：项目文件夹
- `outDir`：编译文件夹

# 联合类型和类型保护

## 联合类型

```
interface Waiter {
    anjiao: boolean,
    say:()=>{}
}

interface Teacher {
    anjiao: boolean,
    skill:()=>{}
}

function test(animal: Waiter | Teacher){})
```

上例就是联合类型，`function test(animal: Waiter | Teacher){animal.say()})`会报错，所以需要类型保护。

## 类型保护-类型断言

根据具体的值来断言用哪个接口

```
function test(animal: Waiter | Teacher){
    // 方法一：类型断言：根据某个值来判断用哪个方法
    if(animal.anjiao){
        console.log((animal as Waiter).say());
    } else {
        console.log((animal as Teacher).skill());
    }
}
```

## 类型保护-in语法

判断在对象中是否存在该方法

```
function test(animal: Waiter | Teacher){
    // 方法二：in语法：判断在对象中是否存在该方法
    if('skill' in animal){
        console.log(animal.skill());
    } else {
        console.log(animal.say());
    }
}

```

## 断言和in的实例

```
interface Waiter {
    anjiao: boolean,
    say:()=>{}
}

interface Teacher {
    anjiao: boolean,
    skill:()=>{}
}

function test(animal: Waiter | Teacher){
    // 方法一：类型断言：根据某个值来判断用哪个方法
    if(animal.anjiao){
        console.log((animal as Waiter).say());
    } else {
        console.log((animal as Teacher).skill());
    }
    // 方法二：in语法：判断在对象中是否存在该方法
    if('skill' in animal){
        console.log(animal.skill());
    } else {
        console.log(animal.say());
    }
}

const xiaohong : Teacher = {
    anjiao: false,
    skill(){
        return '你好';
    }
}
const xiaoming : Waiter = {
    anjiao: true,
    say(){
        return 'hello';
    },
    
}

test(xiaohong);
test(xiaoming);
```

## 类型保护-typeof语法

判断是不是不同的类型

```
function add(first: string | number, second: string | number){
    if(typeof first == 'string' || typeof second == 'string'){
        return `${first}${second}`;
    }
    return first + second;
}
console.log(add(1,'2')) // 12
console.log(add(1,2)) // 3
```

## 类型保护-instanceof语法

```

class NumberObj{
    count: number
}

function addObj(first: object , second: object | NumberObj) {
    if (first instanceof NumberObj && second instanceof NumberObj) {
        return first.count + second.count;
    }
    return 0;
}

// 当是普通object时
const obj1 : {
    count: number
} = {
    count: 1
}
const obj2 : {
    count: number
} = {
    count: 3
}
console.log(addObj(obj1,obj2)) // 0


// 当是NumberObj对象时
const obj3 = new NumberObj();
obj3.count = 45;
const obj4 = new NumberObj();
obj4.count = 435;
console.log(addObj(obj3,obj4)) // 480
```