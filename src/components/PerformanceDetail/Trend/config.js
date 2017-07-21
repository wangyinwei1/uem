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
        grid: [{
            top: '25%'
        }],
        yAxis: [{
            type: 'value',
            show: true,
            name: '单位：s',
        }, {
            type: 'value',
            axisLine: {
                show: false,
                lineStyle: {
                    color: '#70c3fb'
                }
            },
            splitLine: {
                show: false,
                lineStyle: {
                    color: '#236592'
                }
            },
            axisTick: {
                show: false
            },
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
            data: []
            // data: _.range(Math.random() * 100, Math.random * 300)
        }, {
            name: '网络传输',
            type: 'bar',
            stack: '总量',
            data: []
            // data: _.range(Math.random() * 100, Math.random * 300)
        }, {
            name: '服务器',
            type: 'bar',
            stack: '总量',
            data: []
            // data: _.range(Math.random() * 100, Math.random * 300)
        }, {
            name: '点击次数',
            type: 'line',
            smooth: true,
            data: [],
            yAxisIndex: 1,
            // data: _.range(Math.random() * 100, Math.random * 300)
        }]
    },
    thruput: {
        color: ['#90ec7d', '#03a9f3', 'rgb(254,226,92)'],
        legend: {
            itemWidth: 8,
            itemHeight: 8,
            data: [{
                name: '中位数',
                icon: 'circle'
            }, {
                name: '平均值',
                icon: 'circle'
            }, {
                name: '最慢5%趋势',
                icon: 'circle'
            }],
            top: 15,
            right: 15,
            textStyle: {
                color: '#fff'
            }
        },
        tooltip: {
            // 悬浮弹窗的颜色
            backgroundColor: 'rgba(50,50,50,0.7)',
            textStyle: {
                color: '#ffffff'
            },
            // 坐标轴指示器，坐标轴触发有效
            trigger: 'axis',
            axisPointer: {
                // 默认为直线，可选为：'line' | 'shadow'          
                type: 'shadow'
            }
        },
        yAxis: [{
            name: '单位：s',
            //max:1,
            min: 0,
            minInterval: 0,
            splitLine: {
                show: true
            },
        }],
        series: [{
            name: '中位数',
            type: 'line',
            smooth: true,
            data: []
        }, {
            name: '平均值',
            type: 'line',
            smooth: true,
            data: []
        }, {
            name: '最慢5%趋势',
            type: 'line',
            smooth: true,
            data: []
        }]
    },
    apdex: {
        yAxis: [{
            name: '单位：次',
            minInterval: 0,
            min: 0,
        }],
        xAxis: {
            type: 'category',
            data: ['满意', '可接受', '不满意']
        },
        series: [{
            name: '操作数',
            barWidth: 50,
            type: 'bar',
            itemStyle: {
                normal: {
                    color: item => {
                        const colors = ['#66dc6b', '#ffeb0b', '#ff5252'];
                        return colors[item.dataIndex];
                    }
                }
            },
            data: []
        }]
    },
    throughput: {
        color: ['#90ED7D', 'rgb(254,226,92)'],
        legend: {
            itemWidth: 8,
            itemHeight: 8,
            data: [{
                name: '吞吐率',
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
        grid: [{
            top: '25%'
        }],
        yAxis: [{
            name: '单位：rpm',
            minInterval: 0,
            min: 0,
        }, {
            name: '单位：次',
            axisLine: {
                show: false,
                lineStyle: {
                    color: '#70c3fb'
                }
            },
            splitLine: {
                show: false,
                lineStyle: {
                    color: '#236592'
                }
            },
            axisTick: {
                show: false
            },
            minInterval: 1,
            min: 0
        }],
        series: [{
            name: '吞吐率',
            type: 'bar',
            data: []
        }, {
            name: '点击次数',
            type: 'line',
            smooth: true,
            data: [],
            yAxisIndex: 1,
        }]
    },
})
