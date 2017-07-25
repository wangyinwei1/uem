export default Immutable.fromJS({
    default: {
        title: {
            text: '分时趋势图',
        },
        legend: {
            itemWidth: 8,
            itemHeight: 8,
            data: [{
                name: '今日',
                icon: 'circle'
            }, {
                name: '昨日',
                icon: 'circle'
            }],
            top: 15,
            right: 15,
            textStyle: {
                color: '#fff'
            }
        },
        xAxis: [{
            data: _.range(1, 25)
        }],
        yAxis: [{
            minInterval: 1
        }],
        series: [{
            name: '今日',
            type: 'line',
            symbol: 'circle',
            smooth: true,
            showSymbol: false,
            data: []
        }, {
            name: '昨日',
            type: 'line',
            symbol: 'circle',
            smooth: true,
            showSymbol: false,
            data: []
        }]
    },
    pv: {
    },
    uv: {
    },
    clickNum: {
    },
    avgRspTime: {
    },
    errorCount: {
    }
})