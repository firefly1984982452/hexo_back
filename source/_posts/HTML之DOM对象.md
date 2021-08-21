---
title: HTML之DOM对象
date: 2021-07-12 17:44:34
categories:
  - program
---

# 一、链接

- [菜鸟教程](https://www.runoob.com/jsref/dom-obj-document.html)

# 二、DOM 元素对象

## scrollLeft

向左滑动

```
this.$refs.scrollUl.scrollLeft = 100
```

# 三、DOM 事件对象

## 【1】鼠标对象

- `oncontextmenu`：右击
- `ondblclick`：双击

- `onclick`：单击（松开鼠标）
- `onmousedown` 鼠标按钮被按下（并未松开鼠标时）
- `onmouseup` 鼠标按键被松开（松开鼠标，优先于`onclick`事件）

- `onmouseenter` 移入
- `onmouseleave` 移出
- `onmousemove` 鼠标被移动。
- `onmouseover` 移入（支持冒泡）
- `onmouseout` 移出（支持冒泡）

◆ `onclick`、`onmousedown`、`onmouseup`鼠标点击的区别

```
<p onmousedown="console.log(1)" onmouseup="console.log(2)" onclick="console.log(3)">
  点击后勿松开，然后松开后查看先后顺序
</p>
```

◆ `onmouseenter`、`onmousemove`、`onmouseover`鼠标移入移出的区别

```
<!DOCTYPE html>
<html>

<head>
	<style>
		div {
			width: 100px;
			height: 100px;
			border: 1px solid black;
			margin: 10px;
			float: left;
			padding: 30px;
			text-align: center;
			background-color: lightgray;
		}

		p {
			background-color: white;
		}
	</style>
</head>

<body>
	<h3>该实例演示了 onmousemove, onmouseenter 和 onmouseover 的不同。</h3>
	<p> onmousemove 事件在鼠标移动到 div 元素上时触发。</p>
	<p> mouseenter 事件中有在鼠标指针进入 div 元素时触发。 </p>
	<p> onmouseover 事件在鼠标指针进入 div 元素时触发,在子元素上也会触发(p 和 span)。</p>
	<div onmousemove="myMoveFunction()">
		<p>onmousemove: <br> <span id="demo">鼠标移动到我这!</span></p>
	</div>
	<div onmouseenter="myEnterFunction()">
		<p>onmouseenter: <br> <span id="demo2">标移动到我这!</span></p>
	</div>
	<div onmouseover="myOverFunction()">
		<p>onmouseover: <br> <span id="demo3">标移动到我这!</span></p>
	</div>
	<script>
		var x = y = z = 0;
		function myMoveFunction() {
			document.getElementById("demo").innerHTML = z += 1;
		}
		function myEnterFunction() {
			document.getElementById("demo2").innerHTML = x += 1;
		}
		function myOverFunction() {
			document.getElementById("demo3").innerHTML = y += 1;
		}
	</script>
</body>

</html>
```

# Dcoument 对象集合

- all
- forms
- images
- links

---

# 域名、地址

- domain
- documentURI
- baseURI
- URL

---

# cookie

---

# title：名称

---

# visibilityState 和 hidden：页面隐藏状态

```
document.addEventListener('visibilitychange', function () {
  console.log(document.hidden,document.visibilityState)
  // 用户离开了当前页面
  if (document.visibilityState === 'hidden' || document.hidden === true) {
    document.title = '页面不可见';
  }

  // 用户打开或回到页面
  if (document.visibilityState === 'visible' || document.hidden === false) {
    document.title = '页面可见';
  }
});
```

区别

- `document.hidden`返回是否隐藏，只返回`true`和`false`；
- `document.visibilityState`返回具体状态，有`hidden`、`visible`、`prerender`（正在渲染中）。

---

# referrer：上一页地址

返回上一页的地址，可以处理如移动端直接进入到详情页时，用`history.go(-1)`和`history.back()`无效时可用`document.referrer`。

[直接进入此详情页时点返回会返回到首页](https://m.qidian.com/author/402631776)

```
if(document.referrer === '') {
  window.location.href = 'https://www.baidu.com/'
} else {
  history.back();
}
```

---

# 获取对象

- getElementById()
- getElementsByClassName()
- getElementsByName()
- getElementsByTagName()
- querySelector()
- querySelectorAll()

---

# 写入

- write()
- writeln()

---

# 状态监听

- addEventListener()
- removeEventListener()

## addEventListener

- `addEventListener`监听中第三个参数配置`once`可以只监听一次

```
window.addEventListener('click', () => {
  console.log('click')
}, { once: true })
```

---

# 创建元素、节点

- createElement()
- createTextNode()

---

# console 对象

## 链接

- [学习链接 1](https://markodenic.com/use-console-log-like-a-pro/)
- [学习链接 2](https://segmentfault.com/a/1190000004528137)
- [效果预览](https://firefly1984982452.github.io/my-web-page/console.html)
- [源码](https://github.com/firefly1984982452/my-web-page/blob/master/console.html)

## 方法及属性

- clear：清除
- %c：样式更改
- %s：字符串替换
- %i、%d：整数替换
- %o、%O：对象替换
- info、error、warn：模式
- count：次数
- dir、dirxml：属性的交互列表
- table：过滤筛选
- assert：失败时才显示的信息
- time：时间差
- group：组
- trace：追踪根源
- profile：性能分析

## 源码

```
<!DOCTYPE html>
<html lang="en">

<head>
	<meta charset="UTF-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<title>Document</title>
</head>

<body>
	<h1>打开<kbd>F12</kbd>查看console控制台信息</h1>
	<script>
		console.clear()
		console.log('%c 【clear】', 'font-size: 2em;color:#f00');

		console.log('%c 【%c、%s、%i、%d、%o、%O】', 'font-size: 2em;color:#f00');
		console.log('%d + %i = %s', '3', 2, 'hello');
		console.log('%o和%O都是个对象', { a: 3 }, { a: 4 });
		console.log('%c 自定义样式。如：ERROR', 'color:#0f0');
		console.log('\n');
		console.log('\n');

		console.log('%c 【info、error、warn】', 'font-size: 2em;color:#f00');
		console.info('info【firefox浏览器下有明显样式变化】')
		console.error('error')
		console.warn('warn')
		console.log('\n');
		console.log('\n');

		console.log('%c 【count】', 'font-size: 2em;color:#f00');
		console.count('a')
		console.count('a')
		console.count('b')
		console.log('\n');
		console.log('\n');

		console.log('%c 【dir、dirxml】', 'font-size: 2em;color:#f00');
		console.log({ f1: 'foo', f2: 'bar' })
		console.dir({ f1: 'foo', f2: 'bar' })
		console.log(document.body)
		console.dirxml(document.body)
		console.dir(document.body)
		console.log('\n');
		console.log('\n');

		console.log('%c 【table】', 'font-size: 2em;color:#f00');
		var arr = [{ name: 'a', number: 89 }, { name: 'b', number: 73 }, { name: 'c', number: 454 }, { name: 'd', number: 2436 }]
		console.table(arr)
		console.table(arr, ['name'])
		console.log('\n');
		console.log('\n');

		console.log('%c 【assert】', 'font-size: 2em;color:#f00');
		console.assert(true, '条件成立时不会显示')
		console.assert(false, '条件不成立时才会显示')
		console.log('\n');
		console.log('\n');

		console.log('%c 【time】', 'font-size: 2em;color:#f00');
		console.time("时间差");
		var array = new Array(1000);
		for (var i = array.length - 1; i >= 0; i--) {
			array[i] = new Object();
		};
		console.timeEnd("时间差");
		console.log('\n');
		console.log('\n');


		console.log('%c 【group】', 'font-size: 2em;color:#f00');
		console.group('father')
		console.log('test');
		console.group('child')
		console.log('test-child');
		console.groupEnd('child')
		console.groupEnd('father')

		console.groupCollapsed('collapsed')
		console.log('test-collapsed');
		console.error('error');
		console.groupEnd()
		console.log('\n');
		console.log('\n');

		console.log('%c 【trace】', 'font-size: 2em;color:#f00');
		function fn1() {
			function fn2() {
				(() => {
					console.trace('fn1-fn2')
				})()
			}
			fn2()
		}
		fn1()
		console.log('\n');
		console.log('\n');

		console.log('%c 【profile】', 'font-size: 2em;color:#f00');
		console.profile('性能分析器');
		(() => {
			for (var i = 0; i < 10; i++) {
			}
			for (var i = 0; i < 190; i++) { }
		})()
		console.profileEnd();
		console.log('\n');
		console.log('\n');
	</script>
</body>

</html>
```
