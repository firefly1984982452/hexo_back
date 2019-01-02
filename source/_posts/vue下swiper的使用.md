---
title: vue下swiper的使用
date: 2018-12-26 14:35:18
tags:
categories: 编程开发
---

# 安装

`npm install swiper`

然后视情况看要不要在main.js里面全局引用，如果界面少可以不用。

# 引用

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
