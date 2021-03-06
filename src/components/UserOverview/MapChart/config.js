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
        tooltip: {
            formatter: ''
        },
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
                barWidth: 20,
                data: []
            }
        ]
    }
})