export default Immutable.fromJS({
    default: {
        title: {
            text: locale('分时趋势图'),
        },
        legend: {
            itemWidth: 8,
            itemHeight: 8,
            data: [{
                name: locale('今日'),
                icon: 'circle'
            }, {
                name: locale('昨日'),
                icon: 'circle'
            }],
            top: 15,
            right: 15,
            // textStyle: {
            //     color: '#fff'
            // }
        },
        xAxis: [{
            data: _.range(1, 25)
        }],
        yAxis: [{
            minInterval: 1
        }],
        series: [{
            name: locale('今日'),
            type: 'line',
            symbol: 'circle',
            smooth: true,
            showSymbol: false,
            smooth: true,
            data: []
        }, {
            name: locale('昨日'),
            type: 'line',
            symbol: 'circle',
            smooth: true,
            showSymbol: false,
            smooth: true,
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
        title: {
            top: 5,
        },
        yAxis: [{
            minInterval: 1,
            name: locale('单位：s')
        }],
    },
    errorCount: {
    }
})