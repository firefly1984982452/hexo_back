---
title: css导航横向滑动
date: 2018-07-23 10:59:26
tags:
categories: 编程开发
---

# html

```
<div class="nav-wrap">
	<div class="nav">
		<div class="li" v-for="(name,index) in datas.name">
			<span>{{name}}</span>
		</div>
	</div>
</div>
```

# css

```
.nav-wrap {
  height: 0.9rem;
  overflow-x: scroll;
  -webkit-overflow-scrolling: touch;
  background: #fff;
  .nav {
    white-space: nowrap;
    .li {
      display: inline-block;
     }
   }
}
```