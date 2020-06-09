---
title: 根据设计图适配rem
date: 2018-03-09 17:02:40
categories: - program
---

# 设计图
首先，拿到设计图

![携程APP设计图](http://img.caibaojian.com/uploads/2015/12/1418891322.jpeg)

以顶部轮播为例，它的宽是375px，高是120px左右。

大多数手里都好适配，但是如果在iPhone5手机上，宽是320px，那么此时它的高应该是102px左右，这样它的比例才是一样的。

# 预览
先贴代码：

```
<!DOCTYPE html>
<html>

	<head>
		<meta charset="UTF-8">
		<title></title>
		<meta name="viewport" content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no" />
		<style type="text/css">
			* {
				padding: 0;
				margin: 0;
				box-sizing: border-box;
			}
			
			html {
				font-size: 100px;
			}
			
			.content {
				width: 3.75rem;
				height: 1.2rem;
				background-color: red;
				font-size: 16px;
			}
		</style>
	</head>

	<body>
		<div class="content">
			测试文字
		</div>
		<script type="text/javascript">
			(function() {
				var width = window.screen.width;
				console.log(width);
				var scaleSize = 100,
					designSize = 375;
				var size = width / (designSize / scaleSize);
				document.getElementsByTagName('html')[0].style.fontSize = (size) + 'px';
			})();
		</script>

	</body>

</html>
```

# 重点讲解

## 手机适配

`<meta name="viewport" content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no" />`

## 不同宽度下不同的font-size

```
(function() {
	//首先取得当得屏幕宽度
	var width = window.screen.width;
	var scaleSize = 100,
		designSize = 375;
		//用当得宽度除以（设计尺寸除以缩放尺寸）
	var size = width / (designSize / scaleSize);
	//设置font-size
	document.getElementsByTagName('html')[0].style.fontSize = (size) + 'px';
})();
```

这一段代码是精华


## 内容

html
```
<div class="content">
	测试文字
</div>
```

css
```
.content {
	width: 3.75rem;
	height: 1.2rem;
	font-size: 16px;
}
```

这里的3.75和1.2就是设计稿中的375px和120px绽放了100倍的效果。

至于`font-size: 16px;`，这会使文中的字体大小正常。