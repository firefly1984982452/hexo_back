---
title: vue国际化i18n使用
date: 2018-10-17 10:12:09
tags:
categories: 编程开发
---

# 安装vue-i18n

npm install vue-i18n --save

# main.js文件配置

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