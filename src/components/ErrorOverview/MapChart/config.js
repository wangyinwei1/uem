export default Immutable.fromJS({
    default: {
    },
    china: {
        series: [
            {
                mapType: 'china',
                zoom: 1.05,
                data: []
            }
        ]
    },
    world: {
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
            data: []
        }],
        series:
        [
            {
                type: 'bar',
                data: []
            }
        ]
    }
})