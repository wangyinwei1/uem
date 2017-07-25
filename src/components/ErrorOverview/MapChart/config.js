export default Immutable.fromJS({
    default: {
    },
    china: {
        series: [
            {
                mapType: 'china',
                zoom: 1.05,
                data:[]
            }
        ]
    },
    world: {
        series: [
            {
                mapType: 'world',
                zoom: 0.95,
                data:[]
            }
        ]
    },
    bar: {
        title: {
            show: false
        },
        grid: [{
            bottom: 15,
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