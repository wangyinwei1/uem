export default Immutable.fromJS({
    default: {
        title: null
    },
    avgRspTime: {
        color: ['#6B7BFF', '#90ED7D', '#03B9FF', '#AADF2D'],
        xAxis: {
            type: 'category',
            data: []
        },
        yAxis: [{
            type: 'value',
            show: true,
            name: '单位：s'
        }, {
            type: 'value',
            axisLine: {
                show: false,
                lineStyle: {
                    color: '#70c3fb'
                }
            },
            splitLine: {
                lineStyle: {
                    color: '#236592'
                }
            },
            // axisLine: {
            //     show: false
            // },
            // axisTick: {
            //     show: false
            // }
            show: true,
            name: '单位：次',
        }],
        legend: {
            itemWidth: 8,
            itemHeight: 8,
            data: [{
                name: '客户端',
                icon: 'rect'
            }, {
                name: '网络传输',
                icon: 'rect'
            }, {
                name: '服务器',
                icon: 'rect'
            }, {
                name: '点击次数',
                icon: 'circle'
            }],
            top: 15,
            right: 15,
            textStyle: {
                color: '#fff'
            }
        },
        series: [{
            name: '客户端',
            type: 'bar',
            stack: '总量',
            // data: []
            data: _.range(Math.random() * 100, Math.random * 300)
        }, {
            name: '网络传输',
            type: 'bar',
            stack: '总量',
            // data: []
            data: _.range(Math.random() * 100, Math.random * 300)
        }, {
            name: '服务器',
            type: 'bar',
            stack: '总量',
            // data: []
            data: _.range(Math.random() * 100, Math.random * 300)
        }, {
            name: '点击次数',
            type: 'line',
            // data: []
            data: _.range(Math.random() * 100, Math.random * 300)
        }]
    },
    thruput: {},
    apdex: {},
    throughput: {},
})

// export default Immutable.fromJS({
//     default: {
//         backgroundColor: 'transparent',
//         title: {},
//         xAxis: [{
//             type: 'category',
//             data: []
//         }],
//         yAxis: []
//     },
//     avgRspTime: {
//         color: ['#6B7BFF', '#90ED7D', '#03B9FF', '#AADF2D'],
//         title: {
//             text: '',
//             top: 'top'
//         },
//         tooltip: {
//             // 悬浮弹窗的颜色
//             backgroundColor: 'rgba(50,50,50,0.7)',
//             textStyle: {
//                 color: '#ffffff'
//             },
//             trigger: 'axis',
//             axisPointer: {            // 坐标轴指示器，坐标轴触发有效
//                 type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
//             }
//         },
//         yAxis: [{
//             name: '单位：s',
//             //max:1,
//             min: 0,
//             minInterval: 1,
//         }, {
//             name: '单位：次',
//             minInterval: 1,
//             min: 0,
//             max: 3,
//             splitLine: {
//                 show: true
//             },
//         }],
//         series: [{
//             name: '今日',
//             type: 'line',
//             symbol: 'circle',
//             smooth: true,
//             showSymbol: false,
//             data: [1, 3, 4]
//         }, {
//             name: '昨日',
//             type: 'bar',
//             symbol: 'circle',
//             smooth: true,
//             showSymbol: false,
//             data: [123, 12312, 415]
//         }]
//     },
//     thruput: {
//         color: ['#90ec7d', '#03a9f3', 'rgb(254,226,92)'],
//         legend: {
//             top: 3,
//             right: 30,
//             data: ['中位数', '平均值', '最慢5%趋势']
//         },
//         tooltip: {
//             // 悬浮弹窗的颜色
//             backgroundColor: 'rgba(50,50,50,0.7)',
//             textStyle: {
//                 color: '#ffffff'
//             },
//             trigger: 'axis',
//             axisPointer: {            // 坐标轴指示器，坐标轴触发有效
//                 type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
//             }
//         },
//         title: {
//             text: '',
//             top: 'top'
//         },
//         yAxis: [{
//             name: '单位：s',
//             //max:1,
//             min: 0,
//             minInterval: 0,
//             splitLine: {
//                 show: true
//             },
//         }]
//     },
//     apdex: {
//         title: {
//             text: '',
//             top: 'top'
//         },
//         tooltip: {
//             // 悬浮弹窗的颜色
//             backgroundColor: 'rgba(50,50,50,0.7)',
//             textStyle: {
//                 color: '#ffffff'
//             },
//             trigger: 'axis',
//             axisPointer: {            // 坐标轴指示器，坐标轴触发有效
//                 type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
//             }
//         },
//         legend: {
//             top: 3,
//             right: 30,
//             show: false,
//             data: ['满意度']
//         },
//         yAxis: [{
//             name: '单位：次',
//             minInterval: 0,
//             min: 0,

//         }]
//     },
//     throughput: {
//         color: ['#90ED7D', 'rgb(254,226,92)'],
//         title: {
//             text: '',
//             top: 'top'
//         },
//         tooltip: {
//             // 悬浮弹窗的颜色
//             backgroundColor: 'rgba(50,50,50,0.7)',
//             textStyle: {
//                 color: '#ffffff'
//             },
//             trigger: 'axis',
//             axisPointer: {            // 坐标轴指示器，坐标轴触发有效
//                 type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
//             }
//         },
//         legend: {
//             top: 3,
//             right: 30,
//             data: ['吞吐率', '操作次数']
//         },
//         yAxis: [{
//             name: '单位：rpm',
//             minInterval: 0,
//             min: 0,
//         }, {
//             name: '单位：次',
//             minInterval: 1,
//             min: 0,
//             splitLine: {
//                 show: true
//             },
//         }]
//     },
// })