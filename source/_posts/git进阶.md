---
title: git进阶
date: 2018-10-24 14:35:18
categories: 
- program
---

# 普通发布代码

```
git add .
git commit -m '发布信息'
git pull
git push
```

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

# 不同分支开发

**查看所有分支**
```
git branch
```

**切换分支**
```
git checkout name
```

**将master分支上的代码pull下来**
```
git pull origin master
```

**在自己分支上修改代码并push到自己分支**

**切换到master分支**
```
git checkout master
```

**同步并push代码**
```
git merge name
git push
```
或
```
git pull origin name
git push
```
