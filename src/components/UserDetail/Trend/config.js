export default Immutable.fromJS({
    default: {
        // title: null
    },
    trend: {
        color: ['#66dc6b', '#AADF2D'],
        title: {
            text: '最近一个月访问情况',
            textStyle: {
                color: '#ffffff',
                fontSize: 12
            }
        },
        grid: [{
            top: '70',
            left: '28'
        }],
        xAxis: [{
            data: []
        }],
        yAxis: [{
            name: '单位：次',
            min: 0,
            minInterval: 1,
            nameTextStyle: {
                color: '#ffffff',
            },
            splitLine: {
                show: true
            },
        }],
        series: [{
            name: '会话次数',
            type: 'bar',
            itemStyle: {
                normal: {
                    color: '#a2b17e'
                },
                emphasis: {
                    color: '#9bcb29'
                }
            },
            barWidth: 30,
            data: []
        }]
    }
});