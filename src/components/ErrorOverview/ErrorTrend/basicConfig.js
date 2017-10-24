export default Immutable.fromJS({
            title: {
                text: locale('错误趋势图'),
            },
            legend: {
                itemWidth: 8,
                itemHeight: 8,
                data: [{
                    name: '',
                    icon: 'circle'
                }, {
                    name: '',
                    icon: 'circle'
                }, {
                    name: '',
                    icon: 'circle'
                }],
                top: 15,
                right: 15,
                textStyle: {
                    color: '#fff'
                }
            },
            xAxis: [{
                type: 'category',
                data: []
            }],
            yAxis: [{
                minInterval: 1,
            },{
                type: 'value',
                splitLine: {
                    show: false
                },
                min: 0,
                axisTick: {
                    show: false
                },
                axisLine: {
                    show: false,
                    lineStyle: {
                        color: '#70c3fb'
                    }
                }
            }],
            color: ['#ffeb0b', '#66dc6a', '#00c0ff'],
            series: [
                {
                    name: '',
                    type: 'line',
                    symbol: 'circle',
                    showSymbol: false,
                    data: []
                },
                {
                    name: '',
                    type: 'line',
                    symbol: 'circle',
                    showSymbol: false,
                    smooth: true,
                    data: []
                },
                {
                    name: '',
                    type: 'line',
                    symbol: 'circle',
                    showSymbol: false,
                    data: []
                }
            ]
        })