
export default Immutable.fromJS({
            title: {
                // text: locale('性能趋势图'),
                text: '',
                // top: 5
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
                top: 5,
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
                type: 'value',
                name: locale('单位：次')
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
                },
                name: locale('单位：s')

            }],
            color: ['#ffeb0b', '#66dc6a', '#00c0fc'],
            series: [
                {   
                    type: 'line',
                    symbol: 'circle',
                    showSymbol: false,
                    smooth: true,
                    data: []
                },
                {
                    type: 'line',
                    symbol: 'circle',
                    showSymbol: false,
                    smooth: true,
                    data: []
                },
                {
                    type: 'line',
                    symbol: 'circle',
                    showSymbol: false,
                    smooth: true,
                    data: []
                }
            ]
        })