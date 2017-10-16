export default Immutable.fromJS({
    default: {
        title: null
    },
    analyze: {
        grid: [{
            top: '5%',
            bottom: '5%',
            left: '5%',
            right: '5%'
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
            data: []
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
            barWidth: 20,
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
});

export const tableConfig = {
    columns: [{
        title: 'URL/PATH',
        dataIndex: 'resName',
        key: 'resName',
        width:400
    }, {
        title: locale('耗时'),
        dataIndex: 'time',
        key: 'time',
        width: 150
    }],
};
