---
title: vue父子组件相互通信
date: 2018-09-21 09:50:46
tags:
categories: 编程开发
---

# 子 => 父 传值

### child.vue

```
sendData() {
    this.$emit('sendDataFun', 'hello');
}
```

### father.vue

```
<child @sendDataFun="get"></child>
...
get(val){
	console.log(val)
}
```

# 父 => 子 传值

### father.vue

```
<child :sendType="type"></child>
```

### child.vue

```
...
props:{
	sendType:''
},
watch:{
	sendType(){
		...
	}
}
...
```

# 父 => 子 调方法

### father.vue

```
<child ref="child" @sendDataFun="get"></child>
...
this.$refs.child.sendData();
...
get(val){
	console.log(val)
}

```

### child.vue

```
sendData() {
    this.$emit('sendDataFun', 'hello');
}
```