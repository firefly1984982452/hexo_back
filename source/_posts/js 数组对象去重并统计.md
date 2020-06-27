---
title: js 数组对象去重并统计
date: 2020-06-12 16:16:16
categories : 
- program
---

# 要求

将`list`变为`arr`，将数组对象去重并统计。

```
const list = [
  { name: '1', type:1 },
  { name: '1', type:1 },
  { name: '1', type:1 },
  { name: '1', type:2 },
  { name: '1', type:2 },
  { name: '2', type:2 },
  { name: '2', type:2 },
  { name: '2', type:2 }
]


const ary = [
 { name: '1', type:1, total:3 },
 { name: '1', type:2, total:2 },
 { name: '2', type:2, total:3 },
]
```

# 本来的写法

思路：

```
1.只留下所有name，将所有name下的type合并
2.将name下的type遍历，统计不同的type的值和总数
3.遍历刚刚统计的typeList，计算对应的type和total，push到data里
4.删除原来的统计数据
```

```
      let arr =  [
        { name: '1', type:1 },
        { name: '1', type:1 },
        { name: '1', type:1 },
        { name: '1', type:2 },
        { name: '1', type:2 },
        { name: '2', type:2 },
        { name: '2', type:2 },
        { name: '2', type:2 }
      ]
      let data = [];
      // 只留下所有name，将所有name下的type合并
      for (var i = 0; i< arr.length; i ++) {
        let index = data.findIndex(ele => ele.name == arr[i].name);
        if (index == -1) {
          data.push(arr[i])
        } else {
          data[index].type = typeof data[index].type == 'number' ? [data[index].type] : data[index].type;
          data[index].type.push(arr[i].type);
        }
      }

      // 当前data是: [{name: "1",type:[1, 1, 1, 2, 2]},{name: "2",type: [2, 2, 2]}]

      // 将name下的type遍历，统计不同的type的值和总数
      for (var i = 0; i < data.length; i ++) {
        if (typeof data[i].type !== 'number') {
          data[i].typeList = [];
          for (var j = 0 ; j < data[i].type.length; j ++) {
            let index = data[i].typeList.findIndex(ele => ele.val == data[i].type[j])
            if (index !== -1) {
              ++data[i].typeList[index].total;
            } else {
              let item = {
                val :  data[i].type[j],
                total : 1
              }
              data[i].typeList.push(item)
            }
          }
        } else {
          data[i].total = 1;
        }
      }

      // 当前data是: [
      //   {
      //     name: "1",
      //     type:[1, 1, 1, 2, 2],
      //     typeList:[{val: 1, total: 3},{val: 2, total: 2}]
      //   },
      //   {
      //     name: "2",
      //     type: [2, 2, 2],
      //     typeList:[{val: 2, total: 3}]
      //   }
      // ]

      // 遍历刚刚统计的typeList，计算对应的type和total，push到data里
      for (var i = 0; i< data.length; i ++ ){
        if (typeof data[i].type !== 'number') {
          for(var j = 0; j < data[i].typeList.length; j ++) {
            let item = {
              name: data[i].name,
              type: data[i].typeList[j].val,
              total: data[i].typeList[j].total
            }
            data.push(item)
          }
        }
      }

      // 当前data是：
      //   [{name: "1", type: Array(5), typeList: Array(2)},
      //   {name: "2", type: Array(3), typeList: Array(1)},
      //   {name: "1", type: 1, total: 3},
      //   {name: "1", type: 2, total: 2},
      //   {name: "2", type: 2, total: 3}

      // 删除原来的统计数据
      let length = data.length
      for (var i = 0; i< length; i ++ ){
        if (typeof data[i].type !== 'number') {
          data.splice(i,1);
          --length;
          --i;
        }
      }

      // 当前data是：
      // [{name: "1", type: 1, total: 3},
      // {name: "1", type: 2, total: 2},
      // {name: "2", type: 2, total: 3}]

      console.log(data)
```