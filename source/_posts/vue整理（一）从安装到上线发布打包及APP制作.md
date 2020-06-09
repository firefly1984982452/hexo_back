---
title: vue整理（一）从安装到上线发布打包及APP制作
date: 2018-10-18 14:59:46
categories: - program
---


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


# 打包

config/index.js
`assetsPublicPath: './',`

`npm run build`

得到的dist文件夹就是需要的文件，可放至网站。

# 打包成APK

**[参考 vue打包为android apk 详情配置](https://firefly1984982452.github.io/2018/09/14/vue%E6%89%93%E5%8C%85%E4%B8%BAandroid%20apk%20%E8%AF%A6%E6%83%85%E9%85%8D%E7%BD%AE/#more)**

