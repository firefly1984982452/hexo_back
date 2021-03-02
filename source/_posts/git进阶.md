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

比如我要 10 月 3 日 至 10 月 5 日 的补丁包

`$ git diff 10月5日的7位数版本号 10月3日的7位数版本号 --name-only | xargs zip update.zip`

# 不同分支开发

**新建分支**

```
git checkout -b name
```

**发布新的分支**

```
<!-- 提交发布代码后： -->
git push origin name
```

**查看所有分支**

```
git branch
```

**切换分支**

```
git checkout name
```

**将 master 分支上的代码 pull 下来**

```
git pull origin master
```

**在自己分支上修改代码并 push 到自己分支**

**切换到 master 分支**

```
git checkout master
```

**同步并 push 代码**

```
git merge name
git push
```

或

```
git pull origin name
git push
```

---

# 新电脑开发新项目

1. 查看自己电脑的邮箱和用户名

```
git config --global user.email
```

2. 设置邮箱和用户名

```
git config --global user.email 'xx'
git config --global user.name 'xx'
```

3. 生成 SSH

```
ssh-keygen -t rsa -C “邮箱名称"
```

4. MAC 电脑打开 SSH 文件

```
open ~/.ssh
```

5. 将`id_rsa.pub`文件中的内容复制到代码仓库里面生成新的 SSH

6. 下载

```
git clone 'xx'
```
