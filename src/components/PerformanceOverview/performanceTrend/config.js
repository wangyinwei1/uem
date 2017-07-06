export default Immutable.fromJS({
    default: {
        title: {
            text: '分时趋势图',
        },
        yAxis: {
            // minInterval: 1
        },
        legend: {
            itemWidth: 8,
            itemHeight: 8,
            data: [{
                name: '访问量PV',
                icon: 'circle'
            }, {
                name: '点击数',
                icon: 'circle'
            },{
                name: '响应时间',
                icon: 'circle'
        }],
            top: 15,
            right: 15,
            textStyle: {
                color: '#fff'
            }
    },
        color: ['#ffeb0b','#66dc6a', '#00c0ff'],
        series: [
            {
                name: '浏览量PV',
                type: 'line',
                symbol: 'circle',
                showSymbol: false,
                data: []
            },
            {
                name: '点击数',
                type: 'line',
                symbol: 'circle',
                showSymbol: false,
                data: []
            },
            {
                name: '响应时间',
                type: 'line',
                symbol: 'circle',
                showSymbol: false,
                data: []
            }
        ]
    },
    pv: {
    },
    clickNum: {
    },
    avgRspTime: {
    }
});