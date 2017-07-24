export default Immutable.fromJS({
    default: {
        title: null
    },
    analyze: {
        grid: [{
            top: '0'
        }],
        legend: {
            show: false,
        },
        tooltip: {
            show: false
        },
        xAxis: [{
            type: 'value',
            show: true,
            axisLabel: {
                formatter: (params) => {
                    return params + 'ms';
                }
            }
        }],
        yAxis: [{
            type: 'category',
            show: true,
            splitLine: {
                show: true,
            },
            axisTick: {
                show: false
            },
            axisLine: {
                show: true,
                lineStyle: {
                    color: '#236592'
                }
            },
            axisLabel: {
                textStyle: {
                    color: '#f2faff'
                }
            },
            data: ['request', 'response', 'callback'].reverse()
        }],
        series: [{
            name: '辅助',
            type: 'bar',
            stack: '总量',
            itemStyle: {
                normal: {
                    barBorderColor: 'rgba(0,0,0,0)',
                    color: 'rgba(0,0,0,0)'
                },
                emphasis: {
                    barBorderColor: 'rgba(0,0,0,0)',
                    color: 'rgba(0,0,0,0)'
                }
            },
            data: []
        }, {
            name: '用时',
            type: 'bar',
            label: {
                normal: {
                    show: true,
                    position: 'right',
                    formatter: (params) => {
                        return params.data + 'ms';
                    }
                }
            },
            stack: '总量',
            data: []
        }]
    }
    // analyze: {
    //     xAxis: [{
    //         type: 'value',
    //         axisLine: {    // 轴线
    //             show: false,
    //             lineStyle: {
    //                 color: ['#3e7395'],
    //                 width: 1
    //             }
    //         },
    //         axisTick: {    // 轴标记
    //             show: false,
    //         },
    //         axisLabel: {
    //             show: true,
    //             textStyle: {
    //                 fontSize: 10,
    //                 color: ['#539fd1'],
    //             },
    //             formatter: '{value}ms'
    //         },
    //         splitLine: {
    //             show: true,
    //             lineStyle: {
    //                 color: ['#3e7395'],
    //                 width: 1
    //             }
    //         },
    //         splitArea: {
    //             show: false,
    //         },
    //         splitNumber: 6,
    //     }, {
    //         type: 'value',
    //         axisTick: {    // 轴标记
    //             show: false,
    //         },
    //         axisLine: {    // 轴线
    //             show: false,
    //             lineStyle: {
    //                 color: ['#3e7395'],
    //                 width: 1
    //             }
    //         },
    //         axisLabel: {
    //             show: false
    //         },
    //         splitLine: {
    //             show: false,
    //             lineStyle: {
    //                 color: ['#3e7395'],
    //                 width: 1
    //             }
    //         },
    //         splitNumber: 6,
    //     }],
    //     yAxis: {
    //         type: 'category',
    //         min: 0,
    //         data: [{
    //             type: 'value',
    //             show: true,
    //             name: '单位：s',
    //         }, {
    //             type: 'value',
    //             axisLine: {
    //                 show: false,
    //                 lineStyle: {
    //                     color: '#70c3fb'
    //                 }
    //             },
    //             splitLine: {
    //                 show: false,
    //                 lineStyle: {
    //                     color: '#236592'
    //                 }
    //             },
    //             axisTick: {
    //                 show: false
    //             },
    //             show: true,
    //             name: '单位：次',
    //         }]
    //     },
    // }
})
