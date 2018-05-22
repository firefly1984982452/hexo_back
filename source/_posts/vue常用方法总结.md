---
title: vue常用方法总结
date: 2018-03-19 13:50:17
tags: vue
categories: 编程开发
---

# 路由跳转及传参

## 直接跳转

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


## 地址栏'/'传参

router.js

```
{
    path: '/success/:order_id',
    name: 'success',
    component: success
}
```

A.vue

地址：`http://localhost:8080/#/success/257`

获取：```this.$route.params.order_id```


## 地址栏'?'传参

地址：`http://localhost:8080/#/success?id=257`

获取：`this.$route.query.id`

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

# vue的target:blank跳转

```
const {href} = this.$router.resolve({
    name: 'logistics'
})
window.open(href, '_blank')
```

# 消息无缝滚动

```
 export default {
data() {
  return {
      animate:false,
      items:[
          {name:"马云"},
          {name:"雷军"},
          {name:"王勤"}
      ]
  }
},
created(){
    setInterval(this.scroll,1000)
},
methods: {
    scroll(){
       this.animate=true;    // 因为在消息向上滚动的时候需要添加css3过渡动画，所以这里需要设置true
       setTimeout(()=>{      //  这里直接使用了es6的箭头函数，省去了处理this指向偏移问题，代码也比之前简化了很多
               this.items.push(this.items[0]);  // 将数组的第一个元素添加到数组的
               this.items.shift();               //删除数组的第一个元素
               this.animate=false;  // margin-top 为0 的时候取消过渡动画，实现无缝滚动
       },500)
    }
}
```

参考：https://segmentfault.com/a/1190000012272194


# 商品错误时显示默认图片

```

<img v-bind:src="userData.photo" :onerror="logo" class="img-box4">  


data: () => ({  
    logo: 'this.src="' + require('../assets/img.png') + '"'  
}) 
```