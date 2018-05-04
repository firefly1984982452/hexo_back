---
title: mpvue试写小程序踩坑集
date: 2018-04-23 15:29:16
tags:[vue,小程序]
categories: 编程开发

---

# 安装
```
# 全局安装 vue-cli
$ npm install --global vue-cli

# 创建一个基于 mpvue-quickstart 模板的新项目
$ vue init mpvue/mpvue-quickstart my-project

# 安装依赖
$ cd my-project
$ npm install
# 启动构建
$ npm run dev
```

**新增的页面需要重新 npm run dev 来进行编译**


# 为什么我新增了页面，没有反应？

因为 webpack 编译的文件是由配置的 entry 决定的，新增的页面并没有添加进 entry，所以需要手动 npm run dev 一下，考虑不是高频操作，所以还可以忍受
