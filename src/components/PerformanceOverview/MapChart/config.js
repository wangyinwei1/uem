export default Immutable.fromJS({
    default: {
    },
    china: {
        dataRange:[{
            x: 'left',
            y: 'bottom',
            splitList: [ ],
            itemWidth: 10,
            itemHeight: 10,
            textStyle: {color: '#fff'}
        }],
        series: [
            {
                mapType: 'china',
                zoom: 1.05,
                data:[]
            }
        ]
    },
    world: {
        dataRange:[{
            x: 'left',
            y: 'bottom',
            splitList: [ ],
            itemWidth: 10,
            itemHeight: 10,
            textStyle: {color: '#fff'}
        }],
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
            bottom: 60,
            right: 60
        }],
        tooltip: {
            formatter: ''
        },
        // dataZoom: [
        //     {
        //         type: 'inside',
        //         orient: 'vertical',
        //         throttle: 300
        //     }
        //     // {
        //     //     type: 'slider',
        //     //     orient: 'vertical',
        //     //     textStyle: {
        //     //         color: '#fff'
        //     //     },
        //     //     backgroundColor: 'rgba(0,0,0,.2)',
        //     //     fillerColor: '#2378C3',
        //     //     borderColor: 'transparent',
        //     //     showDetail: false,
        //     //     handleStyle: {
        //     //         opacity: 0
        //     //     },
        //     //     realtime: false,
        //     //     right: -20
        //     // }
        // ],
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
        series: [{
            type: 'bar',
            barWidth: 20,
            data: []
        }]
    }
})