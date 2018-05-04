---
title: Emmet(Zencoding)语法
date: 2018-05-02 10:51:17
tags:
categories: 编程开发
---

> 参考原文：https://blog.csdn.net/seasunexpect/article/details/71124299

# 子节点 '#'

- 语法：

```
div>ul>li
```

- 结果：

```
<div>
	<ul>
		<li></li>
	</ul>
</div>
```

# 兄弟节点 '+'

- 语法：

```
div+p
```

- 结果：

```
<div></div>
<p></p>
```

# 往上 '^'

- 语法：

```
div>p>span^b
```

- 结果：

```
<div>
	<p><span></span></p>
	<b></b>
</div>
```

# 次数 '`*`'

- 语法：

```
ul>li*3
```

- 结果：

```
<ul>
	<li></li>
	<li></li>
	<li></li>
</ul>
```

# 分组 '()'

- 语法：

```
div>(header>ul>li*2)+footer>p
```

- 结果：

```
<div>
	<header>
		<ul>
			<li></li>
			<li></li>
		</ul>
	</header>
	<footer>
		<p></p>
	</footer>
</div>
```


# ID '#'

- 语法：

```
div#page
```

- 结果：

```
<div id="page"></div>
```

# class '.'

- 语法：

```
div.page
```

- 结果：

```
<div class="page"></div>
```

# 自定义属性 '[attr]'

- 语法：

```
td[title="hello" colspan=3]
```

- 结果：

```
<td title="hello" colspan="3"></td>
```


# 编号 '$'

- 语法：

```
ul>li.item$$$*3
```

- 结果：

```
<ul>
	<li class="item001"></li>
	<li class="item002"></li>
	<li class="item003"></li>
</ul>
```

# 改变编号基数和方向 '$@-'

- 语法：

```
ul>li.item$@-5*4
ul>li.item$@3*4
```

- 结果：

```
<ul>
	<li class="item8"></li>
	<li class="item7"></li>
	<li class="item6"></li>
	<li class="item5"></li>
</ul>

<ul>
	<li class="item3"></li>
	<li class="item4"></li>
	<li class="item5"></li>
	<li class="item6"></li>
</ul>
```


# 文本 '{}'

- 语法：

```
div{click me}
```

- 结果：

```
<div>click me</div>
```

# 其它

**不能有空格**

练习

```
div#invest>head-custom+div.balance>div.center>div.assetle.l>ul.manner_left>li.row.rows>span.row_left.l+a.row_middle.l{商品管理}^^^div.l.wind>div.windright>div.topHead>p.l.text{结算管理-列表}^div.notice>p.eggs.l+p.l.writing^div.end>div.topend>div.topLeft.l>p.l.finish{起止时间}+p.l.totals{起止时间}^div.topmiddle.l>div>sivable>p.cashes{店铺应收金额}^div.nesting>p*4^^div.topright>p.l.period{本期应结}+p.l.state{结算状态}
```

```
<div id="invest">
	<head-custom></head-custom>
	<div class="balance">
		<div class="center">
			<div class="assetle l">
				<ul class="manner_left">
					<li class="row rows"><span class="row_left l"></span><a href="" class="row_middle l">商品管理</a></li>
				</ul>
			</div>
			<div class="l wind">
				<div class="windright">
					<div class="topHead">
						<p class="l text">结算管理-列表</p>
					</div>
					<div class="notice">
						<p class="eggs l"></p>
						<p class="l writing"></p>
					</div>
					<div class="end">
						<div class="topend">
							<div class="topLeft l">
								<p class="l finish">起止时间</p>
								<p class="l totals">起止时间</p>
							</div>
							<div class="topmiddle l">
								<div>
									<sivable>
										<p class="cashes">店铺应收金额</p>
									</sivable>
									<div class="nesting">
										<p></p>
										<p></p>
										<p></p>
										<p></p>
									</div>
								</div>
								<div class="topright">
									<p class="l period">本期应结</p>
									<p class="l state">结算状态</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>
```