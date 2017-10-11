export default Immutable.fromJS({
            title: {
                text: locale('性能趋势图'),
            },
            legend: {
                itemWidth: 8,
                itemHeight: 8,
                data: [{
                    icon: 'circle'
                }, {
                    icon: 'circle'
                }, {
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
                    show: true
                },
                min: 0,
                axisLine: {
                    show: false
                },
                axisTick: {
                    show: false
                }
            }],
            color: ['#ffeb0b', '#66dc6a', colorChangeTest("test")],
            series: [
                {   
                    type: 'line',
                    symbol: 'circle',
                    showSymbol: false,
                    data: []
                },
                {
                    type: 'line',
                    symbol: 'circle',
                    showSymbol: false,
                    data: []
                },
                {
                    type: 'line',
                    symbol: 'circle',
                    showSymbol: false,
                    data: []
                }
            ]
        })