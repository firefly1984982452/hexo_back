---
title: echarts超全超详情配置项
date: 2020-09-08 14:35:18
categories: 
- program
---

原date: 2018-11-20 14:35:18

# 链接

[官方API链接](https://echarts.apache.org/zh/option.html)
[官方实例链接](https://echarts.apache.org/examples/zh/index.html)
[官方Gallery更多实例链接](https://gallery.echartsjs.com/explore.html#sort=rank~timeframe=all~author=all)

# 在vue中如何使用

[链接](https://firefly1984982452.github.io/2020/05/08/%E6%96%B0%E5%BB%BAvue%E9%A1%B9%E7%9B%AE%E4%B9%8B%E5%90%8E%E8%A6%81%E6%90%AD%E5%BB%BA%E7%9A%84%E9%A1%B9%E7%9B%AE%E6%A1%86%E6%9E%B6)

# 常见通用配置项

```
option = {
    // 标题组件，包含主标题和副标题
    title: {
        text: '世界人口总量',
        subtext: '数据来自网络'
    },

    // 图例组件
    legend: {
        data: ['2011年', '2012年']
    },

    // 上下左右及大小-设置图表占总面积的地方
    grid:{x: '5%', y: '2%', width: '80%', height: '90%'},

    dataset: {
        // 用 dimensions 指定了维度的顺序。直角坐标系中，
        // 默认把第一个维度映射到 X 轴上，第二个维度映射到 Y 轴上。
        // 如果不指定 dimensions，也可以通过指定 series.encode
        // 完成映射，参见后文。
        dimensions: ['product', '2015', '2016', '2017'],
        source: [
            {product: 'Matcha Latte', '2015': 43.3, '2016': 85.8, '2017': 93.7},
            {product: 'Milk Tea', '2015': 83.1, '2016': 73.4, '2017': 55.1},
            {product: 'Cheese Cocoa', '2015': 86.4, '2016': 65.2, '2017': 82.5},
            {product: 'Walnut Brownie', '2015': 72.4, '2016': 53.9, '2017': 39.1}
        ]
    },
    // grid坐标系的x轴
    xAxis: {
        type: 'category',
    },
    // grid坐标系的y轴
    yAxis: {
        type: 'category',
    },


    // 区域缩放
    dataZoom: [
        {
            type: 'slider',
            show: true,
            start: 0,
            end: 100,
            handleSize: 8
        },
    ],

    // 提示框组件
    tooltip: {
        trigger: 'axis',
        axisPointer: {
            type: 'shadow'
        }
    },

    //工具栏。内置有导出图片，数据视图，动态类型切换，数据区域缩放，重置五个工具。
    toolbox: {
        feature: {
            dataZoom: {
                yAxisIndex: 'none'
            },
            restore: {},
            saveAsImage: {}
        }
    },

    // 单独的数据集声明
    dataset: {
        // 用 dimensions 指定了维度的顺序。直角坐标系中，
        // 默认把第一个维度映射到 X 轴上，第二个维度映射到 Y 轴上。
        // 如果不指定 dimensions，也可以通过指定 series.encode
        // 完成映射，参见后文。
        dimensions: ['product', '2015', '2016', '2017'],
        source: [
            {product: 'Matcha Latte', '2015': 43.3, '2016': 85.8, '2017': 93.7},
            {product: 'Milk Tea', '2015': 83.1, '2016': 73.4, '2017': 55.1},
            {product: 'Cheese Cocoa', '2015': 86.4, '2016': 65.2, '2017': 82.5},
            {product: 'Walnut Brownie', '2015': 72.4, '2016': 53.9, '2017': 39.1}
        ]
    },
    
    // 系列列表。每个系列通过 type 决定自己的图表类型
    series: [
        {
            type: 'bar',
            startAngle: 300,
            minAngle: 15,
            radius: ['100%', '60%'],
            center: ['50%', '50%'],
            barWidth: 20
        },
        {
            type: 'bar',
            startAngle: 300,
            minAngle: 15,
            radius: ['100%', '60%'],
            center: ['50%', '50%'],
            barWidth: 20
        },
        {
            type: 'bar',
            startAngle: 300,
            minAngle: 15,
            radius: ['100%', '60%'],
            center: ['50%', '50%'],
            barWidth: 20
        }
    ],

    // 调色盘颜色列表。如果系列没有设置颜色，则会依次循环从该列表中取颜色作为系列颜色。
    color:['#4181E4','#5CCED4'],

    // 背景色，默认无背景。
    backgroundColor:'#eee',

    // 全局的字体样式。
    textStyle:{
      color:'#f00'
    }
};
```

# 组件其它设置

## 颜色渐变

```
color:[new echarts.graphic.LinearGradient(
        0, 0, 0, 1,       //4个参数用于配置渐变色的起止位置, 这4个参数依次对应右/下/左/上四个方位. 而0 0 0 1则代表渐变色从正上方开始
        [
            {offset: 0, color: '#459BF6'},
            {offset: 1, color: '#61D2D6'}
        ]                //数组, 用于配置颜色的渐变过程. 每一项为一个对象, 包含offset和color两个参数. offset的范围是0 ~ 1, 用于表示位置
    ),'#556783'],
```

## 饼图最小区域面积

```
type: 'pie',
minAngle: 15,
```

# js控制echarts

## `window.eventBus`实现vue页面与普通js数据通信

重点：用`window.eventBus`而不是`this.eventBus`，因为普通js里面的`this`是代表`vue`，而普通js获取不到`vue`的值。

main.js
```
// 引入eventBus
import EventBus from './bus/eventBus'; 
Vue.prototype.$eventBus = EventBus;

if (window) {
  window.$eventBus = EventBus;
}
```

page.vue
```
window.$eventBus.$emit('residenceData', resData.map(v => v.lx));
```

index.js
```
var attackSourcesName = [];
window.$eventBus.$on('residenceData',v=>{
    attackSourcesName = v;
})
```

![image](https://wx3.sinaimg.cn/large/0069qZtTgy1gij1jm6zqjj30zw0han25.jpg)

## echarts与elementUI中的carousel走马灯结合的轮播

```
<el-carousel :interval="3000" arrow="always" class="img-box">
    <el-carousel-item 
        v-for="(item,index) in 2"
        :key="index" >
        <div v-if="0 === index">
            <ehcart ref="echrts_educationals" config='home-service-educational' height="2.32rem" width='4.63rem'/>
        </div>
        <div v-if="1 === index">
            <ehcart ref="echarts_ages" config="home-ageCollection" height="2.32rem" width='4.63rem'/>
        </div>
    </el-carousel-item>
</el-carousel>

...

let echart1 = this.$refs.echrts_educationals[0];
echart1.option.series[0].data = [];
echart1.resizeB();
echart1.refresh();

let echart2 = this.$refs.echarts_ages[0];
echart2.option.xAxis[0].data = [];
echart2.resizeB();
echart2.refresh();
```

`resizeB`的具体方法：

```
resizeB: function () {
    let timer1 = setTimeout(() => {
        this.chart.resize()
        // console.log('调用了改变echart自适应')
        this.chart.setOption(this.option);
        clearTimeout(timer1)
    }, 400)
}
```

## 普通的控制显示隐藏

用`v-if`，不要用`v-show`，这样就会重新生成DOM，而不是显示隐藏。

# 常用图表——折线图、柱状图、饼图

## 折线图-line

```
option = {
    xAxis: {
        type: 'category',
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    },
    yAxis: {
        type: 'value'
    },
    series: [{
        areaStyle:{}, // 添加区域表示有面积
        data: [820, 932, 901, 934, 1290, 1330, 1320],
        type: 'line'
    }]
};

```

## 柱状图-bar

### 柱状图横/竖向显示

竖向
```
xAxis: {
    type: 'category'
},
yAxis: {
    type: 'value',
    data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
},
```

横向
```
xAxis: {
    type: 'value'
},
yAxis: {
    type: 'category',
    data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
},
```

### 堆叠

重点：所有数据有一个共同的`stack`，如`stack: '总量'`。

```
series: [
    {
        name: '联盟广告',
        type: 'bar',
        stack: '总量',
        data: [220, 182, 191, 234, 290, 330, 310]
    },
    {
        name: '视频广告',
        type: 'bar',
        stack: '总量',
        data: [150, 212, 201, 154, 190, 330, 410]
    },
    {
        name: '搜索引擎',
        type: 'bar',
        stack: '总量',
        data: [820, 832, 901, 934, 1290, 1330, 1320]
    }
]
```

## 饼图-pie

### 普通饼图

重点：`type: 'pie',radius: '55%',`

```
series: [
    {
        name: '访问来源',
        type: 'pie',
        radius: '55%',
        data: [
            {value: 335, name: '直接访问'},
            {value: 310, name: '邮件营销'},
            {value: 234, name: '联盟广告'},
            {value: 135, name: '视频广告'},
            {value: 1548, name: '搜索引擎'}
        ],
    }
]
```

### 圆环饼图

重点：`type: 'pie',radius: ['50%', '70%'],`

```
series: [
    {
        name: '访问来源',
        type: 'pie',
        radius: ['50%', '70%'],
        data: [
            {value: 335, name: '直接访问'},
            {value: 310, name: '邮件营销'},
            {value: 234, name: '联盟广告'},
            {value: 135, name: '视频广告'},
            {value: 1548, name: '搜索引擎'}
        ]
    }
]
```

# 其它不常用echarts图

## 仪表盘

![image](https://wx2.sinaimg.cn/large/0069qZtTgy1gijgt6p502j306h05owf2.jpg)

```
var value = '4.3';
var subtext = `样本量：2233`;
var max = 5;
import echarts from 'echarts'
export const option = {
    title: {
        show: true,
        text: value || "仪表盘",
        subtext,
        subtextStyle: {
            align: "center",
        },
        left: 400,
        bottom: 10,
        textStyle: {
            color: '#414957',
            fontSize: 24,
            align: 'center',
            fontFamily: '"Microsoft Yahei","微软雅黑"',
        },
    },
    grid:{x: '5%', y: '2%', width: '80%', height: '90%'},
    angleAxis: {
        axisLine: {
            show: false
        },
        axisLabel: {
            show: false
        },
        splitLine: {
            show: false
        },
        axisTick: {
            show: false
        },
        min: 0,
        max: 6.666,
        // boundaryGap: ['0', '10'],
        startAngle: 225
    },
    radiusAxis: {
        type: 'category',
        axisLine: {
            show: false
        },
        axisTick: {
            show: false
        },
        axisLabel: {
            show: false
        },
        data: ['a', 'b', 'c'],
        z: 10
    },
    polar: {
        radius: '100%'
    },
    series: [{
            type: 'bar',
            data: [, , value],
            z: 1,
            coordinateSystem: 'polar',
            barMaxWidth: 18,
            name: '警告事件',
            roundCap: true,
            color: '#4181E4',
            barGap: '-100%',
        },
        {
            type: 'bar',
            data: [, , ],
            z: 2,
            coordinateSystem: 'polar',
            barMaxWidth: 18,
            name: '警告事件',
            roundCap: true,
            color: '#f00',
            barGap: '-100%',
        },
        {
            type: 'bar',
            data: [, , max],
            z: 0,
            silent: true,
            coordinateSystem: 'polar',
            barMaxWidth: 18,
            name: 'C',
            roundCap: true,
            color: '#fff',
            barGap: '-100%',
        },
        {
            type: 'pie',
            labelLine: {
                show: false
            },
            z: 1,
            radius: 14,
            data: [{
                value: 5,
                itemStyle: {
                    color: 'rgba(108,116,132,0.15)',
                }
            }]
        }, {
            type: 'pie',
            labelLine: {
                show: false
            },
            z: 10,
            radius: 3,
            data: [{
                value: 100,
                itemStyle: {
                    color: '#fff',
                }
            }]
        }, {
            type: 'gauge',
            radius: '85%',
            splitNumber: 4,
            max: 5,
            detail: {
                show: false,
            },
            axisLine: {
                // 坐标轴线
                lineStyle: {
                    // 属性lineStyle控制线条样式
                    color: [
                        [0, "#4181E4"],
                        [1, "#4181E4"]
                    ],
                    width: 25,
                    opacity: 0 //刻度背景宽度
                }
            },
            "data": [{
                "name": "",
                "value": value,
            }],
            splitLine: {
                length: 12, //长刻度节点线长度
                lineStyle: {
                    width: 2,
                    color: "#c4c6cc"
                } //刻度节点线
            },
            axisTick: {
                show: true,
                lineStyle: {
                    color: "#c4c6cc",
                    width: 2
                },
                length: 5,
                splitNumber: 6
            },
            axisLabel: {
                show: false,
                color: '#333',
                fontSize: 18,
            },
            pointer: {
                show: true,
                length: '70%',
                itemStyle: {
                    color: '#DE585D',
                }
            },
        },
        {
            "type": "pie",
            radius: ['88%', '82%'],
            "hoverAnimation": false,
            startAngle: 225,
            endAngle: 0,
            "data": [{
                    "name": "",
                    "value": value / 5,
                    "label": {
                        show: false
                    },
                    "labelLine": {
                        show: false
                    },
                    itemStyle: {
                        color: 'rgba(0,0,0,0)'
                    }
                },
                { //画中间的图标
                    "name": "",
                    "value": 0,
                    "label": {
                        position: 'inside',
                        backgroundColor: '#fff',
                        borderRadius: 7,
                        padding: 3,
                        borderWidth: 0,
                        borderColor: "#fff"

                    }
                }, {
                    "name": "",
                    value: 1.33 - value / 5,
                    "label": {
                        show: false
                    },
                    "labelLine": {
                        show: false
                    },
                    itemStyle: {
                        color: 'rgba(255,255,255,0)'
                    }
                }
            ]
        }
    ],
    tooltip: {
        show: false
    },

}
```

## 滚动柱状图排行榜

![image](https://wx2.sinaimg.cn/large/0069qZtTgy1gijgurb2syj30cw07eq4h.jpg)

```
var index = 0;
var colorList = ['#f36c6c', '#e6cf4e', '#20d180', '#0093ff'];
var attackSourcesName = ["中心村村委会", "中沟村村委会", "众众新家园居委会", "众安居委会", "光明村村委会", "光辉村村委会", "兴银花园居委会", "北桥居委会", "北桥村村委会", "向阳村村委会", "君临花园居委会", "君莲新城第一居委会", "君莲新城第三居委会", "君莲新城第二居委会", "君莲新城第五居委会", "君莲新城第四居委会", "复地北桥城居委会", "好世凤凰城居委会", "安乐村村委会", "招商雍华苑居委会", "文博水景居委会", "日月华城居委会", "星河湾居委会", "樱缘花园居委会", "灯塔村村委会", "秀龙居委会", "繁盛苑居委会", "翔泰苑居委会", "莘闵荣顺苑居委会", "都市富苑居委会", "金榜新苑居委会", "金都新村第三居委会", "银春花园居委会", "银桥花园居委会", "银都苑第一居委会", "银都苑第三居委会", "集体村村委会", "颛桥村村委会", "颛溪新村第五居委会", "颛溪新村第八居委会", "骏苑居委会"];

function contains(arr, dst) {
    var i = arr.length;
    while (i -= 1) {
        if (arr[i] == dst) {
            return i;
        }
    }
    return false;
}
option = {
    color:['#5CCED4','#4181E4'],
    dataZoom:[{
        type: 'slider',
        yAxisIndex: 0,
        zoomLock: true,
        width: 10,
        handleSize: 0,
        showDetail: false,
        start: 0,
        end: 16, // 百分比，此处是计算后传过来
        handleIcon: 'path://M306.1,413c0,2.2-1.8,4-4,4h-59.8c-2.2,0-4-1.8-4-4V200.8c0-2.2,1.8-4,4-4h59.8c2.2,0,4,1.8,4,4V413z',
        handleSize: '100%',
        handleStyle: {
            color: "#d3dee5",
        },
        borderColor: "#90979c"
    }, {
        type: 'inside',
        id: 'insideY',
        yAxisIndex: 0,
        start: 0,
        end: 50,
        zoomOnMouseWheel: false,
        moveOnMouseMove: true,
        moveOnMouseWheel: true
    }],
    tooltip: {
        trigger: 'axis',
        axisPointer: {
            type: 'cross',
            show: false
        },
        backgroundColor: '#0D2062',
        extraCssText: '#63C5E0',
        formatter: function(datas) {
            let res = '<p style="color:rgba(255,255,255,1);padding:0 5px;font-size: .14rem;">'+datas[0].axisValue+'</p>';
            for(var i in datas) {
                res+='<p style="color:rgba(162,214,255,1);padding:0 5px;font-size: .14rem;">'+datas[i].seriesName + ' ' +datas[i].value[datas[i].seriesName]+'</p>';
            }
            return res
        }
    },
    grid:{x: '25%', y: '2%', width: '70%', height: '90%'},
    xAxis: {
        show: true,
        type: 'value',
        splitLine: {
            show: false
        },
        axisLabel: {
            interval: 0,
            textStyle: {
                fontSize: '12px',
                color: '#fff'
            }
        },
    },
    yAxis: {
        type: 'category',
        inverse: true,
        axisLine: {
            show: false
        },
        axisTick: {
            show: false
        },
        axisPointer: {
            label: {
                show: true,
                margin: 30
            }
        },
        data: attackSourcesName,
        axisLabel: {
            interval: 0,
            textStyle: {
                fontSize: '.12rem',
                color: '#fff'
            },
            margin: 100,
            fontSize: 14,
            align: 'left',
            color: '#333',
            rich: {
                a1: {
                    color: '#fff',
                    backgroundColor: colorList[0],
                    width: 15,
                    height: 15,
                    align: 'center',
                    borderRadius: 2
                },
                a2: {
                    color: '#fff',
                    backgroundColor: colorList[1],
                    width: 15,
                    height: 15,
                    align: 'center',
                    borderRadius: 2
                },
                a3: {
                    color: '#fff',
                    backgroundColor: colorList[2],
                    width: 15,
                    height: 15,
                    align: 'center',
                    borderRadius: 2
                },
                b: {
                    color: '#fff',
                    backgroundColor: colorList[3],
                    width: 15,
                    height: 15,
                    align: 'center',
                    borderRadius: 2
                }
            },
            formatter: function(params) {
                let index1 = params.indexOf('#');
                let num = params.slice(index + 1);
                let newParams = params.slice(0, index1);
                var newParamsName = "";// 最终拼接成的字符串
                var paramsNameNumber = newParams.length;// 实际标签的个数
                if(paramsNameNumber<=5){
                  newParamsName = newParams;
                }else{
                  newParamsName = newParams.substring(0,4)  + "...";
                }
                
                index = contains(attackSourcesName, params) + 1;
                params = newParamsName;
                if (index - 1 < 3) {
                    return [
                        '{a' + index + '|' + index + '}' + '  ' + params
                    ].join('\n')
                } else {
                    return [
                        '{b|' + index + '}' + '  ' + params
                    ].join('\n')
                }
            }
        }
    },
    series: [
        {
            name: '户籍',
            type: 'bar',
            stack: '总量',
            label: {
                show: true
            },
            barWidth: 10,
            data: [1, 1, 3, 1, 2, 2, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5, 0, 0, 0, 0, 0]
        },
        {
            name: '居住',
            type: 'bar',
            stack: '总量',
            label: {
                show: true,
                position: 'left'
            },
            barWidth: 10,
            data: [0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 28, 5, 0, 1, 0, 0, 0]
        }
    ]
};
```