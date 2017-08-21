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