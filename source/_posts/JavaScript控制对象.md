---
title: JavaScript控制对象
date: 2020-09-18 18:50:17
categories: 
- program
---

# 使用getter与setter控制属性访问

```
function Ninja() {
    let skillLevel;
    this.getSkillLevel = () => {
        console.log('get')
        return skillLevel;
    }
    this.setSkillLevel = value => {
        console.log('set');
        skillLevel = value;
    }
}
const nijia = new Ninja();
nijia.setSkillLevel(100)
console.log(nijia, nijia.getSkillLevel() == 100);
```

## 定义getter与setter

在JavaScript中，可以通过两种方式定义getter和setter：

- 通过对象字面量定义，或在ES6的class中定义。
- 通过使用内置的Object.defineProperty方法。

```
const ninjaCollection = {
    ninjas: ['a','b','c'],
    get firstNinja(){
        console.log('get');
        return this.ninjas[0];
    },
    set firstNinja(value){
        console.log('set');
        this.ninjas[0] = value;
    }
}
console.log(ninjaCollection);
```

### 在ES6的class中使用getter和setter

```
class NinjoCollection {
    constructor(){
        this.ninjas = ['a','b','c'];
    }
    get firstNinja() {
        console.log('get');
        return this.ninjas[0];
    }
    set firstNinja(value) {
        console.log('set');
        this.ninjas[0] = value;
    }
}
const ninjiaoCollectionClass = new NinjoCollection();
console.log(ninjiaoCollectionClass.firstNinja === 'a');
ninjiaoCollectionClass.firstNinja = 'hello';
console.log(ninjiaoCollectionClass.firstNinja);
```

### Object.defineProperty

控制私有变量，下例中_skillLevel是私有的，skillLevel是公有的。
```
function Ninja() {
    let _skillLevel = 0;
    Object.defineProperty(this, 'skillLevel', {
        get: () => {
            console.log('get');
            return _skillLevel;
        },
        set: value => {
            console.log('set');
            _skillLevel = value;
        }
    })
}
const ninja = new Ninja();

console.log(typeof ninja._skillLevel);
```

## 使用getter与setter检验属性

```
function Ninja() {
    let _skillLevel = 0;
    Object.defineProperty(this, 'skillLevel', {
        get: () => {
            console.log('get');
            return _skillLevel;
        },
        set: value => {
            console.log('set');
            if(!Number.isInteger(value)){
                throw new TypeError('必须为整数!')
            }
            _skillLevel = value;
        }
    })
}

try {
    const ninja = new Ninja();
    ninja.skillLevel = 23.3;
} catch (error) {
    console.log(error)
}
```

## 使用getter与setter定义如何计算属性值

```
const nameObj = {
    name: 'a',
    clan: 'b',
    get fullTitle(){
        return this.name + '-' + this.clan;
    },
    set fullTitle(value){
        const segments = value.split(" ");
        this.name = segments[0];
        this.clan = segments[1];
    }
};
console.log(nameObj.name == 'a');
```


# 使用代理控制访问