export default Immutable.fromJS({
    default: {
    },
    china: {
        visualMap:[{
            max:1,
            text:[]
        }],
        series: [
            {
                mapType: 'china',
                zoom: 1.05,
                data: []
            }
        ]
    },
    world: {
        visualMap:[{
            max:1,
            text:[]
        }],
        series: [
            {
                mapType: 'world',
                zoom: 0.95,
                data: []
            }
        ]
    },
    bar: {
        title: {
            show: false
        },
        grid: [{
            bottom: 60,
            right: 60
        }],
        xAxis: [{
            type: 'value',
            axisLine: {
                show: false
            },
            axisTick: {
                show: false
            }
        }],
        yAxis: [{
            type: 'category',
            axisLine: {
                show: false
            },
            axisTick: {
                show: false
            },
            data: ['巴西', '印尼', '美国', '印度', '中国', '世界人口(万)']
        }],
        series:
        [
            {
                type: 'bar',
                data: [12, 32, 345, 104, 144, 230]
            }
        ]
    }
})