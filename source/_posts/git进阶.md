---
title: git进阶
date: 2018-10-24 14:35:18
tags:
categories: 编程开发
---

# 线上版本回退

```
git reset --hard '7位数版本号'
git pull -f
```

# 不要本地的更改文件

```
git checkout .
```

# 导出干净代码

`git archive --format zip --output "out.zip" master -0`

# 两个版本之前的补丁包

比如我要10月3日 至 10月5日 的补丁包

`$ git diff 10月5日的7位数版本号 10月3日的7位数版本号 --name-only | xargs zip update.zip`