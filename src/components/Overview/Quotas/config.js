export default Immutable.fromJS({
    default: {
        title: {
            text: '分时趋势图',
        },
        xAxis: {
            data: _.range(1, 25)
        },
        yAxis: {
            // minInterval: 1
        },
        series: [
            {
                name: '今日',
                type: 'line',
                symbol: 'circle',
                showSymbol: false,
                data: []
            },
            {
                name: '昨日',
                type: 'line',
                symbol: 'circle',
                showSymbol: false,
                data: []
            }
        ]
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