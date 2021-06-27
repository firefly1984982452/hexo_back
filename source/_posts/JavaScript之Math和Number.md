---
title: JavaScript之Math和Number
date: 2020-06-05 11:19:32
categories: 
- program
---

# Math

## 取整相关

```
// sign 返回正数或是负数
Math.sign(9); // 1
Math.sign(-8); // -1
Math.sign(0); //0
Math.sign(-0); //-0
Math('ee'); //NaN

// trunc 取整，只取小数点前的数字不管正负，不管四舍五入
Math.trunc(9.9); // 9
Math.trunc(-8.7); // -8

Math.round(4.5); //5 四舍五入(无小数)
Math.ceil(4.1); //5 只要小数点后面大于0，整数值都+1（按最大的取）

Math.floor(4.9); // 4
Math.floor(-4.1); // -5 按最小的取

12.899.toFixed(2); // 12.9 四舍五入（有小数）
```

## 返回数组中最大值

`Math.max(...[1,2,3])` // 3

## 返回数组中最小值

`Math.min(...[1,2,3])` // 1

## 随机数

默认返回0~1

`Math.random()` 

返回指定范围（5~24）：

`Math.randow()*(24-5)+5`

## 随机整数

```
Math.floor(Math.random() * number)
```

## 最大最小数

`Math.max`
`Math.min`

## 次方

`Math.pow(2, 3)`代表 2的3 次方

## 取随机字符串

先转为16进制，再去掉前两位小数点

`Math.random().toString(16).subString(2)`

---

# number

## isFinite 是否为数字型

之前判断一个值是否为数字类型都是用`typeof`，此处的 `isFinite`也有同样的效果

```
typeof 1.2 ; // 'number'
Number.isFinite(1.2) ; // true
```

## isInteger 是否为整数

判断是否为整数

`Number.isInteger(13)`

## isNaN 是否为NaN

`window.isNaN`和`Number.isNaN`的区别

- `window.isNaN`：能否转换为数字
- `Number.isNaN`：是否`NaN`

```
//isNaN
console.log(isNaN(null));            //false
console.log(isNaN(true));            //false
console.log(isNaN(false));           //false
console.log(isNaN(0));               //false
console.log(isNaN(undefined));       //true
console.log(isNaN("AB"));            //true
console.log(isNaN({a: 1}));          //true
console.log(isNaN(NaN));             //true

//Number.isNaN
console.log(Number.isNaN(null));      //false
console.log(Number.isNaN(true));      //false
console.log(Number.isNaN(false));     //false
console.log(Number.isNaN(0));         //false
console.log(Number.isNaN(undefined)); //false
console.log(Number.isNaN("AB"));      //false
console.log(Number.isNaN({a: 1}));    //false
console.log(Number.isNaN(NaN));       //true
```

## 安全范围

整数的操作有一个安全范围，即2的53次方。

`Math.pow(2, 53) - 1 = 9007199254740991`

`Number.MAX_SAFE_INTEGER`：最大安全范围

`Number.MIN_SAFE_INTEGER`：最小安全范围

`Number.isSafeInteger(12)`：是否在安全范围内

## 数值转换

```
+'404'
Number();
parseInt();
parseFloat();

Number('3e'); // NaN
parseInt('3e'); // 3
```

## 取整转换

```
parseInt('0x10'); // 16
```

---

# 保留小数点后两位

## 四舍五入

```
parseFloat((a).toFixed(2));//toFixed只能针对数字类型才能使用
```

## 非四舍五入

```
var b = parseFloat(price).toFixed(3);
this.all_price = b.substring(0,b.toString().length - 1);
```

---

# Number分隔符`_`

```
const largeNumber = 1_000_000_000;

console.log(largeNumber); // 1000000000"
```