---
title: js打印相关
date: 2018-09-12 13:47:30
tags:
categories: 编程开发
---

# 打印方法

`window.print();`

# 局部打印

## media属性

```
<style type="text/css" media=print>
	.noprint {
		display: none
	}
</style>
```

- 在正常的html文件中有效，但我试了在vue中无效

## 媒体查询
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