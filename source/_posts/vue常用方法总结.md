---
title: vue常用方法总结
date: 2018-03-19 13:50:17
categories: 
- program
---

# 公共组件

## 引入公共组件

```
import Vue from 'vue'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'
import SixiButton from 'components/common/SixiButton'

Vue.use(VueRouter)
Vue.use(VueResource)
Vue.component('six-button', SixiButton)
```

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

**此处push的必须是name，不能是path，如果要用path的话，可以用query**

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

获取：`this.$route.params.order_id`


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

`v-model.number`和`onkeyup="value=value.replace(/[^\d]/g,'') "`同时使用时可能会出错。

`oninput="value=value.replace(/[^0-9A-Za-z.]/g,'')"`

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
    let routeUrl = this.$router.resolve({
    path: '/peoManager/peopleDetails',
    query: {index: index, peopleID: item.peopleID}
    })
    window.open(routeUrl.href, '_blank')
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

[参考](https://segmentfault.com/a/1190000012272194)

# 图片错误时显示默认图片

```
<img v-bind:src="userData.photo" :onerror="logo" class="img-box4">  

data: () => ({  
    logo: 'this.src="' + require('../assets/img.png') + '"'
}) 
```

懒加载方法：

`<img v-lazy:background-image="{src: item.pic_url, error: 'http://bpic.588ku.com/back_pic/03/53/97/65579958bb0ec9a.jpg!r850/fw/400', loading: 'default_banner'}" />`

注意：`error`里的图片得是网络图片，用本地图片我设置了很久都没有效果。

# 引入mui

复制mui.min.js进去

在vue页面中引入

`import mui from '../../js/mui.js';`

在严格模式下报错

在.babel.rc中加入如下代码，排除mui相关的js就可以了：

```

{
"presets": [ "es2015" ],
"ignore": [
"./src/lib/mui/mui.min.js",
"./src/lib/mui/mui.picker.js",
"./src/lib/mui/mui.poppicker.js"
]
}
```

# axios篇

## 设置请求头带cooike

```
import axios from 'axios'
axios.defaults.withCredentials=true;//让ajax携带cookie
Vue.prototype.$axios = axios;
```

# mode模式

## history

优点：地址栏不会有`#`号，利于`SEO`优化

缺点：线上刷新后会404，需要前后台都配置才行

## hash

优点：线上线下都没有刷新异常的问题

缺点：地址栏有`#`号，对`SEO`不友好

# vue中nextTick使用

```
//改变数据
var msg = 'change';

//想要立即使用刚刚赋的值‘change’，此时是不行的，DOM并没有更新
console.log(vm.$el.textContext);//不能得到 'change'

//这样可以获取，nextTick会在DOM更新后获取
this.$nextTick(()=>{
    console.log(vm.$el.textContext);//可以得到 'change'
})
```

# vue项目中的for循环引发的血案

项目中用了
```
v-for="(item) in arr"
```
改成
```
v-for="item in arr"
```
# vue父子组件相互通信

## 子 => 父 传值

### child.vue

```
sendData() {
    this.$emit('sendDataFun', 'hello');
}
```

### father.vue

```
<child @sendDataFun="get"></child>
...
get(val){
	console.log(val)
}
```

## 父 => 子 传值

### father.vue

```
<child :sendType="type"></child>
```

### child.vue

```
...
props:{
	sendType:''
},
watch:{
	sendType(){
		...
	}
}
...
```

## 父 => 子 调方法

### father.vue

```
<child ref="child" @sendDataFun="get"></child>
...
this.$refs.child.sendData();
...
get(val){
	console.log(val)
}

```

### child.vue

```
sendData() {
    this.$emit('sendDataFun', 'hello');
}
```

# vue兄弟组件通过eventbus传值


新建`bus.js`


```
import Vue from "vue"
export default new Vue();
```

兄组件`child1.vue`

```
<span @click="send">点击</span>
send(){
	eventBus.$emit('sentMsg','hellowrold~');
}
```

弟组件`child2.vue`

```
mounted() {
    eventBus.$on('sentMsg',v=>{
        console.log(v)
    })
},
```

# vue下swiper的使用

## 安装

`npm install swiper`

然后视情况看要不要在main.js里面全局引用，如果界面少可以不用。

## 引用

`html`部分：

注意：此处的data要注意**网络请求的异步问题**

```
<swiper :options="swiperOption" ref="mySwiper">
    <swiper-slide v-for="(item,index) in data" :key="index" class="swiper-slide">
        {{item}}
    </swiper-slide>
</swiper>
```

`js`部分

```
import 'swiper/dist/css/swiper.css'
import {swiper, swiperSlide} from 'vue-awesome-swiper'

...

data(){
    reutrn {
        swiperOption: {
            direction: 'vertical',
            notNextTick: true,
            loop: true,
            speed: 3500,
            autoplay: {
                delay: 4000,
                stopOnLastSlide: false,
                disableOnInteraction: false
            }
        }
    }
},
components: {
    swiper,
    swiperSlide
}
```

`css`部分

视情况而定，有的代码需要，有的不需要。

```
.swiper-container{
    windth:100%important;
    heidth:100px!important;
}
```

# vue国际化i18n使用

## 安装vue-i18n

npm install vue-i18n --save

## main.js文件配置

```
// 引入i18n国际化插件
import VueI18n from 'vue-i18n'
Vue.use(VueI18n)
 
// 注册i18n实例并引入语言文件，文件格式等下解析
const i18n = new VueI18n({
  locale: 'zh',
  messages: {
    'zh': require('@/assets/languages/zh.json'),
    'en': require('@/assets/languages/en.json')
  }
})
//将i18n注入到vue实例中
new Vue({
  el: '#app',
  router,
  store,
  i18n,
  components: { App },
  template: '<App/>'
})
```

- en.json

```
{
    "common": {
        "home": "Home",
        "login": "Login",
        "register": "Register",
        "appDownload": "APP Download",
        "aboutUs": "About Us",
        "faq": "FAQ",
        "contact": "Contact Us",
        "join": "Join Us",
        "copyright": "Copyright © ZLGMcu Ltd",
        "news": "News",
        "toggle": "Toggle",
        "welcome": "Welcome, ",
        "userinfo": "Userinfo",
        "firstPage": "Home",
        "setting": "Setting",
        "exit": "Exit"
    },
    "message": {
        "hint1": "Please Input Nickname",
        "hint2": "Please Input Username",
        "hint3": "Please Input Password",
        "hint4": "Don't find picture",
        "hint5": "No Account?",
        "hint6": "Register Now",
        "hint7": "Remember me",
        "hint8": "Can't login in?",
        "placeHolder1": "Nickname",
        "placeHolder2": "Username or Phone Number or Email",
        "placeHolder3": "Password(8 Digits at Least)"
    }
}
```

- zh.json

```

{
    "common":{
        "home": "首页",
        "login": "登录",
        "register": "注册",
        "appDownload": "APP下载",
        "aboutUs": "关于我们",
        "faq": "常见问题",
        "contact": "联系方式",
        "join": "加入我们",
        "copyright": "版权说明 © 广州xxx有限公司",
        "news": "消息",
        "toggle": "切换",
        "welcome": "欢迎您，",
        "userinfo": "个人信息",
        "firstPage":  "主页",
        "setting": "设置",
        "exit": "退出"
    },
    "message":{
        "hint1": "请输入昵称",
        "hint2": "请输入账号",
        "hint3": "请输入密码",
        "hint4": "没有找到",
        "hin5": "没有账号？",
        "hint6": "马上注册",
        "hint7": "记住我",
        "hint8": "登录遇到问题？",
        "placeHolder1": "昵称",
        "placeHolder2": "用户名、手机号或邮箱",
        "placeHolder3": "密码（至少8位字符）"
    }
}
```

# 使用vue-i18n

```
<h1 >{{$t('common.home')}}</h1>
<el-button @click="changeTest">切换</el-button>

...

changeTest(){
	let lang = this.$i18n.locale == 'zh' ? 'en' : 'zh';
	this.$i18n.locale = lang;
},
```

# 让el-select可以绑定对象

```
<el-select value-key="name">
  <el-option
    v-for="item in list"
    :key="item.id"
    :label="item.name"
    :value="item">
  </el-option>
</el-select>
```

# vue中让filter可以访问data里面的数据

```
var that;
export default {
    data() {
        return {
            peopleArr:[{name:xx,value:1},{name:xxx,value:2}]
        }
    },
    beforeCreate(){
        that = this;
    },
    filter:{
        filterPeople(val){
            return that.peopleArr[0].value;
        }
    }
}
```

重点：
定义that；
在beforeCreate之前把that绑定在this(vue)上；
在filter中使用that.


# 使用Vuex

## 下载

`npm install vuex --save`

## `main.vue`

```
import { mapState,mapMutations } from 'vuex';
...
computed: {
    ...mapState({
    tabsList: 'tabsList'
    })
},
methods: {
    ...mapMutations(["handleTabsList"]),
}
```
这样就可以直接在`vue`文件中写`this.tabsList`来获取vuex中的值。
如：

原来：
```
this.$store.commit('handleTabsList',this.$store.state.tabsList)
```

现在：
```
this.handleTabsList(this.tabsList)

```

## store.js

```
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        tabsList: [] || localStorage.getItem('tabsList')
    },
    mutations: {
        handleTabsList: (state, tabsList) => {
            state.tabsList = tabsList
            localStorage.setItem('tabsList', JSON.stringify(tabsList))
        }
    },
    actions: {

    },
    getters: {
        tabsList: (state) => state.tabsList
    }
})
```

## main.js

```
import store from './store'

new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})

```