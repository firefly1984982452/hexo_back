---
title: CSS之常用方法总结
date: 2020-12-07 14:19:32
categories: 
- program
---


# HTML默认字体大小14px

```
font-size: 14px;
```


# 检查边距
```
*{ background: #000 !important;
color: #0f0 !important;
outline: solid #f00 1px !important; }
```
![a7b789a9gy1fow4hu8khhj206203qwea.jpg](https://wx1.sinaimg.cn/mw690/0069qZtTgy1gho4csuijuj306203qdfx.jpg)


# 手机端、电脑端中CSS居中的多种方法

## 预览

[案例预览](https://firefly1984982452.github.io/css-center/)
[案例下载地址](https://github.com/firefly1984982452/css-center)


## 布局

### 首先，让我们的背景宽和高都是100%

```
html,body{
	height: 100%;
}
.box {
	height: 100%;
}

```

### html页面

```
<div class="box">
	<div class="item">
		item
	</div>
</div>
```

### 基础的CSS

```
* {
	margin: 0;
	padding: 0;
	box-sizing: border-box;
}
html,body{
	height: 100%;
}
.box {
	width: 100%;
	height: 100%;
	background-color: #f7b2bb;
}

.item {
	width: 50%;
	height: 100px;
	background-color: #1296db;
	text-align: center;
	line-height: 100px;
	color: #fff;
}
```

**tips:因为我的布局很简单，页面也不多，所以我用了`*`号选择器**

## absolute方法实现

### 固定宽高

```
.box{
	position: relative;
}
.item{
	position: absolute;
	width: 200px;
	height: 100px;
	left: 50%;
	top: 50%;
	margin-left: -100px;
	margin-top: -50px;
}
```

### 百分比宽高

```
.box{
	position: relative;
}
.item{
	width: 50%;
	height: 20%;
	position: absolute;
	left: 50%;
	top: 50%;
	transform: translate(-50%,-50%);
}
```

**重点：`transform: translate(-50%,-50%);`**

## 块级元素实现水平居中

```
.box{
	position: relative;
}
.item{
	width: 50%;
	margin: 0 auto;
}
```

## flex方法实现

```
.box{
	display: flex;
	justify-content: center;
	align-items: center;
}
.item{
	
}
```

## 文本居中

- 文字水平居中：`text-align:center;`

- 文字垂直居中：`line-height:height`


# CSS做三角形

```
width: 0;
height: 0;
border-color: #f60 transparent transparent transparent;
border-style: solid;
border-width: 10px;
```

# width 100% 自适应

```
width: -webkit-fill-available;
```

# 雪碧图（sprite）
```
background: url(xxx) no-repeat;
width: 64px;
height: 64px;
background-position: 0 -64px;
```

# html自适应手机

```
<meta name="viewport" content="initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
```

# 最后一个li不显示border（类推）

## 方法一

```
li{border-top:1px solid #000;}
li:first-child{border-top:none;}
```
## 方法二

```
li+li{
    border-top: 1px dashed #999;
}
```

## 方法三

```
li:not(:last-child)...
```

# 禁用左键

```
$(document).ready(function(){
  $(document).bind('contextmenu', function(e){
    return false;
  })
})
```

# 文字换行

```
word-wrap:break-word;
```


# 改变控制台面样式

```
console.log("%c来自:console","color:red;font-size:50px");
```
![Image.png](https://wx4.sinaimg.cn/mw690/0069qZtTgy1gho4c77d8dj30bj02odfq.jpg)


# css禁止鼠标点击

`pointer-events:none;`

# 限定N行
```
display: -webkit-box;
overflow: hidden;
white-space: normal!important;
text-overflow: ellipsis;
word-wrap: break-word;
-webkit-line-clamp: 1;
-webkit-box-orient: vertical;

单行
.table tbody > tr > td.name{
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
 }
```

# 新版本上线（指导蒙版）

```
position: absolute;
box-shadow: rgba(0, 0, 0, 0.75) 10px 1px 1px 99px;
z-index: 100;
width: 367px;
height: 143px;
left: 40px;
top: 12px;
```

![Image.png](https://wx2.sinaimg.cn/mw690/0069qZtTgy1gho4b225hlj30k60ffn1c.jpg)

# flex小记

## 规范

```
<div class="box">
  <div class="item"></div>
</div>
```

## 示例

```
.box{
  width: 400px;
  height: 400px;
  border: 1px solid #f7b2bb;
  display: flex;
  /*flex-direction: row;//方向
  flex-wrap: wrap; //换行 */
  flex-flow: row wrap;
  justify-content: space-between;//内容
  align-content: space-between;//
}
.item{
  width: 100px;
  height: 100px;
  background: #f7b2bb;
  color: #fff;
  border: 1px solid #eee;
  display: flex;
  justify-content: space-around;
  align-items: center;
  /*flex-grow: 3;*/
}
```

# flex中的space-evenly

**均匀分布**

```
justify-content: space-between; // 两端
justify-content: space-around; // 两端间隙相等，项目中间的间隙比较大
justify-content: space-evenly; // 两端与项目中间的间隙一样大
```

区别：

![image](https://wx2.sinaimg.cn/mw690/0069qZtTgy1gidesq1po8j30970c4mxc.jpg)

**IOS之类的兼容性用before和after**

```
container{
      display: flex;
      flex-flow: row nowrap;
      align-items: center;
      justify-content: space-between;
       //justify-content: space-evenly;
      &:before,
      &:after {
          content: '';
          display: block;
    }
}
```


# 冒泡事件

`event.stopProgation`能阻止冒泡事件

# 默认事件

`event.preventDefault`能阻止如`<a>`的默认`href`事件


# 添加标签栏logo

```
<link rel="shortcut icon" type="image/x-icon" href="./static/logo.ico" rel="shortcut icon" />
```

*tips:vue-cli项目中，要把.ico文件放在static文件中，并重新编译运行*

# CSS让段落开头自动空两格代码

`text-indent:2em;`

# 文字效果

```
text-decoration:none 无装饰，通常对html下划线标签去掉下划线样式
text-decoration:underline 下划线样式
text-decoration:line-through 删除线样式-贯穿线样式
text-decoration:overline 上划线样式
```

# 禁止缓存

```
<!--禁止缓存-->
<meta http-equiv="Cache-Control" content="no-cache, no-store, must-revalidate" />
<meta http-equiv="Pragma" content="no-cache" />
<meta http-equiv="Expires" content="0" />
<!--禁止缓存 end-->
```

# 打开下载后立马关闭

- 1.excel

```
var adom = document.createElement("a");
adom.setAttribute("href",url);
adom.width = "0px";
adom.height = "0px";
adom.setAttribute("target","_blank")
document.body.appendChild(adom)
adom.click();
adom.remove();
```
- 2.image

```
fetch(url).then(res => res.blob()).then((blob) => {
  // 创建隐藏的可下载链接
  const a = document.createElement('a');
  a.style.display = 'none';
  a.href = URL.createObjectURL(blob);
  a.download = this.peopleList[i].peopleName;
  document.body.appendChild(a);
  a.click();
  // 移除元素
  document.body.removeChild(a);
})
```


# base64转码

## 英文

```
var string = 'Hello World!';
btoa(string) // "SGVsbG8gV29ybGQh"
atob('SGVsbG8gV29ybGQh') // "Hello World!"
```

## 中文

```
function b64Encode(str) {
  return btoa(encodeURIComponent(str));
}

function b64Decode(str) {
  return decodeURIComponent(atob(str));
}

b64Encode('你好') // "JUU0JUJEJUEwJUU1JUE1JUJE"
b64Decode('JUU0JUJEJUEwJUU1JUE1JUJE') // "你好"

```

# js打印相关


## 打印方法

`window.print();`

## 局部打印

### media属性

```
<style type="text/css" media=print>
	.noprint {
		display: none
	}
</style>
```

- 在正常的html文件中有效，但我试了在vue中无效

### 媒体查询

```
<style type="text/css">
	@media print {
		.no{
			display: none;
		}
	}
</style>
```

- 亲测有效


# 更改自带的scorll滚动条样式

```
::-webkit-scrollbar{
    width: .07rem;
    height: .07rem;
}
/* //定义滑块 内阴影+圆角 */
::-webkit-scrollbar-thumb{
    border-radius: 1em;
    background-color: #D8D8D8;
}
/* //定义滚动条轨道 内阴影+圆角 */
::-webkit-scrollbar-track{
    border-radius: 1em;
    background-color: transparent;
}
```
