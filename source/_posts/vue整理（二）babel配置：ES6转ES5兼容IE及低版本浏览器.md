---
title: vue整理（二）babel配置：ES6转ES5兼容IE及低版本浏览器
date: 2018-10-18 14:59:46
tags:
categories: 编程开发
---

如果用到了	`promise`、`async...await`之类的ES6的语法，在IE等低浏览器中就会显示不出来，此时，就需要我们做兼容，方法如下。

# 安装 `babel-polyfill` 

`npm install --save-dev babel-polyfill`

# 导入

main.js

`import 'babel-polyfill'`

# 修改入口

build-->webpack.base.conf.js

```
entry: {
	app: ["babel-polyfill", "./src/main.js"]
}
```

# 安装ES5插件
`npm install --save-dev babel-preset-es2015-ie`

# .babelrc

在项目根目录下，如果没有，就新建

```
{
  "presets": [
    
["env", {
      "modules": false,
      "targets": {
        "browsers": ["> 1%", "last 2 versions", "not ie <= 8"]
      }
    }],
    "stage-2"
  ],
  "plugins": ["transform-runtime"],
  "env": {
    "test": {
      "presets": ["env", "stage-2"],
      "plugins": ["istanbul"]
    }
  }
}
```

**[参考](https://blog.csdn.net/winter__is__coming/article/details/79947361)**
