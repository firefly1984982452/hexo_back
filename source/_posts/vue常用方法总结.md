---
title: vue常用方法总结
date: 2018-03-19 13:50:17
tags: vue
categories: 编程开发
---

# 路由跳转及传参

A.vue
```
this.$router.push({
	name : 'B',
	params : {
		id : 1
		name : 'study Vue.'
	}
})
```

B.vue
```
this.$route.params
```

*tips:A.vue使用的是`$router`，B.vue使用的是`$route`，极易混淆。*

# axios网络请求

`this.axios.post().then().catch();`

详情如下：
```
this.axios.post(url,params).then((res) => {
		console.log(res.data);
}).catch(
	(err) => {
	console.log(err);
});
```

# vue-cli快速构建项目

## 安装webpack
`npm install -g webpack`

## 安装vue-cli
`npm install -g vue-cli`

## 初始化
`vue init webpack myVueStudy`

初始化过程中有些需要填的选项，直接按`enter`键就可以了。

## 安装模块
`npm install`

## 运行
`npm run dev`

## 打包

config/index.js
`assetsPublicPath: './',`

`npm run build`

# 绝对地址和相对址引用

`<img src="~static/20180315130936.png"/>`

# el-input 只能输入数字

```
<el-input 
	style="width: 400px;" 
	v-model.number="params.account" 
	onkeypress="return event.keyCode>=48&&event.keyCode<=57"
	clearable>
</el-input>
```

`onkeypress="return event.keyCode>=48&&event.keyCode<=57"`是按下时触发

`onkeyup="value=value.replace(/[^\d]/g,'') "`是输入后触发

`v-model.number`同样也只能输入数字，但是输入的非数字仍然会显示在输入框，看不去不友好。

*tips:*
`<input type="number" name="" id="" value="" />`

这句代码在PC端和手机端会有兼容性问题

------------

# weex篇

## 部署

`npm run dev` 运行

`npm run serve` 热更新

`npm run build` 打包

将`dist/index.js`里面的文件替换到Android中`assets/dist/index.js`和`assets/index.js`中


# vue中做一些监听事件

```
created(){
	var that = this;
	document.onkeydown = function(e) {
		var keyNum = window.event ? e.keyCode : e.which;
		if(keyNum == 13) {
			that.login();
		}
	};			
},
```

# vue获取后端数据应该在created还是mounted方法

看情况了，一般放到created里面就可以了，这样可以及早发请求获取数据，如果有依赖dom必须存在的情况，就放到`mounted(){this.$nextTick(() => { /* code */ })}`里面